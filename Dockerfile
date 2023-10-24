FROM node:18-alpine

WORKDIR /

# COPY package.json and package-lock.json files
COPY package*.json /

# Install project dependencies using npm
RUN npm ci
RUN npm install

# generated prisma files
COPY prisma /prisma/

COPY . /

# COPY ENV variable
COPY .env /

# COPY tsconfig.json file
COPY tsconfig.json /

RUN npm cache clean --force

RUN npx prisma generate

RUN npx next telemetry disable

# Build the application
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]