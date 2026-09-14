import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, ActivityIndicator } from "react-native";
import MovieCard from "@/sharedComponents/MovieCard";
import { useMovieDetails } from "@/features/MovieDetails/hooks/useMovieDetails";

export default function MovieDetailScreen() {
  const { id, type } = useLocalSearchParams();
  const { movie, watchProviders, loading, error } = useMovieDetails(id, type);

  if (error)
    return <Text style={{ color: "white" }}>Couldn&apos;t load the movie...</Text>;
  if (loading || !movie) return <ActivityIndicator size="large" color="#fff" />;

  return (
    <>
      {movie && (
        <ScrollView style={styles.container}>
          <MovieCard
            movie={movie}
            loading={loading}
            showHandle={false}
            watchProvider={watchProviders}
            overViewSize={300}
          />
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#000000",
    paddingTop: 100,
    paddingBottom: 100,
  },
  wrapper: {
    flexDirection: "column",
    padding: 20,
  },
  overView: {
    color: "#AAAAAA",
  },
});
