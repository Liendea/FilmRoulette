import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Spacer from "@/components/ui/Spacer";
import ShuffleButton from "@/features/roulette/components/ShuffleButton";
import { fetchRandomMovie } from "@/features/roulette/api/fetchRandomMovie";
import { Movie } from "@/types/movietype";
import MovieCard from "@/features/roulette/components/MovieCard";
import { fetchWatchProviders } from "@/features/roulette/api/fetchWatchProviders";
import { CountryWatchProviders } from "@/types/watchProvider";
import HeroScreen from "./HeroScreen";

export default function RouletteScreen() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [watchProvider, setWatchProvider] =
    useState<CountryWatchProviders | null>(null);

  const handleShuffle = async () => {
    setLoading(true);

    try {
      // Hömta random film
      const result = await fetchRandomMovie();
      setMovie(result);

      if (result && result.id) {
        const providers = await fetchWatchProviders(result.id);
        setWatchProvider(providers);
      }
    } catch (error) {
      console.error("Något gick fel vid slumpningen:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {movie ? (
        <MovieCard
          movie={movie}
          watchProvider={watchProvider}
          setMovie={setMovie}
        />
      ) : (
        <HeroScreen handleShuffle={handleShuffle} loading={loading} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heroSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 60,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#AAAAAA",
    fontSize: 16,
    textAlign: "center",
  },
});
