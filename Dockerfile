FROM node:14-alpine
RUN apk --no-cache add --virtual builds-deps build-base \
    python \
    make \
    g++ \
    libexecinfo \
    libexecinfo-dev

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm rebuild bcrypt --build-from-source
COPY . .
CMD ["npm", "run", "start:dev"]