# Stage 1: Build the backend
FROM node:14-alpine AS backend-builder
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app
RUN npm run build

# Stage 2: Build the client
FROM node:14-alpine AS client-builder
WORKDIR /app/client
COPY client/package.json client/package-lock.json /app/client/
RUN npm install
COPY client /app/client
RUN npm run build

# Stage 3: Create the production image
FROM node:14-alpine
WORKDIR /app
COPY --from=backend-builder /app/dist /app/dist
COPY --from=client-builder /app/client/dist /app/client/dist

# Install only production dependencies
COPY package.json package-lock.json /app/
RUN npm install

COPY db /app/db

ENV VITE_URL_BACKEND='https://susan.fly.dev/api/'

ENV DOMAIN='https://susan.fly.dev'
ENV PORT='3000'
ENV BACKEND_URL='https://susan.fly.dev'

# Expose the desired port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start"]
