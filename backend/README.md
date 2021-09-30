# UKG Backend

 UKG Backend Development Environment Set up

## Docker
  ###
    Hello
    Hello




## PostgreSQL
 ### Note:
   You will use Docker to install PostgreSQL. The DB setup team will add the instruction. When you do setup, make sure you know three things!
   1. PostgreSQL server port (default: 5432)
   2. PostgreSQL server username
   3. PostgreSQL server password

## Backend Environment Setup
  ### Clone(Download) backend code
  1. Go to your directory for the project in your terminal
  2. Run: 
  ```bash
    git clone https://github.com/Free-Laborers/u-refer-backend.git
  ```
  3. Go to the directory “u-refer-backend” (You should have one!)
  4. [optional but highly recommended] Run:
  ```bash
    git checkout -b <your branch name>
  ```
  ## PLEASE DO NOT PUSH YOUR CODE TO MAIN BRANCH DIRECTLY. ALWAYS CREATE A NEW BRANCH, DO DEVELOPMENT, AND MAKE PULL REQEST.

  5. Run:
  ```bash
    git pull origin backend-development-environment-setup
  ```

  You have successfully downloaded the backend codebase!

## Finalize Backend development Setup
  Now that we download both PostgreSQL (in Docker) and backend code, it's time to make the connection between them.
  1. Run:
  ```bash
    npm install
  ```
  2. create .env file in the root directory (the folder where package.json is)
  3. Put this line to the .env file you have just created:
  ```bash
    DATABASE_URL="postgresql://<Postgres_username>:<Postgres_password>@localhost:5432/<database_name>?schema=public"
  ```
  4. Run:
  ```bash
   npx prisma generate
   npx prisma migrate dev --name init
  ```

  5. Run:
  ```bash
   npm run start
  ```
  If the backend code is running correctly: It should have the following line on your console:
  ```bash
   Server running on PORT 5000 
  ```
  6. Go to this link: http://localhost:5000/home .
  You should be able to see {"message":"Welcome to the home page!!"}

  7. Go to http://localhost:5000/company <br />
  If you found {"data": []}, that means the express server is connected with Database:<br />
  If you found "DBAuthenticationError", that means the authentication fails and you should check your .env file. Make sure the username and password for the PostgreSQL server is correct._action_1n6lm_13<br />
  If you found sth else, that is the bug I has not encountered... so you should google it to find out. Sorry!





 