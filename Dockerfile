# Build stage
FROM node:20 as builder

WORKDIR /usr/src/app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of your app's source code
COPY . .

# Build the app
RUN yarn build

# Production stage
FROM nginx:latest

# Copy built assets from builder stage
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/snippets/ssl-params.conf /etc/nginx/snippets/ssl-params.conf
COPY nginx/snippets/proxy-params.conf /etc/nginx/snippets/proxy-params.conf
COPY studentHubLandingPage landingPage/

# Expose the port the app runs on
EXPOSE 80 443