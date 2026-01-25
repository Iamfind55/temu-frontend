# Use full Node.js 22 image with build tools for native module compilation
FROM node:22

# Set the working directory
WORKDIR /app

# Accept build arguments for NEXT_PUBLIC_ environment variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_CLOUDINARY_URL
ARG NEXT_PUBLIC_UPLOAD_PRESET

# Set environment variables for build time
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_CLOUDINARY_URL=$NEXT_PUBLIC_CLOUDINARY_URL
ENV NEXT_PUBLIC_UPLOAD_PRESET=$NEXT_PUBLIC_UPLOAD_PRESET

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

# Start Next.js in production mode using full path
CMD ["/usr/local/bin/npm", "start"]
