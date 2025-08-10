import cities from "../data/cities.json" with { type: "json" };
import languages from "../data/languages.json" with { type: "json" };

import type { NormalizedExpertDetails } from "./user-types.js";

interface ExpertFieldError {
  field: keyof NormalizedExpertDetails;
  message: string;
  value: unknown;
}

export function validateExpertDetails(normalized: NormalizedExpertDetails) {
  const errors: ExpertFieldError[] = [];
  if (!isValidEmail(normalized.email)) {
    errors.push({
      field: "email",
      value: normalized.email,
      message: "Email must be a valid address.",
    });
  }

  if (!isValidPassword(normalized.password)) {
    errors.push({
      field: "password",
      value: normalized.password,
      message:
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
    });
  }

  if (!isValidName(normalized.name)) {
    errors.push({
      field: "name",
      value: normalized.name,
      message:
        "Name must be between 6 and 50 characters, and at least two words separated by a single space or hyphen.",
    });
  }

  if (!isValidDateOfBirth(normalized.dateOfBirth)) {
    errors.push({
      field: "dateOfBirth",
      value: normalized.dateOfBirth,
      message: "You must be at least 18 years old.",
    });
  }

  if (!isValidGender(normalized.gender)) {
    errors.push({
      field: "gender",
      value: normalized.gender,
      message: "Please select a valid gender.",
    });
  }

  if (!isValidSpecialty(normalized.specialty)) {
    errors.push({
      field: "specialty",
      value: normalized.specialty,
      message: "Please enter a valid specialty.",
    });
  }

  if (!isValidCity(normalized.city)) {
    errors.push({
      field: "city",
      value: normalized.city,
      message: "Please enter a valid city.",
    });
  }

  if (!isValidPhone(normalized.phone)) {
    errors.push({
      field: "phone",
      value: normalized.phone,
      message: "Please enter a valid phone number.",
    });
  }

  if (!areValidLanguages(normalized.languages)) {
    errors.push({
      field: "languages",
      value: normalized.languages,
      message: "Please select at least one language.",
    });
  }

  return errors;
}

function isValidEmail(email: string) {
  const emailRegex = /^[A-Z0-9._-]{3,64}@[A-Z0-9-]{3,64}(\.[A-Z]{2,32}){1,2}$/i;
  return emailRegex.test(email);
}

function isValidPassword(password: string) {
  // uppercase, lowercase, numbers, and special chars
  const charTypeRegexes = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/];
  return (
    password.length >= 8 &&
    password.length < 128 &&
    charTypeRegexes.every((regex) => regex.test(password))
  );
}

function isValidName(name: string) {
  // 2 or more words with space or - between them
  // words can have 1 - or ' between 2 letters
  const letters = "[A-Za-zÀ-ÖØ-öø-ÿ]";
  const word = `${letters}+(['-]${letters}+)*`;
  const pattern = `^${word}([ -]${word})+$`;

  const nameRegex = new RegExp(pattern);
  return name.length >= 6 && name.length < 50 && nameRegex.test(name);
}

function isValidDateOfBirth(dateOfBirth: string) {
  const isoFormat = /^\d{4}-\d{2}-\d{2}/;
  if (!isoFormat.test(dateOfBirth)) {
    return false;
  }

  const dob = new Date(dateOfBirth);

  if (isNaN(dob.valueOf())) {
    return false;
  }

  const now = new Date();
  const minDateOfBirth = new Date(
    now.getFullYear() - 18,
    now.getMonth(),
    now.getDate(),
  );

  return dob <= minDateOfBirth;
}

function isValidGender(gender: string) {
  return gender == "F" || gender == "M";
}

function isValidSpecialty(specialty: string) {
  // TODO: properly validate specialties
  return specialty.length > 0 && specialty.length <= 50;
}

function isValidCity(city: string) {
  // TODO: use country code to differentiate between same city names
  // TODO2: use a service like simplemaps
  return city && cities.some((entry) => entry.city == city);
}

function isValidPhone(phone: string) {
  // TODO: do a more robust check using libraries instead
  // some candidates are libphonenumber-js & google-libphonenumber
  const phoneRegex = /^\+?[0-9\s\-().]{7,20}$/;
  return phoneRegex.test(phone);
}

function areValidLanguages(langCodes: Array<string>) {
  // ISO 639-1 standard for language codes
  return (
    langCodes.length > 0 &&
    langCodes.every((code) => Object.hasOwn(languages, code))
  );
}
