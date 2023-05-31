import bodyParser from "body-parser";
import express from "express";
import { getZodiac } from "../controllers/zodiac";
import { getLuckyTextByRandomNumber } from "../controllers/lucky";
import { processingRoutes } from "../middlewares/processing";

export function setRoutes(app: express.Express): void {
  try {
    app.get("/", (req, res) => {
      res.send("hello world");
    });

    app.get("/zodiac", processingRoutes, getZodiac);

    app.get("/lucky", processingRoutes, getLuckyTextByRandomNumber);

  } catch (error) {
    console.log(error);
  }
}
