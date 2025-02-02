# Use Microsoft SQL Server official image
FROM mcr.microsoft.com/mssql/server:2019-latest

# Set environment variables
ENV SA_PASSWORD=YourStrong!Passw0rd
ENV ACCEPT_EULA=Y
ENV MSSQL_PID=Express

# Install necessary tools (sqlcmd, curl, gnupg, etc.)
USER root

RUN apt-get update && \
    apt-get install -y curl apt-transport-https gnupg && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    apt-get install -y mssql-tools unixodbc-dev

# Create a directory for initialization scripts
RUN mkdir -p /docker-entrypoint-initdb.d

# Copy SQL script and entrypoint script into the container
COPY sql-scripts/DBCreation.sql /docker-entrypoint-initdb.d/DBCreation.sql
COPY entrypoint.sh /entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /entrypoint.sh

# Expose MSSQL default port
EXPOSE 1433

# Use the custom entrypoint script
CMD ["/entrypoint.sh"]
