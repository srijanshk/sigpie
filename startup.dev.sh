#!/bin/bash

npm run migration:run --env production
npm run start:prod
#/opt/wait-for-it.sh postgres:5432 -- npm run migration:run && npm run seed:run
