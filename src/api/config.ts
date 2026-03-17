export const BASE_URL = "https://api.themoviedb.org/3";
export const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
export const ACCESS_TOKEN = process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN;

export const fetchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};
