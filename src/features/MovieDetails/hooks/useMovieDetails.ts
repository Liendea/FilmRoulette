import { useState, useEffect } from "react";
import { Movie } from "@/types/movietype";
import { CountryWatchProviders } from "@/types/watchProvider";
import { BASE_URL, fetchOptions } from "@/api/config";
import { fetchWatchProviders } from "@/features/roulette/api/fetchWatchProviders";

export function useMovieDetails(id: string | string[] | undefined) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [watchProviders, setWatchProviders] =
    useState<CountryWatchProviders | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const movieId = Array.isArray(id) ? Number(id[0]) : Number(id);

        const [movieRes, providersData] = await Promise.all([
          fetch(
            `${BASE_URL}/movie/${movieId}?language=sv-SE`,
            fetchOptions,
          ).then((res) => res.json()),
          fetchWatchProviders(movieId),
        ]);

        setMovie(movieRes);
        setWatchProviders(providersData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return { movie, watchProviders, loading, error };
}
