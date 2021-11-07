FROM node:16.13.0
# Create app directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . ./

EXPOSE 3000
CMD ./start.sh
