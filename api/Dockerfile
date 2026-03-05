FROM node:20

WORKDIR /app

# Copy only API package files first (for caching)
COPY api/package.json api/package-lock.json ./
RUN npm install

# Copy API source
COPY api/ ./

# Copy migrations
COPY db/ ./db

EXPOSE 4000

CMD ["node", "server.js"]