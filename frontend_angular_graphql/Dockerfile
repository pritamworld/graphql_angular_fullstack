# -------- Stage 1: Build Angular App --------
FROM node:18-alpine AS build

WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install dependencies (faster + clean)
RUN npm ci

# Copy rest of the app
COPY . .

# Build Angular app (modern flag)
RUN npm run build -- --configuration production

# -------- Stage 2: Serve with Nginx --------
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular build output
COPY --from=build /app/dist/frontend-angular-graphql /usr/share/nginx/html

# Optional: custom nginx config (for Angular routing)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
