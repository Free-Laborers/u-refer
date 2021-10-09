docker-compose up --build -d
docker exec -it urefer-backend npx prisma migrate dev --name init --skip-seed
docker exec -it urefer-backend npx prisma db seed
docker cp urefer-backend:/app/prisma/migrations ./backend/prisma