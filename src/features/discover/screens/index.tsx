import { View, StyleSheet, Pressable } from "react-native";
import MovieList from "../components/MovieList";
import { useState, useCallback, useRef } from "react";
import FilterModal from "../components/FilterModal";
import { discoverMovies } from "../api/discoverMovies";
import { SearchFilters } from "@/types/searchfilters";
import { useFocusEffect } from "expo-router";
import { ActivityIndicator } from "react-native";
import { Movie } from "@/types/movietype";
import { LinearGradient } from "expo-linear-gradient";
import { SlidersHorizontalIcon } from "phosphor-react-native";

export default function DiscoverScreen() {
  const [visible, setVisible] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const currentFilters = useRef<SearchFilters | null>(null);

  useFocusEffect(
    useCallback(() => {
      setVisible(true);
    }, []),
  );

  async function handleSearch(filters: SearchFilters) {
    currentFilters.current = filters;
    setLoading(true);
    setPage(1);
    const results = await discoverMovies(filters, 1);
    setMovies(results);
    setLoading(false);
  }

  async function loadMore() {
    if (loading || !currentFilters.current) return;
    const next = page + 1;
    const results = await discoverMovies(currentFilters.current, next);
    setMovies((prev) => [...prev, ...results]);
    setPage(next);
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.filterIcon}
        onPress={() => {
          setVisible(true);
        }}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <SlidersHorizontalIcon color="#ffffff" weight="fill" size={32} />
      </Pressable>

      <MovieList movies={movies} onEndReached={loadMore} />
      {/* MovieList */}
      {loading && <ActivityIndicator size="large" color="#E50914" />}

      {/* Filter modal */}
      <FilterModal
        onClose={() => setVisible(false)}
        visible={visible}
        onSearch={handleSearch}
      />
      <LinearGradient
        colors={["#000", "#000", "rgba(0,0,0,0.7)", "transparent"]}
        style={styles.topShadow}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)", "#000", "#000"]}
        style={styles.bottomShadow}
      />
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
    paddingTop: 80,
  },
  filterIcon: {
    position: "absolute",
    top: 60,
    right: 30,
    zIndex: 100,
  },
  bottomShadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  topShadow: {
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    height: 150,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "#000",
  },
});
