import { Request, Response } from "express";
import { Signs_ZodiacDirBG } from "../models/signs";
import {
  GetLastElementJSNatFromSignData,
  getTodayAllSignRecordsFromDB,
} from "../dal/zodiacdeep";
import { ISignRecord } from "../interfaces/signs";
import { getText } from "../helpers/arrayProcessing";

export async function getZodiac(req: Request, res: Response): Promise<void> {
  {
    const sign = req?.query?.sign;
    let totalResult = "";

    if (typeof sign !== "undefined") {
      if (Signs_ZodiacDirBG.includes(sign as string)) {
        let result: Array<ISignRecord> = [];
        let element = await GetLastElementJSNatFromSignData(sign as string);
        if (element) {
          result.push(element);
        }
        totalResult = getText(result);
      } else if ((sign as string).toLowerCase() === "zodiac") {
        const resultTextArray = await getTodayAllSignRecordsFromDB();
        if (resultTextArray) {
          totalResult = getText(resultTextArray);
        }
      }
    } else {
      const resultTextArray = await getTodayAllSignRecordsFromDB();
      if (resultTextArray) {
        totalResult = getText(resultTextArray);
      }
    }

    res.send({
      totalResult,
    });
  }
}
