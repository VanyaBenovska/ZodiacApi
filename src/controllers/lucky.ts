import { Request, Response } from "express";
import * as Services from "../dal/lucky";

export async function getLuckyTextByRandomNumber(
  req: Request,
  res: Response
): Promise<void> {
  {
    const luckyText = await Services.getLuckyTextByRandomNumber();

    res.send({
      luckyText,
    });
  }
}