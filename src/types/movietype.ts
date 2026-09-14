import { CountryWatchProviders } from "./watchProvider";

// Film typ
export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  // "movie" eller "tv" - avgör vilken TMDB-endpoint detaljer/providers ska hämtas från.
  // Saknas på gamla anrop (t.ex. roulette-slumpningen), där "movie" alltid antas.
  media_type?: "movie" | "tv";
};

export type WatchlistItem = {
  movie: Movie;
  // Ögonblicksbild från när filmen sparades - används som fallback, men
  // watchlisten visar alltid live-hämtad tillgänglighet istället (den kan
  // ändras över tid och beror på vilken region man tittar från just nu).
  providers: CountryWatchProviders | null;
  // Vilken region (ISO-kod) som var vald när filmen lades till.
  // Saknas på poster sparade innan detta fanns - de visas bara under "Visa alla".
  addedFromRegion?: string;
};
