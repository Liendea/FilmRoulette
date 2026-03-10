const ACCESS_TOKEN = process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN;

export const fetchRandomMovie = async () => {
  const randomPage = Math.floor(Math.random() * 100) + 1;
  const monetization = "flatrate|buy|rent";
  const url = `https://api.themoviedb.org/3/discover/movie?language=sv-SE&region=SE&watch_region=SE&with_watch_monetization_types=${monetization}&sort_by=popularity.desc&include_adult=false&page=${randomPage}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  if (!response.ok) throw new Error("Kunde inte hämta film");

  const data = await response.json();
  const randomIndex = Math.floor(Math.random() * data.results.length);
  return data.results[randomIndex];
};
