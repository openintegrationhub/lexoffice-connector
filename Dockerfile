FROM node:16.0-alpine3.12
LABEL NAME="lexoffice-connector"
LABEL SUMMARY="This image is used to start the lexoffice Adapter for OIH"

RUN apk --no-cache add \
    make \
    g++ \
    libc6-compat

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install --production

COPY . /usr/src/app

RUN chown -R node:node .

USER node

ENTRYPOINT ["npm", "start"]
