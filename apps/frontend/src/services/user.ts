const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`;

export async function login({ email, password }: LoginDetails) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return await response.json();
}

type LoginDetails = {
  email: string;
  password: string;
};
