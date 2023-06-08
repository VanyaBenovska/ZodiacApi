import { Request, Response } from "express";
import { Signs_ZodiacDirBG } from "../models/signs";
import {
  getTodayAllSignRecordsFromDB,
  getTodaySignRecordFromDB,
} from "../dal/zodiacdeep";

export async function getZodiac(req: Request, res: Response): Promise<void> {
  {
    const sign = req?.query?.sign;

    console.log(sign);
    let totalResult = [{}];

    if (
      typeof sign !== "undefined" &&
      Signs_ZodiacDirBG.includes(sign as string)
    ) {
      if (sign) {
        totalResult.push(await getTodaySignRecordFromDB(sign as string));
      } else {
        totalResult.push(await getTodayAllSignRecordsFromDB());
      }
    }

    res.send({
      totalResult,
    });
  }
}
