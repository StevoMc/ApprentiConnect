FROM node:20-alpine

WORKDIR /usr/src/app
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm config set python /usr/bin/python
RUN npm i -g npm


# COPY package.json and package-lock.json files
COPY package*.json .

# Install project dependencies using npm
RUN npm ci
RUN npm install


RUN npm rebuild bcrypt --build-from-source
RUN apk del builds-deps
# RUN npm install --build-from-source=bcrypt
# RUN npm rebuild bcrypt --build-from-source


# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env .

RUN npx prisma generate
RUN npx prisma db push



COPY . .


# COPY tsconfig.json file
COPY tsconfig.json .

RUN npm cache clean --force


RUN npx next telemetry disable



# Build the application
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]