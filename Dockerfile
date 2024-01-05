FROM node:18-alpine

WORKDIR /app

COPY . .

RUN apk update && apk add bash

CMD ["./start.sh"]