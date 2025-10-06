# Start from the official Redis image
FROM redis:latest

# Copy your custom redis.conf into the container
COPY redis.conf /usr/local/etc/redis/redis.conf

VOLUME ["/data"]

EXPOSE 6379

# Run with custom config
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]

