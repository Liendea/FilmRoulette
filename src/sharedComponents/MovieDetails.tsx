import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlexStyle,
  FlexAlignType,
} from "react-native";
import Spacer from "@/sharedComponents/Spacer";
import { Movie } from "@/types/movietype";

type MovieDetailsProps = {
  movie: Movie;
  direction?: FlexStyle["flexDirection"];
  fontSize?: number;
  showOverView: boolean;
  overViewSize?: number;
  align?: FlexAlignType;
};

export default function MovieDetails({
  movie,
  direction = "row",
  fontSize = 16,
  showOverView,
  overViewSize = 110,
  align = "flex-end",
}: MovieDetailsProps) {
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "Okänt år";

  return (
    <>
      {/* Titel */}
      <View
        style={[
          styles.container,
          {
            flexDirection: direction,
            alignItems: align,
          },
        ]}
      >
        <Text style={styles.movieTitle}>{movie.title}</Text>
        {/* Release year */}
        <Text style={styles.subtitle}>{releaseYear}</Text>
      </View>

      {showOverView && (
        <>
          {/* Overview */}
          <Spacer height={10} />
          <ScrollView style={[styles.overview, { maxHeight: overViewSize }]}>
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
  container: {
    gap: 10,
    width: "100%",
  },
  movieTitle: {
    color: "#ffffff",
    fontSize: 20,
  },
  subtitle: {
    color: "#AAAAAA",
  },
  overview: {
    maxHeight: 100,
  },
});
