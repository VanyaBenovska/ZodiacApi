import { Request, Response } from "express";
import * as Services from "../services/zodiac";
import { SignsBGtexts } from "../services/zodiac";

export async function getZodiac(req: Request, res: Response): Promise<void> {
  {
    const sign = req?.query?.sign;
    const signResult = await Services.getZodiac(sign as string);
    const totalResult = await convertMapToObject();
    // SaveObjectInfoToDB(totalResult); // TODO ! 

    // todo: await saveToFile(all signs result)
    res.send({
      totalResult,
    });
  }

  async function convertMapToObject(): Promise<Record<string, string>> {
    let newObject: Record<string, string> = {};
    for (let [key, value] of SignsBGtexts) {
      newObject[key] = value;
    }
    return newObject;
  }
}
