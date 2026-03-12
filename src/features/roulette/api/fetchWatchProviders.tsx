import { WatchProviderResponse } from "@/src/types/watchProvider";
import { CountryWatchProviders } from "@/src/types/watchProvider";

export async function fetchWatchProviders(
  movieId: number,
): Promise<CountryWatchProviders | null> {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    });

    const data: WatchProviderResponse = await response.json();

    // Returnera specifikt för Sverige
    return data.results?.SE || null;
  } catch (error) {
    console.error("Fel vid hämtning av providers:", error);
    return null;
  }
}
