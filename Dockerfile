# Stage 1: Build Frontend Assets
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies cleanly
RUN npm ci

# Copy project files
COPY . .

# Build production bundle
RUN npm run build

# Stage 2: Production Server (Lightweight Nginx)
FROM nginx:alpine

# Copy built assets to Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom nginx configuration for client-side single page app routing
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
    location /api/openfoodfacts/ { \
        proxy_pass https://world.openfoodfacts.org/; \
        proxy_set_header Host world.openfoodfacts.org; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
