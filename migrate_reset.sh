docker-compose up -d db
export DATABASE_URL="postgresql://postgres:docker@localhost:${UREFER_DB_PORT:-5433}/urefer?schema=public"
cd ./backend
sleep 5 # allow time for db to start... sometimes migrates before db is started.
npx prisma migrate reset --skip-seed # seeding will be done by run...?