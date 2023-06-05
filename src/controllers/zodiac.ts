import { Request, Response } from "express";
import * as Services from "../services/zodiacdeep";

export async function getZodiac(req: Request, res: Response): Promise<void> {
  {
    const sign = req?.query?.sign;
    const totalResult = await Services.getZodiac(sign as string);

    res.send({
      totalResult,
    });
  }
}
