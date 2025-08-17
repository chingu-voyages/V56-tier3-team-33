if (!import.meta.env.VITE_BACKEND_URL) {
  throw new Error("BACKEND_URL is not set. check your env vars");
}

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/experts`;

const PORTRAITS_BASE_API_URL = "https://randomuser.me/api/portraits/";

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

  // TODO: remove this when you either implement or scrap portraits
  const experts = data.experts.map((expert: { gender: string }) => {
    let photoUrl = PORTRAITS_BASE_API_URL;
    photoUrl += expert.gender === "M" ? "/men" : "/women";
    photoUrl += `/${Math.floor(Math.random() * 100)}.jpg`;
    return { ...expert, photoUrl };
  });

  return { type: "success", experts };
}

export async function getExpertDetails(id: string) {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(`${BASE_URL}/${id}`, options).catch((err) => {
    console.error("An unexpected error happened.", err);
    throw err;
  });

  const data = await response.json();

  if (!response.ok) {
    switch (response.status) {
      case 404:
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

  // TODO: remove this when you either implement or scrap portraits
  let photoUrl = PORTRAITS_BASE_API_URL;
  photoUrl += data.expert.gender === "M" ? "/men" : "/women";
  photoUrl += `/${Math.floor(Math.random() * 100)}.jpg`;
  return { ...data.expert, photoUrl };
}
