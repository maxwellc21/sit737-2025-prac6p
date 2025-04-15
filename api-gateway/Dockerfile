# Use Node.js 18 base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Ensure .env is copied (optional: can also use Docker Compose to inject)
#COPY .env .env

# Expose port
EXPOSE 5000

# Start the app
CMD ["node", "index.js"]
