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

export interface NormalizedExpertDetails {
  email: string;
  password: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  specialty: string;
  city: string;
  phone: string;
  languages: string[];
}

export interface ExpertFieldError {
  field: keyof NormalizedExpertDetails;
  message: string;
  value: unknown;
}

export interface Expert extends NormalizedExpertDetails {
  id: string;
  gender: "M" | "F";
}
