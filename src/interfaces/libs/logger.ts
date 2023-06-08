export interface ILogger {
    log(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    debug(message: string, payload: null | Record<string, any>): void;
    error(message: string, error: unknown): void;
}