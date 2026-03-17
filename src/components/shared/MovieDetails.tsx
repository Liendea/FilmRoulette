import { ScrollView, StyleSheet, Text, View, FlexStyle } from "react-native";
import Spacer from "@/components/shared/Spacer";
import { Movie } from "@/types/movietype";

type MovieDetailsProps = {
  movie: Movie;
  direction?: FlexStyle["flexDirection"];
  fontSize?: number;
  showOverView: boolean;
};
export default function MovieDetails({
  movie,
  direction = "row",
  fontSize = 16,
  showOverView,
}: MovieDetailsProps) {
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "Okänt år";

  return (
    <>
      {/* Titel */}
      <View style={{ flexDirection: direction }}>
        <Text style={styles.movieTitle}>{movie.title}</Text>
        {/* Release year */}
        <Text style={styles.subtitle}>{releaseYear}</Text>
      </View>

      {showOverView && (
        <>
          {/* Overview */}
          <Spacer height={10} />
          <ScrollView style={styles.overview}>
            <Text style={[styles.subtitle, { fontSize: fontSize }]}>
              {movie.overview}
            </Text>
          </ScrollView>
          <Spacer height={10} />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  movieTitle: {
    color: "#ffffff",
    fontSize: 20,
    width: "90%",
  },
  subtitle: {
    color: "#AAAAAA",
  },
  overview: {
    maxHeight: 100,
  },
});
