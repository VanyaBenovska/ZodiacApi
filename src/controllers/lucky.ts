import { Request, Response } from "express";
import * as Services from "../dal/lucky";

export async function getLuckyTextByRandomNumber(
  req: Request,
  res: Response
): Promise<void> {
  {
    const luckyText = req?.query?.luckyText;
    let totalResult = "";
    if (typeof luckyText !== "undefined" && luckyText === "lucky") {
      if (luckyText) {
        totalResult = await Services.getLuckyTextByRandomNumber();
      }
    }

    res.send({
      totalResult,
    });
  }
}
