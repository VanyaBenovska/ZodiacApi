import { Request, Response } from "express";
import * as Services from "../services/zodiac";
import { saveToFile } from "../helpers/files";
import { SignsBG } from "../models/signs";

export async function getZodiac(req: Request, res: Response) {
  {
    const sign = req?.query?.sign;
    const signResult = await Services.getZodiac(sign as string);
    // await saveToFile(signResult, sign); // todo: case string is for all signs result
    res.send(signResult);
  }
}
