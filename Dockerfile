# Base on offical Node.js Alpine image
FROM node:alpine

WORKDIR /app

# Separate layer
COPY package.json package.json 
COPY package-lock.json package-lock.json

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build app
RUN npm run build

# Expose the listening port

CMD [ "npm", "start" ]
