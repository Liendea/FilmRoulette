import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Movie } from "@/types/movietype";
import MoviePoster from "@/sharedComponents/MoviePoster";
import Spacer from "@/sharedComponents/Spacer";
import MovieVote from "@/sharedComponents/MovieVote";
import { useRouter } from "expo-router";

type MovieListProps = {
  movies: Movie[];
  onEndReached: () => void;
};

// Bredd-gräns för att räkna som iPad/tablet-layout. iPhone (även Pro Max)
// hamnar under detta i porträtt, minsta iPad över.
const TABLET_BREAKPOINT = 700;

export default function MovieList({ movies, onEndReached }: MovieListProps) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const numColumns = width >= TABLET_BREAKPOINT ? 3 : 2;

  if (movies.length === 0) {
    return (
      <View>
        <Text style={styles.subtitle}>No movies found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        // FlatList måste remountas när numColumns ändras - RN kräver det
        // eftersom kolumn-layouten sätts upp internt vid mount.
        key={numColumns}
        data={movies}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, { width: `${100 / numColumns}%` }]}
            onPress={() =>
              router.push(`/movie/${item.id}?type=${item.media_type ?? "movie"}`)
            }
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
    // Bredden sätts inline per numColumns (se renderItem).
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
