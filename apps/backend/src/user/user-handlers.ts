import bcrypt from "bcrypt";
import { makeId } from "../database/db.js";
import { normalizeExpertDetails } from "./user-normalizer.js";
import { validateExpertDetails } from "./user-validator.js";
import { saveExpert } from "./user-queries.js";
import { makeJWT } from "./jwt.js";

import type { Request, Response } from "express";
import type { Expert, NormalizedExpertDetails } from "./user-types.js";

export async function registerExpert(req: Request, res: Response) {
  const normalized = normalizeExpertDetails(req.body);
  const errors = validateExpertDetails(normalized);

  if (errors.length) {
    const result: Record<string, { value: unknown; message: string }> = {};
    for (const { field, value, message } of errors) {
      result[field] = { value, message };
    }

    res.status(422).json(result);
    return;
  }

  // register
  const expert = makeExpert(normalized);
  expert.password = await bcrypt.hash(req.body.password, 12);

  try {
    await saveExpert(expert);
  } catch {
    res.status(500).send();
    return;
  }

  // send access token
  const accessToken = makeJWT({
    id: expert.id,
    name: expert.name,
    role: "expert",
  });
  res.status(201).json({ message: "user created", accessToken });
}

function makeExpert(normalized: NormalizedExpertDetails): Expert {
  return {
    id: makeId(),
    ...normalized,
    gender: normalized.gender as "M" | "F",
  };
}
