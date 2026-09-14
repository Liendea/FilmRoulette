import { BASE_URL, fetchOptions } from "@/api/config";
import { SearchFilters } from "@/types/searchfilters";

type TMDBResult = {
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  [key: string]: unknown;
};

export const discoverTitles = async (filters: SearchFilters, page = 1) => {
  const region = filters.watchRegion || "SE";
  const sortBy = filters.sortBy || "popularity.desc";
  let url = `${BASE_URL}/discover/${filters.type}?language=en-US&region=${region}&sort_by=${sortBy}&vote_count.gte=200&page=${page}`;

  if (filters.genres && filters.genres.length > 0) {
    url += `&with_genres=${filters.genres.join("|")}`;
  }

  if (filters.minRating && filters.minRating > 0) {
    url += `&vote_average.gte=${filters.minRating}`;
  }

  if (filters.providers?.length || filters.monetizationTypes?.length) {
    url += `&watch_region=${region}`;

    if (filters.providers?.length) {
      url += `&with_watch_providers=${filters.providers.join("|")}`;
    }

    if (filters.monetizationTypes?.length) {
      url += `&with_watch_monetization_types=${filters.monetizationTypes.join("|")}`;
    }
  }

  try {
    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    // TMDB namnger fälten olika beroende på om resultatet är en film eller en serie
    // (title/release_date för film, name/first_air_date för serie). Vi normaliserar
    // här så att resten av appen alltid kan lita på title/release_date.
    return data.results.map((item: TMDBResult) => ({
      ...item,
      title: item.title ?? item.name ?? "",
      release_date: item.release_date ?? item.first_air_date ?? "",
      // Sparar vilken TMDB-endpoint träffen kom från (movie/tv) så att
      // detaljvyn längre fram vet vilket endpoint den ska slå upp mot.
      media_type: filters.type ?? "movie",
    }));
  } catch (error) {
    console.error("Discover API Error:", error);
    return [];
  }
};
