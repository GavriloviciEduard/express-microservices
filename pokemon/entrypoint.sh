#!/bin/sh

echo "Waiting for postgres..."
while ! nc -z db 5432; do
    sleep 0.1
done
echo "PostgreSQL started!"

yarn generate-db
yarn generate-schema
yarn start

exec "$@"