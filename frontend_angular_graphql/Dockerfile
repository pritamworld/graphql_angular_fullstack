# Step 1: Use an official Node.js image as a base for the build stage
FROM node:16-alpine as build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the Angular app
RUN npm run build --prod

# Step 7: Use a lightweight server (e.g., Nginx) to serve the build
FROM nginx:alpine

# Step 8: Copy the built Angular app into the Nginx container
COPY --from=build /app/dist/your-angular-app /usr/share/nginx/html

# Step 9: Expose port 80
EXPOSE 80

# Step 10: Run Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]

