// transport layer logic goes here
import type { Request, Response } from "express";

export function stubHandler(req: Request, res: Response) {
  res.send("Hello world!");
}
