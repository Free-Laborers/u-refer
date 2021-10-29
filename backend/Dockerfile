FROM node:16.13.0
# Create app directory
WORKDIR /app
EXPOSE 5000

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

CMD sh start.sh
