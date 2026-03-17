import { View, Text, StyleSheet } from "react-native";
import { Movie } from "@/types/movietype";
import { FlatList } from "react-native";
import MoviePoster from "@/components/shared/MoviePoster";
import Spacer from "@/components/shared/Spacer";
import MovieVote from "@/components/shared/MovieVote";

type MovieListProps = {
  movies: Movie[];
  onEndReached: () => void;
};

export default function MovieList({ movies, onEndReached }: MovieListProps) {
  if (movies.length === 0) {
    return (
      <View>
        <Text>Inga filmer hittades</Text>
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
          <View style={styles.card}>
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
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
