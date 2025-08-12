import bcrypt from "bcrypt";
import * as userRepository from "./user-queries.js";
import * as userNormalizer from "./user-normalizer.js";
import * as userValidator from "./user-validator.js";
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

type LoginResult =
  | { type: "success"; data: { token: string } }
  | { type: "validation_error"; errors: ExpertFieldError[] }
  | { type: "invalid_credentials"; message: string };

const Roles = {
  EXPERT: "expert",
  USER: "user",
} as const;

export async function registerExpert(
  details: RawExpertDetails,
): Promise<RegisterExpertResult> {
  const normalized = userNormalizer.normalizeExpertDetails(details);
  const errors = userValidator.validateExpertDetails(normalized);

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
  const token = makeJWT({
    id: expert.id,
    name: expert.name,
    role: Roles.EXPERT,
  });
  return { type: "success", data: { token } };
}

export async function login(
  details: Pick<RawExpertDetails, "email" | "password">,
): Promise<LoginResult> {
  const normalized = userNormalizer.normalizeLoginDetails(details);
  const errors = userValidator.validateLoginDetails(normalized);

  // TODO: switch from discriminated unions to a custom error
  if (errors.length) {
    return { type: "validation_error", errors };
  }

  const user = await userRepository.findByEmail(normalized.email);
  if (!user) {
    return {
      type: "invalid_credentials",
      message: "Invalid email or password.",
    };
  }

  const isPasswordValid = await bcrypt.compare(
    normalized.password,
    user.password,
  );
  if (!isPasswordValid) {
    return {
      type: "invalid_credentials",
      message: "Invalid email or password.",
    };
  }

  const role = user.specialty ? Roles.EXPERT : Roles.USER;

  const token = makeJWT({ id: user.id, name: user.name, role });
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
