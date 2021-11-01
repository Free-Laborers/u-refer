@echo off
@REM cd frontend
@REM CALL npm ci
@REM cd ..
@REM cd .\backend
@REM CALL npm ci
@REM cd ..
CALL docker-compose up --build -d
CALL docker exec -it urefer-backend npx prisma migrate dev --name init --skip-seed
CALL docker exec -it urefer-backend npx prisma db seed
@REM CALL docker cp urefer-backend:/app/prisma/migrations ./backend/prisma
