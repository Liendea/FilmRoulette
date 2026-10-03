import { fetchOptions } from "@/api/config";
import { buildDiscoverUrl, normalizeTitle, TMDBTitle } from "@/api/discover";
import { SearchFilters } from "@/types/searchfilters";

export const discoverTitles = async (filters: SearchFilters, page = 1) => {
  const type = filters.type ?? "movie";
  const url = buildDiscoverUrl(filters, { page, minVoteCount: 200 });

  try {
    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    return data.results.map((item: TMDBTitle) => normalizeTitle(item, type));
  } catch (error) {
    console.error("Discover API Error:", error);
    return [];
  }
};
