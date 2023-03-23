# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in package.json
RUN npm install

# Make port 4200 available to the world outside this container
EXPOSE 4200

# Run the command to start the server
CMD ["npm", "start"]
