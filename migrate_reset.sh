docker-compose up -d db
export DATABASE_URL='postgresql://postgres:docker@urefer-db:5432/urefer?schema=public'
cd ./backend
npx prisma migrate reset --skip-seed # seeding will be done by run...?