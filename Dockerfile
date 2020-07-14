FROM node:12.18.2-alpine3.9
WORKDIR /github
COPY . github
CMD ["yarn", "build", "cdk"]