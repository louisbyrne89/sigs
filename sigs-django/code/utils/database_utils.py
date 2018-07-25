#!/usr/bin/env python3

import os
import re
import sys

from script_utils import Utils


def regroup_inserts(dump_text):
    """
    Parse a database dump file and regroup insert statements of each table under one single insert per table.

    :param dump_text: string containing the dump file sql commands
    """
    # Find the table creation statements
    # CREATE TABLE `auth_group` (
    create_table_regex = r"CREATE TABLE `(?P<table>.+)` \(\n"
    tables_list = [match.group("table") for match in re.finditer(create_table_regex, dump_text)]

    # Regroup the inserts
    # INSERT INTO `auth_permission` VALUES (1,'Can add permission',1,'add_permission');
    insert_template = "INSERT INTO `{0}` VALUES\n{1};\n"

    for table_name in tables_list:
        insert_regex = r"INSERT INTO `{}` VALUES (?P<value>\(.+\));\n".format(table_name)
        matches = [match for match in re.finditer(insert_regex, dump_text)]

        # Some tables are created but there is no INSERT statement associated to them
        if len(matches) != 0:
            # We keep what is before and after the INSERT statements to add it back in the new dump.
            # This is usually the table creation statement.
            start = matches[0].start()
            end = matches[-1].end()
            new_dump_text = dump_text[:start]

            maximum_obj_per_insert = 7000
            # If there is more than a given number of INSERT statements we need to split them in chunks otherwise
            # the package size is too big to be processed.
            # The number of object per INSERT has been set to 7k... This is a bit random as we don't really know in
            # advance the real package size it will create. So we might need to reduce this number in the future.
            for i in range(0, len(matches), maximum_obj_per_insert):
                values = ",\n".join([match.group("value") for match in matches[i: i + maximum_obj_per_insert]])
                new_dump_text += insert_template.format(table_name, values)

            if end != len(dump_text):
                new_dump_text += dump_text[end:]
            dump_text = new_dump_text
    return dump_text


class Database(Utils):
    """
    Implement some useful database commands (reset, update dump files).
    """

    def __init__(self, service, build="sigs"):
        """
        Initialise the database object.

        :param service: name of the service (str in ["SIGS"])
        :param build: name of the build (str)
        """
        # Call the Utils init
        super().__init__()
        self.service = service
        self.known_services = ["sigs"]
        if self.service not in self.known_services:
            raise ValueError("Unknown service {}. It must be in {}".format(self.service, self.known_services))

        # This is for the name of the containers: on your local machine the containers are called `cgscope-xxxx` but
        # when running a parametrized build on Jenkins the build name is used.
        self.build = build

        self.__set_container_info()

        # mysql credentials
        self.mysql_username = "root"
        self.mysql_password = "123"
        self.mysql_credentials = "--host=localhost --user={} --password={}".format(self.mysql_username,
                                                                                   self.mysql_password)
        # full path of the dump file
        self.dump_path = "sigs-mysql/docker-entrypoint-initdb.d/{}"

        self.__set_database_info()

    def __set_container_info(self):
        """
        Set the name of the containers (the microservice container and the sql container for its database).

        These names depend on the type of build and the service we are working on.
        """
        self.container = "{}_{}_1".format(self.build, self.service.lower())
        self.mysql_container = "{}_{}-mysql_1".format(self.build, self.service.lower())

    def __set_database_info(self):
        """
        Depending on the service, set the appropriate database name and dump files.
        """
        if self.service == "sigs":
            self.database_name = "sigs_local"
            # dict of dump files and the tables associated
            self.dump_files = {
                "01_auth.sql": ["auth_group", "auth_group_permissions", "auth_permission", "auth_user",
                                "auth_user_groups", "auth_user_user_permissions"],
                "02_django.sql": ["django_content_type", "django_migrations", "django_admin_log", "django_session"],
                "03_daily_irradience.sql": ["solar_models_dailyglobalirradiance", "solar_models_hourlyglobalirradiance"]
            }

    def get_table_list(self):
        """
        Get the list of tables existing in the database.
        """
        # the \"{{}}\" is where the sql command will be added via a second `.format()`
        container_command = "docker exec {} sh -c \"{{}}\"".format(self.mysql_container)
        sql_command = "mysql {} --execute='SHOW TABLES FROM {};'".format(self.mysql_credentials, self.database_name)
        table_list = self.shell(container_command.format(sql_command))
        table_list = table_list.split("\n")
        assert table_list[0] == "Tables_in_{}".format(self.database_name)
        return table_list[1:]

    def reset(self, container_type="docker", container_name=None):
        """
        Reset the database.

        :param container_type: string telling the type of container we are dealing with (either docker or kubernetes)
        :param container_name: name of container (for kubernetes only, it is set automatically when using docker)
        """
        self.logger.info(" > Reset {} database".format(self.service))
        # Check input arguments are correct
        container_command = "docker exec {} sh -c \"{{}}\"".format(self.mysql_container)
        self.drop_and_create_db(container_command=container_command)

    def drop_and_create_db(self, container_command, dump_files=None):
        """
        Drop the existing database and create a new one with the dump_files specified.

        If no dump files are given as input it uses the files listed in the class attribute self.dump_files.

        :param container_command: string containing the command that allow to execute something on the container. The
            command we want to execute on the container is then obtained by doing container_command.format(<my command>)
        :param dump_files: list of dump files to load
        """
        sql_command = "mysql {}".format(self.mysql_credentials)
        # drop existing database
        full_sql_command = sql_command + " --execute='DROP DATABASE {};'".format(self.database_name)
        try:
            # in case the database is empty, the drop will fail since we can't find the database in question but that
            # means we already starting clean so it is not an issue
            self.shell(container_command.format(full_sql_command), message="       drop database")
        except BaseException:
            pass
        # create database
        full_sql_command = sql_command + " < /docker-entrypoint-initdb.d/00_create_databases.sql"
        self.shell(container_command.format(full_sql_command), message="       create database")

        # if an explicit list of dump files is not provided we used the usual ones defined in the class
        if dump_files is None:
            dump_files = [
                "/docker-entrypoint-initdb.d/{}".format(dump_file)
                for dump_file in sorted(self.dump_files.keys())
            ]

        # load database dump files
        for dump_filename in dump_files:
            # add the 'USE <database name>;'' statement at the beginning of the file
            # note that this is actually not needed when using the dev dump files since they should already have it but
            # it doesn't break to have it twice anyway
            full_sql_command = "echo 'USE {};' | cat - {} | ".format(self.database_name,
                                                                     dump_filename)
            full_sql_command += sql_command
            self.shell(container_command.format(full_sql_command),
                       message="       load {}".format(os.path.basename(dump_filename)))

    def generate_database_dumps(self):
        """
        Generate database dump files.

        Also clean the dump statement to make sure we have one object per line but only one INSERT statement per table.
        """
        # make sure we are not missing any table
        for table in self.get_table_list():
            is_table_dumped = False
            for dumped_tables in self.dump_files.values():
                # check if the table is in the dumped tables (note that if dumped table is an empty list it means we
                # are dumping everything)
                is_table_dumped = is_table_dumped or (table in dumped_tables) or (dumped_tables == [])
            if not is_table_dumped:
                raise ValueError(
                    "Table {table} of database {database_name} is not dumped in any file,\
                     please add it to `self.dump_files` in database_utils.".format(
                        table=table, database_name=self.database_name
                    )
                )

        self.logger.info(" > Update {} database dump files".format(self.service))
        my_sql_command = "docker exec {} mysqldump {} --set-gtid-purged=OFF --skip-dump-date --skip-extended-insert {} "
        my_sql_command = my_sql_command.format(self.mysql_container, self.mysql_credentials, self.database_name)
        for dump_filename in sorted(self.dump_files.keys()):
            tables = self.dump_files[dump_filename]
            file_path = self.dump_path.format(dump_filename)
            with open(file_path, "w") as dump_file:
                self.shell(my_sql_command + " ".join(tables),
                           message="       generate {}".format(dump_filename), stdout=dump_file)

            # clean up the dump file
            self.clean_dump(file_path)

    def clean_dump(self, dump_filename):
        """
        Search for all the insert statement table per table and regroup them in one single insert statement.

        This is used to make sure the SQL INSERT statements in the database dump are not a one line command
        (for git purposes it is more convenient to have one object per line) but are still done in only one insert
        statement (for speed).

        :param dump_filename: filename of the dump
        """
        # Read dump file generated by mysqldump
        with open(dump_filename, "r") as dump_file:
            dump_text = regroup_inserts(dump_file.read())

        with open(dump_filename, "w") as dump_file:
            # add the use database statement at the beginning
            dump_file.write("USE {};\n".format(self.database_name))

            # overwrite the dump with the new single statement version
            dump_file.write(dump_text)

    def update_container(self):
        """
        Copy the newly created database dump files to the local container.
        """
        self.logger.info(" > Update {} sql container".format(self.service))

        for dump_filename in sorted(self.dump_files.keys()):
            file_path = self.dump_path.format(dump_filename)
            copy_command = "docker cp {} {}:/docker-entrypoint-initdb.d/".format(file_path, self.mysql_container)
            self.shell(copy_command, message="       copy {}".format(dump_filename))