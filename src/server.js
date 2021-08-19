const express = require('express')
const processRequests = require('./processRequests')

const server = express()

server
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .set('port', process.env.PORT || 8080)
    // .use(verifyHeaders)
    .get('/api/get-products', async (req, res) => processRequests.collectProducts(req, res))
    .get('/api/get-product/:id', async (req, res) => processRequests.collectProduct(req, res))
    .post('/api/add-product', async (req, res) => processRequests.createProduct(req, res))
    .delete('/api/delete-product/:id', async (req, res) => processRequests.deleteProduct(req, res))


    

module.exports = server