const winston = require('winston');

const isProduction = process.env.NODE_ENV === 'production';

const transports = [];

if (isProduction) {
    // In production/serverless: use console only (Vercel has read-only filesystem)
    transports.push(new winston.transports.Console({
        format: winston.format.simple(),
    }));
} else {
    // In development: log to files and console
    transports.push(
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports,
});

module.exports = logger;
