export interface RawExpertDetails {
  email: unknown;
  password: unknown;
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  specialty: unknown;
  city: unknown;
  phone: unknown;
  languages: unknown;
}

export function normalizeExpertDetails(raw: RawExpertDetails) {
  return {
    email: normalizeString(raw.email).toLowerCase(),
    password: String(raw.password),
    name: normalizeString(raw.name)
      .split(/\s+/)
      .map((part) => part.toLowerCase())
      .join(" "),
    dateOfBirth: normalizeString(raw.dateOfBirth),
    gender: normalizeString(raw.gender).toUpperCase(),
    specialty: normalizeString(raw.specialty).toLowerCase(),
    city: normalizeString(raw.city).toLowerCase(),
    phone: normalizeString(raw.phone),
    languages: normalizeArray(raw.languages).map((lang) => lang.toLowerCase()),
  };
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
