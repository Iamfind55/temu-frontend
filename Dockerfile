# Use full Node.js 22 image with build tools for native module compilation
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Clean install dependencies (ignores package-lock for platform compatibility)
RUN rm -rf node_modules package-lock.json && npm install

# Copy all files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the correct port
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "start"]
