export type WatchProvider = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
};

export type CountryWatchProviders = {
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
};

// Hela API-responsen från /watch/providers
export type WatchProviderResponse = {
  id: number;
  results: {
    [countryCode: string]: CountryWatchProviders;
  };
};
