import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { Movie } from "@/types/movietype";
import MoviePoster from "@/sharedComponents/MoviePoster";
import Spacer from "@/sharedComponents/Spacer";
import MovieVote from "@/sharedComponents/MovieVote";
import { useRouter } from "expo-router";

type MovieListProps = {
  movies: Movie[];
  onEndReached: () => void;
};

export default function MovieList({ movies, onEndReached }: MovieListProps) {
  const router = useRouter();

  if (movies.length === 0) {
    return (
      <View>
        <Text style={styles.subtitle}>Inga filmer hittades</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        columnWrapperStyle={styles.row}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/movie/${item.id}`)}
          >
            <MoviePoster movie={item} posterSize={"small"} />
            <Spacer height={5} />
            <MovieVote movie={item} />
            <Spacer height={3} />
            <Text style={styles.title}>{item.title}</Text>
            <Spacer height={3} />
            <Text style={styles.subtitle}>
              {item.release_date.split("-")[0]}
            </Text>
            <Spacer height={20} />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 120,
  },
  card: {
    width: "50%",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  row: {
    width: "100%",
  },
  title: {
    color: "#ffffff",
    fontSize: 16,
    width: "90%",
    textAlign: "center",
  },
  subtitle: {
    color: "#AAAAAA",
  },
});
