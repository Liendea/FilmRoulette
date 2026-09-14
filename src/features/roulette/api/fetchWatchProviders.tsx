import {
  WatchProviderResponse,
  CountryWatchProviders,
} from "@/types/watchProvider";

export async function fetchWatchProviders(
  movieId: number,
  type: "movie" | "tv" = "movie",
  region: string = "SE",
): Promise<CountryWatchProviders | null> {
  try {
    const url = `https://api.themoviedb.org/3/${type}/${movieId}/watch/providers`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    });

    const data: WatchProviderResponse = await response.json();

    // Returnera specifikt för vald region
    return data.results?.[region] || null;
  } catch (error) {
    console.error("Fel vid hämtning av providers:", error);
    return null;
  }
}
