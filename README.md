## THE GETIR API

**This is a Node.js REST API exposing four routes for data storage and collection**

This REST API exposes one route for collecting data stored in a nosql database

## Clone the repository and install dependencies

```bash
git clone git@github.com:yankazela/Getir-Api.git

cd philips-api

npm install

or

yarn add
```

## Start the API 

In development environment

```bash
npm start

or

yarn start

```

In production environment

```bash
npm run start:prod

or

yarn start:prod

```
## Test set up

You will need to install a mongodb instance on your local environment to run the test cases

```bash

npm test

or

yarn test

```

## API access

This API has four access points:

### `/api/get-products`
### `/api/get-product/{id}`
### `/api/add-product`
### `/api/delete-product/{id}`

It runs on

### `3000` or `8080` ports

You must include the headers in the POST request

### `x-access-element` and `x-authorization-element`




