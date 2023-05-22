import bodyParser from "body-parser";
import express from "express";
import { getZodiac } from "../controllers/zodiac";
import { processingRoutes } from "../middlewares/processing";

export function setRoutes(app: express.Express): void {
  try {
    app.get("/", (req, res) => {
      res.send("hello world");
    });

    app.get("/zodiac", processingRoutes, getZodiac);
  } catch (error) {
    console.log(error);
  }
}
