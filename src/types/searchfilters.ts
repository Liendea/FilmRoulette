export type SortBy = "popularity.desc" | "vote_average.desc" | "vote_average.asc";

export type SearchFilters = {
  type?: "movie" | "tv";
  genres?: number[];
  minRating?: number;
  watchRegion: string; // "SE"
  providers?: number[];
  monetizationTypes?: ("flatrate" | "rent" | "buy")[];
  sortBy?: SortBy;
};
