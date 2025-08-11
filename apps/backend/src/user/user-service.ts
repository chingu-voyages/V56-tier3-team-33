import bcrypt from "bcrypt";
import * as userRepository from "./user-queries.js";
import { normalizeExpertDetails } from "./user-normalizer.js";
import { validateExpertDetails } from "./user-validator.js";
import { makeId } from "../database/db.js";
import { makeJWT } from "./jwt.js";

import type {
  Expert,
  ExpertFieldError,
  NormalizedExpertDetails,
  RawExpertDetails,
} from "./user-types.js";

type RegisterExpertResult =
  | { type: "success"; data: { token: string } }
  | { type: "validation_error"; errors: ExpertFieldError[] }
  | { type: "conflict"; errors: ExpertFieldError[] };

export async function registerExpert(
  details: RawExpertDetails,
): Promise<RegisterExpertResult> {
  const normalized = normalizeExpertDetails(details);
  const errors = validateExpertDetails(normalized);

  // TODO: switch from discriminated unions to a custom error
  if (errors.length) {
    return { type: "validation_error", errors };
  }

  const isEmailTaken = await userRepository.findByEmail(normalized.email);
  if (isEmailTaken) {
    return {
      type: "conflict",
      errors: [
        { field: "email", message: "Email is taken.", value: normalized.email },
      ],
    };
  }

  const expert = makeExpert(normalized);
  expert.password = await bcrypt.hash(normalized.password, 12);

  await userRepository.saveExpert(expert);
  const token = makeJWT({ id: expert.id, name: expert.name, role: "expert" });
  return { type: "success", data: { token } };
}

// TODO: if used somewhere else, extract it into its own file
function makeExpert(normalized: NormalizedExpertDetails): Expert {
  return {
    id: makeId(),
    ...normalized,
    gender: normalized.gender as "M" | "F",
  };
}
