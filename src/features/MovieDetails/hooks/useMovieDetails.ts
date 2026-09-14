import { useState, useEffect } from "react";
import { Movie } from "@/types/movietype";
import { CountryWatchProviders } from "@/types/watchProvider";
import { BASE_URL, fetchOptions } from "@/api/config";
import { fetchWatchProviders } from "@/features/roulette/api/fetchWatchProviders";
import { useRegion } from "@/features/country/context/RegionContext";

export function useMovieDetails(
  id: string | string[] | undefined,
  type: string | string[] | undefined = "movie",
) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [watchProviders, setWatchProviders] =
    useState<CountryWatchProviders | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { region } = useRegion();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const movieId = Array.isArray(id) ? Number(id[0]) : Number(id);
        // "movie" eller "tv" - kommer från länken som byggdes i MovieList.
        // Utan denna slår vi alltid upp mot /movie/{id}, vilket för en serie
        // råkar träffa en helt annan titel som delar samma numeriska id.
        const mediaType = (Array.isArray(type) ? type[0] : type) ?? "movie";

        const [detailsRes, providersData] = await Promise.all([
          fetch(
            `${BASE_URL}/${mediaType}/${movieId}?language=en-US`,
            fetchOptions,
          ).then((res) => res.json()),
          fetchWatchProviders(movieId, mediaType as "movie" | "tv", region.code),
        ]);

        // TMDB:s /tv/{id}-svar har name/first_air_date istället för
        // title/release_date - normalisera så resten av appen slipper bry sig.
        setMovie({
          ...detailsRes,
          title: detailsRes.title ?? detailsRes.name ?? "",
          release_date:
            detailsRes.release_date ?? detailsRes.first_air_date ?? "",
          media_type: mediaType,
        });
        setWatchProviders(providersData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, type, region.code]);

  return { movie, watchProviders, loading, error };
}
