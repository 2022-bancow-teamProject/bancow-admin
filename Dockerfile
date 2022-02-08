# Base on offical Node.js Alpine image
FROM node:14.17.3-buster as build

WORKDIR /app

# Separate layer
COPY package.json package.json 
COPY package-lock.json package-lock.json

# Install dependencies
RUN npm ci --production

# Copy all files
COPY . .

# Build app
RUN npm run build

FROM nginx:1.12-alpine as prod

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
