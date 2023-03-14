FROM node:18-slim

RUN apt-get update && apt install -fy procps \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
