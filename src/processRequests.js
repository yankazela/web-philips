const axios = require('axios')
const bunyan = require('bunyan')

const log = bunyan.createLogger({ name: 'philips-api' })
const apiUrl = process.env.PRODUCT_API_BASEURL + 'test/supply-chain'
const retryTimes = process.env.ALLOW_RETRY_TIMES

const collectProducts = async(req, res) => {
    let success = false
    let response = null
    let error
    const url = apiUrl
    for (let i = 0; i < retryTimes; i++) {
        try {
            log.info('collecting all product from ', url, 'attempt', i + 1)
            response = await axios.get(url)
            success = true
            break
        } catch(err) {
            log.error('collecting all product from at attempt ', i + 1, err.message)
            error = err
        }  
    }
    if (success)
        res.status(200).json(response.data)
    else
        res.status(error.statusCode || 500).json({ message: error.message})
}

const collectProduct = async(req, res) => {
    let success = false
    let response = null
    let error
    const url = apiUrl + '/' + req.params.id
    for (let i = 0; i < retryTimes; i++) {
        try {
            log.info('collecting product from ', req.params.id, url, 'attempt', i + 1)
            response = await axios.get(url)
            success = true
            break
        } catch(err) {
            log.error('collecting a product from at attempt ', i + 1, err.message)
            error = err
        }  
    }
    if (success)
        res.status(200).json(response.data)
    else
        res.status(error.statusCode || 500).json({ message: error.message})
}

const deleteProduct = async(req, res) => {
    let success = false
    let response = null
    let error
    const url = apiUrl + '/' + req.params.id
    for (let i = 0; i < retryTimes; i++) {
        try {
            log.info('deleting product from ', req.params.id, url, 'attempt', i + 1)
            response = await axios.delete(url)
            success = true
            break
        } catch(err) {
            log.error('collecting all product from at attempt ', i + 1, err.message)
            error = err
        }  
    }
    if (success)
        res.status(200).json(response.data)
    else
        res.status(error.statusCode || 500).json({ message: error.message})
}

const createProduct = async (req, res) => {
    let success = false
    let response = null
    let error
    const body = req.body
    const url = apiUrl
    for (let i = 0; i < retryTimes; i++) {
        try {
            log.info('creating a new product from ', url, 'attempt', i + 1)
            response = await axios.post(url, body)
            success = true
            break
        } catch(err) {
            log.error('collecting all product from at attempt ', i + 1, err.message)
            error = err
        }  
    }
    if (success)
        res.status(200).json(response.data)
    else
        res.status(error.statusCode || 500).json({ message: error.message})
}

const verifyHeaders = (req, res, next) => {
    const headers = req.headers
    if (!headers || headers['x-authorization-element'] !== process.env.X_AUTHORIZATION_ELEMENT ||
        headers['x-access-element'] !== process.env.X_ACCESS_ELEMENT) 
        res.status(403).send('Forbiden access!')
    else
        next()
}

module.exports = {
    collectProduct,
    createProduct,
    deleteProduct,
    collectProducts,
    verifyHeaders
}
