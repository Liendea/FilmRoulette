import { BASE_URL, fetchOptions } from "@/api/config";

// Hämtar alla genres (Action, Komedi, etc.)
export const fetchGenres = async (type: "movie" | "tv") => {
  const url = `${BASE_URL}/genre/${type}/list?language=sv-SE`;
  const response = await fetch(url, fetchOptions);
  const data = await response.json();
  return data.genres;
};

// Hämtar de mest populära streamingtjänsterna i Sverige
export const fetchProviders = async () => {
  const url = `${BASE_URL}/watch/providers/movie?language=sv-SE&watch_region=SE`;
  const response = await fetch(url, fetchOptions);
  const data = await response.json();
  return data.results;
};
