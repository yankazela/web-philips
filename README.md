## THE GETIR API

**This is a Node.js REST API exposing one post route for data collection**

This REST API exposes one route for collecting data stored in a nosql database

## Clone the repository and install dependencies

```bash
git clone git@github.com:yankazela/Getir-Api.git

cd getir-api

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

This API has only one POST access point:

### `/api/get-records`

It runs on

### `3000` or `8080` ports

You must include the headers in the POST request

### `x-access-element` and `x-authorization-element`

A post request must comme in the following form:

```js
{
    "startDate": "xxxx-xx-xxx",
    "endDate": "xxxx-xx-xxx",
    "minCount": 1234,
    "maxCount": 6789
}

```


