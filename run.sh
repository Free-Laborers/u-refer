docker-compose up -d db
export DATABASE_URL='postgresql://postgres:docker@localhost:5432/urefer?schema=public'
cd ./backend
npx prisma migrate dev --name init --skip-seed
npx prisma db seed
cd ..
docker-compose up --build -d