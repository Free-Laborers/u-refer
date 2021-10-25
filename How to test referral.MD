## Note

0.  this is the instruction for running backend and frontend server from host without using docker. I did not test it with docker because I am waiting for docker_env branch to be merged. 

## DB setup
1. cd backend, then run  ```npx prisma migrate reset --skip-seed```
2. run ``` npx prisma migrate dev --name init ```.  If it asks you to reset again, do reset.
3. run ```npx prisma db seed```. It makes the seed data, and you should see the message ``` The seed command has been executed.```



