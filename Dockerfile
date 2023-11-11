FROM node:20

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm ci
COPY . .

# RUN npx prisma migrate deploy

EXPOSE 3000
CMD [ "npm", "run", "start" ]
