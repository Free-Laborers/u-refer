FROM node:latest
# Create app directory
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN [ "chmod", "+x", "./migrate_and_start.sh" ]
EXPOSE 5000

CMD [ "./migrate_and_start.sh" ]