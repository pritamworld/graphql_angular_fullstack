# Step 1: Use the official Node.js image as a base
FROM node:16-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the port your app will run on (default for Express is 3000)
EXPOSE 4000

# Step 7: Run the app
CMD ["npm", "start"]
