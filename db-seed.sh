#!/bin/bash

# Wait for the database to be ready
while ! pg_isready -U $DB_USER -d $DB_NAME -h db -p 5432; do
  echo "Waiting for database to be ready..."
  sleep 1
done

echo "Database is ready."

# Check if the migrations table exists (or any other indicator of seeding)
if psql -U $DB_USER -d $DB_NAME -h db -p 5432 -t -c "SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'drizzle_migrations');" | grep -q "t"; then
  echo "Database already seeded. Skipping seeding."
else
  echo "Database not seeded. Running migrations and seed script..."

  # Run migrations
  pnpm db:migrate

  # Run seeding
  pnpm db:seed

  echo "Database seeding complete."
fi

# ... any other commands you need to run after seeding