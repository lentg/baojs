# Use the offical Bun image
FROM jarredsumner/bun:edge

# Set the Docker working directory as /usr/src/app
# Copy everything from here into Docker's /usr/src/app
RUN mkdir -p /db

COPY /usr/src/mydb.sqlite /db

WORKDIR /usr/src/app
COPY . /usr/src/app

COPY /dbb/mydb.sqlite /usr/src

# RUN mkdir -p /db
# VOLUME ["/db"]

# Install the dependencies (Bao.js)
RUN bun install

# The port that Bao.js will listen on
EXPOSE 8080

# Run the Bao.js webserver
CMD bun run src/index.ts
