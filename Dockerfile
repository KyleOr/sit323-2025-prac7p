# Use Node.js image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy app files
COPY package*.json ./
RUN npm install
COPY . .

# Expose port and run the app
EXPOSE 3000
CMD [ "node", "index.js" ]
