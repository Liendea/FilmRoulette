import { BASE_URL, fetchOptions } from "@/api/config";
import { WatchProvider, WatchProviderResponse } from "@/types/watchProvider";

export const fetchGenres = async (type: "movie" | "tv") => {
  const url = `${BASE_URL}/genre/${type}/list?language=sv-SE`;
  const response = await fetch(url, fetchOptions);
  const data = await response.json();
  return data.genres;
};

export const fetchProviders = async (
  type: "movie" | "tv" = "movie",
): Promise<WatchProvider[]> => {
  const url = `${BASE_URL}/watch/providers/${type}?language=sv-SE&watch_region=SE`;

  try {
    const response = await fetch(url, fetchOptions);
    const data: WatchProviderResponse = await response.json();

    if (data && data.results) {
      // Vi castar results till WatchProvider[] och sorterar på display_priority
      // så att Netflix, Disney+ etc hamnar först i din dropdown.
      const providers = data.results as unknown as WatchProvider[];
      return providers.sort((a, b) => a.display_priority - b.display_priority);
    }
    return [];
  } catch (error) {
    console.error("Error fetching providers:", error);
    return [];
  }
};
