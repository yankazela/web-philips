require('dotenv').config()
var bunyan = require('bunyan')
global.logger = bunyan.createLogger({ name: 'philips-api' })
const app = require('./src/server')

app.listen(app.get('port'), (error) => {
    if (error) {
        global.logger.error('the api could not start')
    }
    global.logger.info('The API has started successfully on port ' + app.get('port'))
})