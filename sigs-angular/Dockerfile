FROM node:6.11.3

MAINTAINER Louis Byrne <louisbyrne89@gmail.com>

# Expose the correct port
EXPOSE 4200

# Add an "app" user to run our Angular application
RUN useradd --user-group --create-home --shell /bin/false app

# Set environment variables
ENV HOME=/home/app APP_NAME=app_placeholder

# Create app directory and setup correct permissions
RUN mkdir -p $HOME/$APP_NAME && chown -R app:app $HOME/*
# Switch working directory
WORKDIR $HOME/$APP_NAME

#Add package.json
ADD app_placeholder/package.json $HOME/$APP_NAME/package.json

# Install dependencies
RUN npm install --quiet && npm install -g --quiet @angular/cli
# Move launch file
ADD app_placeholder/launch.sh $HOME/$APP_NAME-frontend/$APP_NAME/launch.sh 

# Change working directory
WORKDIR $HOME/$APP_NAME-frontend/$APP_NAME
# Change owner of launch file
RUN ["chmod", "+x", "launch.sh"]
# Copy all files, this uses .dockerignore
COPY . $HOME/$APP_NAME-frontend/

# Switch user
USER app
# Start serving (use this only for development mode)
CMD ["npm", "start"]
