# URefer Backend

> Provides the REST API for URefer

## Building

First, **if you have an existing broken docker build** (ie you have
previously tried to set up docker), you must *delete all images and volumes*
(ie, an exorcism). Note that these commands may fail if you have a running
instance. @Luna Phipps-Costin on slack if you get errors from these. *This
should only need to happen once.*

```
docker image rm $(docker image list -q)
docker volume rm $(docker volume list -q)
docker-compose build
```

**For most people** (or after running the above), run this command:

```
docker-compose up
```

If setup was successful, you should see this output: `Server running on PORT 5000`.

You can do two more things to test that things are working:

1. Go to this link: http://localhost:5000/home

   You should see `{"message":"Welcome to the home page!!"}`.

2. Go to http://localhost:5000/company

   You should see `{"data": []}`.

   If you see "DBAuthenticationError", then authentication failed. Check your
   `.env` file and make sure the username and password for the PostgreSQL
   server is correct. NOTE(luna): i don't know what "correct" is. It's working
   on my machine with no `.env` file.
