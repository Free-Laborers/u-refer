docker-compose up --build -d
docker exec -it urefer-backend npx prisma migrate dev --name init
docker cp urefer-backend:/app/prisma/migrations ./backend/prisma