import { Request, Response } from "express";

export async function processingRoutes(
  req: Request,
  res: Response,
  next: any
): Promise<void> {
  console.info(
    `HTTP: ${req.httpVersion} | METHOD: ${req.method} | PATH: ${req.path} `
  );
  next();
}
