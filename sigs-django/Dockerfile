FROM python:3.5.1

MAINTAINER Louis Byrne <louisbyrne89@gmail.com>

# Set the current working dir to "/app"
RUN mkdir /code
WORKDIR /code
ADD . /code
# Add files to code directory so they can be found by docker build
COPY requirements.txt /code/requirements.txt
COPY requirements.txt ./requirements.txt
# Upgrade pip and install requirements via pip
RUN pip install --upgrade pip && pip install -r requirements.txt
# Expose port 8000:
EXPOSE 8000

# Define an environment variable
ENV PYTHONUNBUFFERED 1

# Run app when container is launched
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

