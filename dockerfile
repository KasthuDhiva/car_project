# Use an official Node.js runtime as a parent image
FROM node:18

# Set environment variables
ENV PORT=1213
ENV JWT_SECRET=Kasthuri
ENV JWT_EXPIRES_IN=1d
ENV MONGO_URI=mongodb+srv://rkasthuri2002:WMt8k9eeHyFvriHS@cluster0.7v4p4lb.mongodb.net/CarWash?retryWrites=true&w=majority&appName=Cluster0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE $PORT

# Define the command to run your app
CMD ["npm", "start"]
