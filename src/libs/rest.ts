import express from "express";
import { logger } from "./logger";

export const app = express();

export function startServer(): void {
  app.listen(3000, () => {
    logger.info("Listening on port 3000");
  });
}
