@echo off
cd %~dp0frontend
CALL npm install
cd ..
cd .\backend
CALL npm install
cd ..
CALL docker-compose up --build -d
CALL docker exec -it urefer-backend npx prisma migrate dev --name init --skip-seed
CALL docker exec -it urefer-backend npx prisma db seed
@REM CALL docker cp urefer-backend:/app/prisma/migrations ./backend/prisma