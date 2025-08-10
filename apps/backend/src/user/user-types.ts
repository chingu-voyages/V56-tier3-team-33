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

export interface Expert extends NormalizedExpertDetails {
  id: string;
  gender: "M" | "F";
}
