const { createLogger, transports, format } = require('winston');

let label = '';
const getLabel = fileName => fileName.split('\\').slice(-1).join('\\');

const getLogger = fileName => {
  label = getLabel(fileName);
  return process.env.NODE_ENV === 'development' ? devLogger : prodLogger;
}

const devLogger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(info => `${info.level}[${label}]:\n${info.message}`),
      )
    })
  ],
})

const prodLogger = createLogger({
  level: 'error',
  transports: [
    new transports.File({
      filename: './log/info.log',
      format: format.printf(info => `${info.level}[${label}]:\n${info.message}`),
    })
  ],
  exceptionHandler: [
    new transports.File({
      filename: './log/exception.log',
      format: format.printf(info => `${info.level}[${label}]:\n${info.message}`),
    })
  ]
})

module.exports = getLogger