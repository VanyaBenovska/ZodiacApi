import { Request, Response } from "express";
import * as Services from "../dal/lucky";
import { handleErrors } from "../utils/errors";
import { Signs_ZodiacDirBG } from "../utils/constants/signs";
import {
  GetLastElementJSNatFromSignData,
  getTodayAllSignRecordsFromDB,
} from "../dal/zodiacdeep";
import { getText } from "../helpers/arrayProcessing";
import { ISignRecord } from "../interfaces/signs";

export async function getZodiac(req: Request, res: Response): Promise<void> {
  try {
    const sign = req?.query?.sign;
    let totalResult = "";

    if (
      typeof sign !== "undefined" &&
      Signs_ZodiacDirBG.includes(sign as string)
    ) {
      let element = await GetLastElementJSNatFromSignData(sign as string);
      totalResult = getText([element]);
    }

    const resultTextArray = await getTodayAllSignRecordsFromDB();
    if (resultTextArray) {
      totalResult = getText(resultTextArray);
    }
    res.send({
      totalResult,
    });
  } catch (err) {
    const error = handleErrors(err);
    res.status(500).send(error);
  }
}

export async function getLuckyZodiac(
  req: Request,
  res: Response
): Promise<void> {
  {
    try {
      const result = await Services.getLuckyTextByRandomNumber();
      res.send({
        result,
      });
    } catch (err) {
      const error = handleErrors(err);
      res.status(500).send(error);
    }
  }
}
