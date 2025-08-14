if (!import.meta.env.VITE_BACKEND_URL) {
  throw new Error("BACKEND_URL is not set. check your env vars");
}

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`;

export async function login(details: LoginDetails): Promise<AuthResponse> {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(details),
  };

  const response = await fetch(`${BASE_URL}/login`, options).catch((err) => {
    console.error("An unexpected error happened.", err);
    throw err;
  });

  const data = await response.json();

  if (!response.ok) {
    switch (response.status) {
      case 401:
        return { type: "error", error: data.error };
      case 422:
        return { type: "validation_error", errors: data.errors };
      default:
        return {
          type: "unknown_error",
          error: "An unexpected error happened.",
          status: response.status,
        };
    }
  }

  return { type: "success", token: data.token };
}

type LoginDetails = {
  email: string;
  password: string;
};

type OKResponse = {
  type: "success";
  token: string;
};

type ErrorResponse = {
  type: "error";
  error: string;
};

type ValidationError = {
  field: string;
  message: string;
};

type ValidationResponse = {
  type: "validation_error";
  errors: ValidationError[];
};

type UnknownErrorResponse = {
  type: "unknown_error";
  error: string;
  status: number;
};

type AuthResponse =
  | ValidationResponse
  | ErrorResponse
  | OKResponse
  | UnknownErrorResponse;
