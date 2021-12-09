@echo off

@REM drops the database and creates a new one before applying all migrations.

CALL docker-compose up -d db
SET DATABASE_URL=postgresql://postgres:docker@localhost:5433/urefer?schema=public
IF DEFINED UREFER_DB_PORT SET DATABASE_URL=postgresql://postgres:docker@localhost:%UREFER_DB_PORT%/urefer?schema=public
CD .\backend
@REM allow time for db to start... sometimes migrates before db is started.
TIMEOUT /t 5
CALL npx prisma migrate reset --skip-seed @REM seeding will be done by run...?