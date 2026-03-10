import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Spacer from "@/components/Spacer";
import ShuffleButton from "@/components/ShuffleButton";
import { fetchRandomMovie } from "@/utils/api";
import { Movie } from "@/types/movietype";
import TabBarIcon from "@/components/TabBarIcon";
import { ScrollView } from "react-native";
import MovieCard from "@/components/MovieCard";

export default function Home() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);

  const handleShuffle = async () => {
    setLoading(true);
    const result = await fetchRandomMovie();
    setMovie(result);
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      {movie ? (
        <>
          <MovieCard movie={movie} />
          {/* Shuffle button*/}
          <Spacer height={40} />
          <ShuffleButton onPress={handleShuffle} loading={loading} />
        </>
      ) : (
        <>
          <View style={styles.heroSection}>
            <Text style={styles.emoji}>🍿</Text>
            <Spacer height={20} />
            <Text style={styles.title}>Svårt att välja film?</Text>
            <Text style={styles.subtitle}>
              Låt slumpen avgöra kvällens underhållning.
            </Text>
          </View>
          {/* Shuffle button*/}
          <Spacer height={60} />
          <ShuffleButton onPress={handleShuffle} loading={loading} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-start",
    alignItems: "center",
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
  movieTitle: {
    color: "#ffffff",
    fontSize: 24,
    textAlign: "center",
  },
  overview: {
    maxHeight: 150,
  },
});
