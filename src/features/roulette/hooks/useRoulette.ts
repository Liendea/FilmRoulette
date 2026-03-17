import { useState } from "react";
import { Movie } from "@/types/movietype";
import { CountryWatchProviders } from "@/types/watchProvider";
import { fetchRandomMovie } from "../api/fetchRandomMovie";
import { fetchWatchProviders } from "../api/fetchWatchProviders";

export function useRoulette() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [watchProvider, setWatchProvider] =
    useState<CountryWatchProviders | null>(null);

  const handleShuffle = async () => {
    setLoading(true);
    try {
      const result = await fetchRandomMovie();
      setMovie(result);

      if (result?.id) {
        const providers = await fetchWatchProviders(result.id);
        setWatchProvider(providers);
      }
    } catch (error) {
      console.error("Något gick fel vid slumpningen:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setMovie(null);
    setWatchProvider(null);
  };

  return {
    movie,
    loading,
    watchProvider,
    handleShuffle,
    closeModal,
  };
}
