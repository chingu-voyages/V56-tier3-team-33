import type { Request, Response } from "express";

export async function registerExpert(req: Request, res: Response) {
  // normalize
  const normalized = {
    email: normalizeString(req.body.email).toLowerCase(),
    password: String(req.body.password),
    name: normalizeString(req.body.name)
      .split(/\s+/)
      .map((part) => part.toLowerCase())
      .join(" "),
    dateOfBirth: normalizeString(req.body.dateOfBirth),
    gender: normalizeString(req.body.gender).toUpperCase(),
    city: normalizeString(req.body.city).toLowerCase(),
    phone: normalizeString(req.body.phone),
    languages: normalizeArray(req.body.languages).map((language) =>
      language.toLowerCase(),
    ),
    specialties: normalizeArray(req.body.specialties).map((specialty) =>
      specialty.toLowerCase(),
    ),
  };

  {
    // validate
  }

  {
    // register
  }

  {
    // return token
  }

  res
    .status(200)
    .json({ message: "normalization result:", data: req.body, normalized });
}

function normalizeArray(value: unknown) {
  if (!Array.isArray(value)) {
    console.warn("Expected array but got", typeof value, value);
    return [];
  }

  return value.map(normalizeString).filter(Boolean);
}

function normalizeString(value: unknown) {
  // invalid values coming over the wire via JSON are
  // null, true, false, objects and arrays
  if (
    value == undefined ||
    typeof value == "boolean" ||
    typeof value == "object"
  ) {
    return "";
  }

  return String(value).trim();
}
