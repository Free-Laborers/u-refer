#!/bin/bash
until ls package.json; do
    sleep 0
done
npm install
npx prisma migrate dev --name init 
npx prisma generate
npm start
