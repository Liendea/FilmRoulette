export type SearchFilters = {
  type?: "movie" | "tv";
  genres?: number[];
  minRating?: number;
  watchRegion: string; // "SE"
  providers?: number[];
  monetizationTypes?: ("flatrate" | "rent" | "buy")[];
};
