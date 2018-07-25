#!/usr/bin/env python3

import logging
import shlex
import subprocess
import sys


def init_logging():
    """
    Initialize logging with a default level to INFO.
    """
    logging.basicConfig(
        format="%(message)s",
        datefmt="",
        level=logging.INFO
    )
    logger = logging.getLogger()
    return logger


class Utils:
    """
    Setup a logger and wrap the subprocess method.
    """

    def __init__(self):
        """
        Initialise the logger.
        """
        self.logger = init_logging()
        # string to print in case a command finishes successfully
        self.success_symbol = u"\u2713"
        # string to print in case a command fails
        self.failure_symbol = u"\u2717"

    def log_no_line_break(self, message):
        """
        Log a message and remove the line break if not in DEBUG level.
        :param message: message to log
        """
        if self.logger.level >= logging.INFO:
            # remove the line break (if not in debug verbosity)
            self.logger.handlers[0].terminator = ""
        self.logger.info(message)
        self.logger.handlers[0].terminator = "\n"

    def shell(self, command, message=None, stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=None):
        """
        Run a shell command.
        :param command: string of the command you want to run
        :param message: message to print (if a message is provided it will also print the failure/success symbol when
            the command finishes)
        :param stdout: command output message, if None print to terminal
        :param stderr: command error message, if None print to terminal
        :param stdin: command prompt input
        """
        if message:
            self.log_no_line_break(message)

        self.logger.debug("Run command: {}".format(command))
        command_return = subprocess.run(
            args=shlex.split(command),
            stdin=stdin,
            stdout=stdout,
            stderr=stderr
        )
        # debug print
        self.logger.debug("Return code: {}".format(command_return.returncode))
        if stdout == subprocess.PIPE:
            self.logger.debug(command_return.stdout.decode("utf-8").strip())
        if stderr == subprocess.PIPE:
            self.logger.debug(command_return.stderr.decode("utf-8").strip())

        if command_return.returncode > 0:
            if message:
                self.logger.info("  {}".format(self.failure_symbol))
            error_message = "[ERROR] Command failed:\n{}".format(command)
            if stderr == subprocess.PIPE:
                error_message += "\nWith error:\n{}".format(command_return.stderr.decode("utf-8").strip())
            self.logger.error(error_message)
            sys.exit(command_return.returncode)
        else:
            if message:
                self.logger.info("  {}".format(self.success_symbol))

        # return the output if it is sent to a pipe
        if stdout == subprocess.PIPE:
            return command_return.stdout.decode("utf-8").strip()
