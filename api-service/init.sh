
until nc -z postgres_db 5432; do
  sleep 1
done

echo "Migrating..."

npm run migrate:dev
npm run seed

npm run start