import * as userService from "./user-service.js";

import type { Request, Response } from "express";
import type { ExpertFieldError } from "./user-types.js";

export async function registerExpert(req: Request, res: Response) {
  const result = await userService.registerExpert(req.body);

  if (result.type == "validation_error") {
    res.status(422).json(toErrorsMap(result.errors));
    return;
  }

  if (result.type == "conflict") {
    res.status(409).json(toErrorsMap(result.errors));
    return;
  }

  res.status(201).json({ message: "user created", ...result.data });
}

function toErrorsMap(errors: ExpertFieldError[]) {
  const result: Record<string, Omit<ExpertFieldError, "field">> = {};

  for (const { field, ...error } of errors) {
    result[field] = error;
  }

  return result;
}
