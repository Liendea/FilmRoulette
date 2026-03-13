import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { watchlistService } from "@/features/watchlist/api/watchlistService";
import { useFocusEffect } from "expo-router";
import { Movie } from "@/types/movietype";
import MovieCard from "../components/MovieCard";

export default function WatchlistScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);

  // useFocusEffect så att listan uppdateras VARJE gång man navigerar till fliken
  useFocusEffect(
    React.useCallback(() => {
      loadWatchlist();
    }, []),
  );

  const loadWatchlist = async () => {
    const savedMovies = await watchlistService.getWatchlist();
    setMovies(savedMovies);
  };

  return (
    <View style={styles.container}>
      {movies.length === 0 ? (
        <Text style={styles.emptyText}>Din lista är tom"</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard item={item} onRefresh={loadWatchlist} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#888",
  },
});
