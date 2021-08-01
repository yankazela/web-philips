
const log = global.logger

const mongoose = require('mongoose')
const Mockgoose = require('mockgoose').Mockgoose

const mongoUrl = process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/JestDB' : process.env.MONGODB_PROD

const connect = () => {
  return new Promise((resolve, reject) => {

    if (process.env.NODE_ENV === 'test') {
      const mockgoose = new Mockgoose(mongoose)

      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(mongoUrl,
            { useNewUrlParser: true, useCreateIndex: true })
            .then((res, err) => {
              if (err) {
                    log.info('fail', err)
                  return reject(err)
              }
              log.info('Test MongoDB successfully connected')
              resolve();
            })
        })
    } else {
        mongoose.connect(mongoUrl,
          { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  })
          .then((res, err) => {
            if (err) return reject(err);
            log.info('MongoDB successfully connected')
            resolve();
          })
    }
  });
}

const close = () => mongoose.disconnect()

module.exports = { connect, close };