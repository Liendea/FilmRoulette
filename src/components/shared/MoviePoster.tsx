import { Dimensions, StyleSheet, View, Image } from "react-native";
import { Movie } from "@/types/movietype";

type MoviePosterBigProps = {
  movie: Movie;
  posterSize: string;
};

export default function MoviePoster({
  movie,
  posterSize = "big",
}: MoviePosterBigProps) {
  return (
    <View
      style={[
        posterSize === "big"
          ? styles.bigPosterContainer
          : styles.smallPosterContainer,
      ]}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w780${movie.poster_path}`,
        }}
        style={[posterSize === "big" ? styles.bigPoster : styles.smallPoster]}
      />
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  bigPosterContainer: {
    width: width,
    height: height * 0.45,
    backgroundColor: "#000",
  },
  bigPoster: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  smallPosterContainer: {},
  smallPoster: {
    width: 125,
    height: 175,
    borderRadius: 10,
  },
});
