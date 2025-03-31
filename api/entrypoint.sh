#!/bin/sh

prisma generate
prisma migrate deploy

node dist/main.js
