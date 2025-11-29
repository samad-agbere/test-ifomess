FROM node:18

# Dossier de l'app
WORKDIR /app

# Copier package.json
COPY ../package*.json ./

# Install system dependencies for building native modules
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-pip \
    git \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Clean npm cache just in case
RUN npm cache clean --force

# Install dependencies
RUN npm install

# Copier le code
COPY . .

EXPOSE 3000

CMD ["node", "backend/server.js"]
