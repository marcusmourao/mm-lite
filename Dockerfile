FROM node:14.6.0

# Add nove env
ARG HOST=0.0.0.0

ENV PORT 3000

RUN mkdir -p /app
COPY . /app
WORKDIR /app

EXPOSE $PORT

RUN npm ci
RUN npm run build

CMD npm start
