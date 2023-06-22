import express from "express";
import { getZodiac, getLuckyZodiac } from "../controllers/zodiac";
import { loggingMiddleware } from "../middlewares/processing";
import { handleErrors } from "../utils/errors";

export function setRoutes(app: express.Express): void {
  try {
    app.get("/", (req, res) => {
      res.send("hello world");
    });

    app.get("/zodiac", loggingMiddleware, getZodiac);

    app.get("/lucky", loggingMiddleware, getLuckyZodiac);

  } catch (err) {
    handleErrors(err);
  }
}
