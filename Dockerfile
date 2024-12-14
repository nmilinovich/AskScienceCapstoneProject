# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=16.20.2
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python

# Copy application code
COPY . .

# Install node modules
COPY package.json ./
RUN npm install

WORKDIR /app/frontend

RUN npm ci

RUN npx vite build

WORKDIR /app/backend/node_modules/sqlite3

RUN npm install

RUN npm install -g sqlite3

WORKDIR /app

# Build application
RUN npm run build

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "start" ]
