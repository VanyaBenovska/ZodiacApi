import bodyParser from "body-parser";
import express from "express";
import { getZodiac } from "../controllers/zodiac";
import { getLuckyTextByRandomNumber } from "../controllers/lucky";
import { loggingMiddleware } from "../middlewares/processing";

export function setRoutes(app: express.Express): void {
  try {
    app.get("/", (req, res) => {
      res.send("hello world");
    });

    // http://localhost:3000/zodiac?sign=leo

    app.get("/zodiac", loggingMiddleware, getZodiac);

    app.get("/lucky", loggingMiddleware, getLuckyTextByRandomNumber);
    
  } catch (error) {
    console.log(error);
  }
}
