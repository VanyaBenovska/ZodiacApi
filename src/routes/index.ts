import bodyParser from "body-parser";
import express from "express";
import { getZodiac } from "../controllers/zodiac";

export function setRoutes(app: express.Express): void {
  try {
    app.get("/", (req, res) => {
      res.send("hello world");
    });

    app.get("/zodiac", getZodiac);
  } catch (error) {
    console.log(error);
  }
}
