import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { watchlistService } from "@/features/watchlist/utils/watchlistService";
import { useFocusEffect } from "expo-router";
import { WatchlistItem } from "@/types/movietype";
import MovieCard from "../components/MovieCard";

export default function WatchlistScreen() {
  const [items, setItems] = useState<WatchlistItem[]>([]);

  // useFocusEffect så att listan uppdateras VARJE gång man navigerar till fliken
  useFocusEffect(
    React.useCallback(() => {
      loadWatchlist();
    }, []),
  );

  const loadWatchlist = async () => {
    const savedItems = await watchlistService.getWatchlist();
    setItems(savedItems);
  };

  return (
    <>
      <View style={styles.container}>
        {items.length === 0 ? (
          <Text style={styles.emptyText}>Din lista är tom</Text>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.movie.id.toString()}
            renderItem={({ item }) => (
              <MovieCard watchlistItem={item} onRefresh={loadWatchlist} />
            )}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000000",
    paddingBottom: 100,
    paddingTop: 10,
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
