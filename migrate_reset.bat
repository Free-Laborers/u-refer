@echo off

@REM drops the database and creates a new one before applying all migrations.

CALL docker-compose up -d db
set DATABASE_URL=postgresql://postgres:docker@localhost:5432/urefer?schema=public
cd .\backend
CALL npx prisma migrate reset --skip-seed @REM seeding will be done by run...?