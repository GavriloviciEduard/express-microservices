FROM node:16-buster-slim

# Install system dependencies
RUN apt-get update \
    && apt-get -y install netcat nginx \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Setup for app
WORKDIR /usr/src/app
COPY . .
RUN yarn install
RUN yarn global add prisma

# Run entrypoint.sh
RUN chmod +x entrypoint.sh
ENTRYPOINT ["sh", "entrypoint.sh"]
