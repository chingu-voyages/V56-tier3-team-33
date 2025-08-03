import type { Request, Response } from "express";

export function registerExpert(req: Request, res: Response) {
  res.status(200).json({ message: "This is expert signup" });
}
