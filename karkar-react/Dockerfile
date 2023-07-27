# Use an official Node.js runtime as the base image
FROM node:16 as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Node.js runtime for serving the static files
FROM node:16 as production-stage

# Set the working directory in the container
WORKDIR /app

# Copy the built static files from the build-stage
COPY --from=build-stage /app/build /app/build

# Install a simple web server to serve the static files
RUN npm install -g serve

# Expose the port on which the app will run (adjust if your React app runs on a different port)
EXPOSE 3000

# Start the server to serve the static files
CMD ["serve", "-s", "build", "-l", "3000"]
