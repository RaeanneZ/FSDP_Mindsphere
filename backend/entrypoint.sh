#!/bin/bash
# Start SQL Server in the background
/opt/mssql/bin/sqlservr &

# Wait for SQL Server to be fully up before running scripts
echo "Waiting for MSSQL to start..."
sleep 15

# Run the SQL script to create the database
echo "Running database initialization script..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -d master -i /docker-entrypoint-initdb.d/DBCreation.sql

echo "Database initialization complete. Keeping container running..."

# Keep the container running
wait
