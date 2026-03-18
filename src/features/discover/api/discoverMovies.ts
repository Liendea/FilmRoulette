import { BASE_URL, fetchOptions } from "@/api/config";
import { SearchFilters } from "@/types/searchfilters";

export const discoverMovies = async (filters: SearchFilters, page = 1) => {
  let url = `${BASE_URL}/discover/${filters.type}?language=sv-SE&region=SE&sort_by=popularity.desc&vote_count.gte=200€page=${page}`;

  // Dynamiska filter
  if (filters.genres && filters.genres.length > 0) {
    url += `&with_genres=${filters.genres.join("|")}`;
  }

  if (filters.minRating && filters.minRating > 0) {
    url += `&vote_average.gte=${filters.minRating}`;
  }

  if (filters.providers && filters.providers.length > 0) {
    url += `&with_watch_providers=${filters.providers.join("|")}`;
    url += `&watch_region=SE`;
  }

  if (filters.monetizationTypes && filters.monetizationTypes.length > 0) {
    url += `&with_watch_monetization_types=${filters.monetizationTypes.join("|")}`;
  }

  try {
    const response = await fetch(url, fetchOptions);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Discover API Error:", error);
    return [];
  }
};
