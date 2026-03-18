import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Text } from "react-native";
import { ActivityIndicator } from "react-native";
import MovieCard from "@/features/roulette/components/MovieCard";
import { useMovieDetails } from "@/features/MovieDetails/hooks/useMovieDetails";

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams();
  const { movie, watchProviders, loading, error } = useMovieDetails(id);

  if (loading || !movie) return <ActivityIndicator size="large" color="#fff" />;
  if (error)
    return <Text style={{ color: "white" }}>Kunde inte ladda filmen...</Text>;

  return (
    <>
      {movie && (
        <View style={styles.container}>
          <MovieCard
            movie={movie}
            loading={loading}
            showHandle={false}
            watchProvider={watchProviders}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#000000",
    height: "100%",
  },
  wrapper: {
    flexDirection: "column",
    padding: 20,
  },
  overView: {
    color: "#AAAAAA",
  },
});
