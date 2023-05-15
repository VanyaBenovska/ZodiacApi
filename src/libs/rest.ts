import express from "express";

export const app = express();

export function startServer() {
  app.listen(3000, () => {
    console.log("Listening on port 3000 new");
  });
}
