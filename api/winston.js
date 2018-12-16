const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.colorize(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
    ),
    transports: [new transports.Console({
        json: false
    })]
});

logger.stream = {
    write: function (message, encoding) {
        if (process.env.NODE_ENV !== 'test')
            logger.info(message);
    }
}

module.exports = logger;