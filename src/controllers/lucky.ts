import { Request, Response } from "express";
import * as Services from "../dal/lucky";
import { getText } from "../helpers/arrayProcessing";
import { getTodayAllSignRecordsFromDB } from "../dal/zodiacdeep";

export async function getLuckyTextByRandomNumber(
  req: Request,
  res: Response
): Promise<void> {
  {
    const luckyText = req?.query?.lucky;
    let totalResult = "";
    if (typeof luckyText !== "undefined" && luckyText === "lucky") {
      if (luckyText) {
        totalResult = await Services.getLuckyTextByRandomNumber();
      }
    } else {
      const resultTextArray = await getTodayAllSignRecordsFromDB();
      if (resultTextArray) {
        totalResult = getText(resultTextArray);
      } else {
        console.log("Not ok getting from db..");
      }
    }

    res.send({
      totalResult,
    });
  }
}
