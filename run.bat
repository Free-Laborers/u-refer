@REM @echo off
@REM migrate beforehand - spin up database and then migrate and then spin up the rest.

CALL docker-compose up -d db
set DATABASE_URL=postgresql://postgres:docker@localhost:5432/urefer?schema=public
cd .\backend
CALL npx prisma migrate dev --name init --skip-seed
CALL npx prisma db seed
cd ..
CALL docker-compose up --build -d
