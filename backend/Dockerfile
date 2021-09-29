FROM node:latest
# # Create app directory
# WORKDIR /app
# COPY ["package.json", "package-lock.json*", "./"]
# RUN npm install
# COPY . .
# EXPOSE 5000
CMD ["npx", "prisma", "migrate", "dev", "--name", "init"]