import { enviroment } from "./config.js";
import winston from 'winston';
import { __dirname } from "./utils.js";
// Ejercicio multientorno

const ENVIRONMENT = enviroment;
console.log(ENVIRONMENT)
let logger;

const now = new Date();

if (ENVIRONMENT === 'prod') {
    //prodLogger
    logger = winston.createLogger({
        levels: {
            debug: 0,
            http: 1,
            info: 2,
            warn: 3,
            error: 4,
            fatal: 5

        },
        transports: [
            new winston.transports.Console({
                level: 'info'
            }),
            new winston.transports.File({
                filename: `${__dirname}/logs/production.log`,
                level: 'info',
                json: false,
                name: 'error-prod'
            })
        ]
    });
} else {
    //devLogger
    logger = winston.createLogger({
        levels: {
            debug: 0,
            http: 1,
            info: 2,
            warn: 3,
            error: 4,
            fatal: 5

        },
        transports: [
            new winston.transports.Console({
                level: 'debug'
            }),
            new winston.transports.File({
                filename: `${__dirname}/logs/dev.log`,
                level: 'debug',
                json: false,
                name: 'error-dev'
            })
        ]
    });
}

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
    next();
}