import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { watchlistService } from "@/features/watchlist/api/watchlistService";
import { useFocusEffect } from "expo-router";
import { Movie } from "@/types/movietype";

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
            <View style={styles.movieItem}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w780${item.poster_path}`,
                }}
                width={150}
                height={300}
              />
              <Text style={styles.movieTitle}>{item.title}</Text>
            </View>
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
  },
  movieItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  movieTitle: {
    fontSize: 18,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#888",
  },
});
