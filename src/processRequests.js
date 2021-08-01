const Records = require('./model/record')
const bunyan = require('bunyan')

const log = bunyan.createLogger({ name: 'getir-api' })


const getRecordsByDateAndCount = async (req, res) => {
    const data = req.body
    const validationMessages= validateData(data)
    if (validationMessages.length > 0) {
        res.status(403).json({
            "code": 1,
            "msg": "Failure",
            errors: validationMessages
        })
    } else {
        let findResult = []
        Records.find({ createdAt: { $gt: new Date(data.startDate), $lt: new Date(data.endDate)}}).then(
            records => {
                findResult = mapResult(records.filter(record => inCount(record, data.minCount, data.maxCount).status))
                res.status(200).json(findResult)
            }
        ).catch(error => {
            log.error('getRecordsByDateAndCount', error.stack)
            res.status(500).json({ error: error.stack })
        })
    }
}

const verifyHeaders = (req, res, next) => {
    const headers = req.headers
    if (!headers || headers['x-authorization-element'] !== process.env.X_AUTHORIZATION_ELEMENT ||
        headers['x-access-element'] !== process.env.X_ACCESS_ELEMENT) 
        res.status(403).send('Forbiden access!')
    else
        next()
}

const validateData = (data) => {
    return [
        validateDate('startDate', data.startDate),
        validateDate('endDate', data.endDate),
        validateCount('minCount', data.minCount),
        validateCount('maxCount', data.maxCount),
        data.startDate <= data.endDate ? null : 'starDate must be earlier than endDate',
        data.minCount < data.maxCount ? null: 'maxCount must be greater than minCount'
    ].filter(message => message !== null)
}

const mapResult = (results) => {
    const records = []
    results.map(result => {
        records.push({
            key: result.key,
            createdAt: result.createdAt,
            totalCount: result.counts.reduce((a, b) => a + b)
        })
    })

    return { 
        "code": 0,
        "msg": "Success",
        records
    }
}

const validateDate = (dateType, date) => {
    if (date === undefined || date === '')
        return `${dateType} is missing from the input. Date must in YYYY-MM-DD format.`
    if (!isValidDate(date))
        return `${dateType} ${date} is invalid. Date must in YYYY-MM-DD format.`
    return null
}

const validateCount = (countType, count) => {
    if (count === undefined)
        return `${countType} is missing from the input.`
    if (isNaN(parseInt(count)))
        return `${countType} ${count} is an invalid number.`
    return null
}

const inCount = (record, minCount, maxCount) => {
    let sum = 0
    record.counts.map(x => { sum = sum + x })
    return { status: sum <= maxCount && sum >= minCount, totalCount: sum }
}

const isValidDate = (dateString) => {
    const re = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/
    if (!re.test(dateString))
        return false
    const date = new Date(dateString)
    const day = parseInt(dateString.substr(8))
    const totalDaysInMonth = parseInt(new Date(date.getFullYear(), date.getMonth(), 0).getDate())
    return day <= totalDaysInMonth
} 

module.exports = {
    getRecordsByDateAndCount,
    verifyHeaders,
    validateData,
    validateDate,
    validateCount,
    mapResult
}
