import {
  WatchProviderResponse,
  CountryWatchProviders,
} from "@/types/watchProvider";

import { BASE_URL, fetchOptions } from "@/api/config";

export async function fetchWatchProviders(
  movieId: number,
  type: "movie" | "tv" = "movie",
  region: string = "SE",
): Promise<CountryWatchProviders | null> {
  try {
    const url = `${BASE_URL}/${type}/${movieId}/watch/providers`;

    const response = await fetch(url, fetchOptions);

    const data: WatchProviderResponse = await response.json();

    // Returnera specifikt för vald region
    return data.results?.[region] || null;
  } catch (error) {
    console.error("Fel vid hämtning av providers:", error);
    return null;
  }
}
