import { BASE_URL } from "@/api/config";
import { SearchFilters } from "@/types/searchfilters";

export type TMDBTitle = {
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  overview?: string;
  [key: string]: unknown;
};

type DiscoverUrlOptions = {
  page: number;
  // Lägsta antal röster en titel måste ha. Utan detta kan ett betygsfilter
  // släppa igenom okända titlar med en enda röst på 10.
  minVoteCount?: number;
};

// Bygger URL:en till TMDB:s /discover utifrån ett filterobjekt. Används av
// både Discover och Shuffle så att samma filter alltid ger samma urval.
export function buildDiscoverUrl(
  filters: SearchFilters,
  { page, minVoteCount }: DiscoverUrlOptions,
) {
  const type = filters.type ?? "movie";
  const region = filters.watchRegion || "SE";
  const sortBy = filters.sortBy || "popularity.desc";

  let url = `${BASE_URL}/discover/${type}?language=en-US&region=${region}&sort_by=${sortBy}&include_adult=false&page=${page}`;

  if (minVoteCount && minVoteCount > 0) {
    url += `&vote_count.gte=${minVoteCount}`;
  }

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

  return url;
}

// TMDB namnger fälten olika beroende på om resultatet är en film eller en serie
// (title/release_date för film, name/first_air_date för serie). Vi normaliserar
// här så att resten av appen alltid kan lita på title/release_date, och
// stämplar media_type så detaljvy/providers/watchlist vet vilken endpoint
// titeln hör till.
export function normalizeTitle<T extends TMDBTitle>(
  item: T,
  type: "movie" | "tv",
) {
  return {
    ...item,
    title: item.title ?? item.name ?? "",
    release_date: item.release_date ?? item.first_air_date ?? "",
    media_type: type,
  };
}
