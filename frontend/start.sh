#!/bin/bash
until ls package.json; do
    sleep 0
done
npm start
