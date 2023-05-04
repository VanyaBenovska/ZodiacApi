import { saveToFile } from "./src/helpers/files.js";
import { getZodiac } from "./src/services/zodiac.js";
import express from "express";
const app = express();

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

app.get("/", async (req, res) => {
  const zodiacResult = await getZodiac(req.query.sign);
  await saveToFile(zodiacResult, req.query.sign);
  res.send(zodiacResult);
});
