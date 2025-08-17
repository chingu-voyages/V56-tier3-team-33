if (!import.meta.env.VITE_BACKEND_URL) {
  throw new Error("BACKEND_URL is not set. check your env vars");
}

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/experts`;

export async function getExperts() {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(`${BASE_URL}`, options).catch((err) => {
    console.error("An unexpected error happened.", err);
    throw err;
  });

  const data = await response.json();

  if (!response.ok) {
    switch (response.status) {
      case 500:
        return { type: "error", error: data.error };
      default:
        return {
          type: "unknown_error",
          error: "An unexpected error happened.",
          status: response.status,
        };
    }
  }

  return { type: "success", experts: data.experts };
}
