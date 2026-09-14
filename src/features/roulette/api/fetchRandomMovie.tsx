import { Movie } from "@/types/movietype";

const ACCESS_TOKEN = process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN;

type TMDBResult = {
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  overview?: string;
  [key: string]: unknown;
};

export const fetchRandomMovie = async (
  region: string = "SE",
  type: "movie" | "tv" = "movie",
): Promise<Movie> => {
  const randomPage = Math.floor(Math.random() * 100) + 1;
  const monetization = "flatrate|buy|rent";
  const url = `https://api.themoviedb.org/3/discover/${type}?language=en-US&region=${region}&watch_region=${region}&with_watch_monetization_types=${monetization}&sort_by=popularity.desc&include_adult=false&page=${randomPage}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  if (!response.ok) throw new Error("Kunde inte hämta film");

  const data = await response.json();

  if (Array.isArray(data.results)) {
    // 3. Filtrera bort de som saknar overview
    const filteredResults = (data.results as TMDBResult[]).filter(
      (item) => item.overview && item.overview.trim() !== "",
    );

    // 4. Kolla om vi har några kvar efter filtreringen
    if (filteredResults.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredResults.length);
      const picked = filteredResults[randomIndex];

      // TMDB namnger fälten olika för film/serie (title/release_date vs
      // name/first_air_date) - normalisera precis som i discoverTitles,
      // och stämpla media_type så providers/watchlist vet vilken TMDB-endpoint
      // titeln hör till.
      return {
        ...picked,
        title: picked.title ?? picked.name ?? "",
        release_date: picked.release_date ?? picked.first_air_date ?? "",
        media_type: type,
      } as Movie;
    }
  }

  throw new Error(
    type === "tv"
      ? "Inga serier med beskrivning hittades på denna sida."
      : "Inga filmer med beskrivning hittades på denna sida.",
  );
};
