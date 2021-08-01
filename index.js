require('dotenv').config()
var bunyan = require('bunyan')
global.logger = bunyan.createLogger({ name: 'getir-api' })
const app = require('./src/server')
const conn = require('./src/model')

conn.connect().then(() => {
    app.listen(app.get('port'), (error) => {
        if (error) {
            global.logger.error('the api could not start')
        }
        global.logger.info('The API has started successfully on port ' + app.get('port'))
    })
})