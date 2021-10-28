@echo off
cd frontend
CALL npm ci
cd ..
cd .\backend
CALL npm ci
cd ..
CALL docker-compose up --build -d
CALL docker exec -it urefer-backend npx prisma migrate dev --name init --skip-seed
CALL docker exec -it urefer-backend npx prisma db seed
@REM CALL docker cp urefer-backend:/app/prisma/migrations ./backend/prisma
