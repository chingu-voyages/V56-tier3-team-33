import specialties from "../data/specialties.json" with { type: "json" };
import cities from "../data/cities.json" with { type: "json" };
import languages from "../data/languages.json" with { type: "json" };

export function isValidEmail(email: string) {
  email = email.trim();
  const emailRegex = /^[A-Z0-9._-]{3,64}@[A-Z0-9-]{3,64}(\.[A-Z]{2,32}){1,2}$/i;
  return emailRegex.test(email);
}

export function isValidPassword(password: string) {
  // uppercase, lowercase, numbers, and special chars
  const charTypeRegexes = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/];
  return (
    password.length >= 8 &&
    password.length < 128 &&
    charTypeRegexes.every((regex) => regex.test(password))
  );
}

export function isValidName(name: string) {
  name = name.trim();
  // 2 or more words with space or - between them
  // words can have 1 - or ' between 2 letters
  const letters = "[A-Za-zÀ-ÖØ-öø-ÿ]";
  const word = `${letters}+(['-]${letters}+)*`;
  const pattern = `^${word}([ -]${word})+$`;

  const nameRegex = new RegExp(pattern);
  return name.length >= 6 && name.length < 50 && nameRegex.test(name);
}

export function isValidAge(age: string) {
  return Number(age) >= 18;
}

// TODO: export this instead of isValidAge when switching to DOB
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export function isValidGender(gender: string) {
  gender = gender.trim().toUpperCase();
  return gender == "F" || gender == "M";
}

export function isValidSpecialty(specialty: string) {
  specialty = specialty.trim().toLowerCase();
  // TODO: properly validate specialties
  return specialty.length && specialties.includes(specialty);
}

export function isValidCity(city: string) {
  city = city.trim().toLowerCase();
  // TODO: use country code to differentiate between same city names
  // TODO2: use a service like simplemaps
  return city && cities.some((entry) => entry.city == city);
}

export function isValidPhone(phone: string) {
  phone = phone.trim();
  // TODO: do a more robust check using libraries instead
  // some candidates are libphonenumber-js & google-libphonenumber
  const phoneRegex = /^\+?[0-9\s\-().]{7,20}$/;
  return phoneRegex.test(phone);
}

export function isValidLanguage(name: string) {
  name = name.trim();
  return Object.values(languages).includes(name);
}

// TODO: export this instead of age when switching to DOB in register
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function areValidLanguages(langCodes: Array<string>) {
  // ISO 639-1 standard for language codes
  return langCodes.every((code) => Object.hasOwn(languages, code));
}
