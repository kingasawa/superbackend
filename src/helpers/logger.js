const winston = require('winston')
// const { NODE_ENV } = require('../config/config').config
// const { LoggingWinston } = require('@google-cloud/logging-winston')

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    // (NODE_ENV === 'development') ? new winston.transports.Console() : new LoggingWinston()
    new winston.transports.Console()
  ]
})

module.exports = logger
