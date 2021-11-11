@echo off

@REM migrate beforehand - spin up database and then migrate and then spin up the rest.

CALL docker-compose up -d db
SET DATABASE_URL=postgresql://postgres:docker@localhost:5433/urefer?schema=public
IF DEFINED UREFER_DB_PORT SET DATABASE_URL=postgresql://postgres:docker@localhost:%UREFER_DB_PORT%/urefer?schema=public
CD .\backend
CALL npx prisma migrate dev --name init --skip-seed
CALL npx prisma db seed
CD ..
CALL docker-compose up --build -d
