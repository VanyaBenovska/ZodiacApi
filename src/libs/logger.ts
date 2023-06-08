
import { createLogger, transports, format } from 'winston';
import { ILogger } from "../interfaces/libs/logger";
// import { LOG_LEVEL } from '../utils/configurations';

const { combine, timestamp, printf, colorize, errors } = format

const customFormat = combine(
    errors({ stack: true, reason: true }),
    colorize(),
    timestamp({ format: 'DD-MMM-YYYY HH:mm:ss'}),
    printf((info) => {
        let message = `${info.timestamp} | ${info.level} | ${info.message}`;
        message += `${info.stack ? `| Stack: \n ${info.stack}` : ""}`;
        message += `${info.reason ? `\n Reason: \n ${JSON.stringify(info.reason)}` : ""}`;

        return message;
        }
    )
)

const allTransports = [
    new transports.Console({ format: customFormat })
]

class Logger implements ILogger {
    protected loggerService: any;

    constructor() {
        this.loggerService = createLogger({ 
            exitOnError: false,  
            transports: allTransports,
          // level: LOG_LEVEL
        })
    }

    public log(message: string): void {
        this.loggerService.log(message);
    }

    public info(message: string): void {
        this.loggerService.info(message);
    }

    public warn(message: string): void {
        this.loggerService.warn(message);
    }

    public debug(message: any, payload: null | Record<string, any> = null): void {
        this.loggerService.debug(payload ? `${message} | Payload: \n${JSON.stringify(payload)}` : message);
    }

    public error(message: string, error: unknown = {}): void {
        this.loggerService.error(message, error);
    }
}

export const logger = new Logger();