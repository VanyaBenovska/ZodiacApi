import { logger } from "../libs/logger"
import { UNEXPECTED } from "./constants/errors";
import { IBaseResponse } from "../interfaces/libs/base";

export function handleErrors(error: unknown, payload: any = null): IBaseResponse {
    if (error instanceof Error) {
        logger.error(error.message, error);

        return {
            success: false,
            message: error.message
        }
    }

    logger.error(JSON.stringify(error), error);

    return {
        success: false,
        message: UNEXPECTED
    }
}