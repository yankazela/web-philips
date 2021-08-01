const express = require('express')
const {getRecordsByDateAndCount, verifyHeaders} = require('./processRequests')

const server = express()

server
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .set('port', process.env.PORT || 8080)
    .use(verifyHeaders)
    .post('/api/get-records', async (req, res) => getRecordsByDateAndCount(req, res))

module.exports = server