1. Just try to run the "run.sh" or "run.bat" file. If it does migrate, good for you! You are done and don't need to do anyting <br/>

If it is not working, then proceed to step2. It will be somewhat long process, but once you have done this, then you will not need to reset your schema any longer, so you don't need to do this again in the future!

2. There could be a case (this is not an error) that your console has the following statements and does not update anything:
```
? - Drift detected: Your database schema is not in sync with your migration history.
urefer-backend      | 
urefer-backend      | The following is a summary of the differences between the expected database schema given your migrations files, and the actual schema of the database.
urefer-backend      | 
urefer-backend      | It should be understood as the set of changes to get from the expected schema to the actual schema.
urefer-backend      | 
urefer-backend      | [+] Added tables
urefer-backend      |   - Candidate
urefer-backend      |   - Employee
urefer-backend      |   - JobPost
urefer-backend      |   - PostToTag
urefer-backend      |   - Referral
urefer-backend      |   - Tags
urefer-backend      | 
urefer-backend      | [*] Changed the `Candidate` table
urefer-backend      |   [+] Added unique index on columns (email)
urefer-backend      |   [+] Added unique index on columns (employeeId)
urefer-backend      | 
urefer-backend      | [*] Changed the `Employee` table
urefer-backend      |   [+] Added unique index on columns (email)
urefer-backend      | 
urefer-backend      | [*] Changed the `JobPost` table
urefer-backend      |   [+] Added foreign key on columns (hiringManagerId)
urefer-backend      | 
urefer-backend      | [*] Changed the `PostToTag` table
urefer-backend      |   [+] Added foreign key on columns (jobPostId)
urefer-backend      |   [+] Added foreign key on columns (tagId)
urefer-backend      | 
urefer-backend      | [*] Changed the `Referral` table
urefer-backend      |   [+] Added foreign key on columns (candidateId)
urefer-backend      |   [+] Added foreign key on columns (employeeId)
urefer-backend      |   [+] Added foreign key on columns (jobPostId)
urefer-backend      | 
urefer-backend      | - The following migration(s) are applied to the database but missing from the local migrations directory: 20211003232312_init
urefer-backend      | 
urefer-backend      | 
urefer-backend      | We need to reset the PostgreSQL database "urefer" at "172.19.0.2:5432".
```
<br/>

This is because you need to reset ur database. When you reset the database with Prisma, it asks again for the confirmation of the reset. However, your current console is not interactive, and there is no way that you can say "yes!" for the confirmation. The solution is to use the interactive console. 

3. Open another terminal. Run: ```docker exec -it urefer-backend bash ```. This means now you are using the console for the container.
4. Run: ```npx prisma migrate dev --name init```
5. It will ask the same huge things, but this time, you will be able to say "Yes" by typing "y".

```
We need to reset the PostgreSQL database "urefer" at "172.19.0.2:5432".
Do you want to continue? All data will be lost. › (y/N)
```

6. Say "yes", and then your database will be updated.
7. Open another terminal. Go to the root folder. Run: ```docker cp urefer-backend:/app/prisma/migrations ./backend/prisma```

Finally, It is done.
