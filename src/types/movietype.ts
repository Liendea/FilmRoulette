import { CountryWatchProviders } from "./watchProvider";

// Film typ
export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
};

export type WatchlistItem = {
  movie: Movie;
  providers: CountryWatchProviders | null;
};
