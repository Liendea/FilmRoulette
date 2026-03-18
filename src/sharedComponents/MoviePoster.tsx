import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { Movie } from "@/types/movietype";
import { useState } from "react";

type MoviePosterBigProps = {
  movie: Movie;
  posterSize: string;
};

export default function MoviePoster({
  movie,
  posterSize = "big",
}: MoviePosterBigProps) {
  const [imageLoading, setImageLoading] = useState(false);

  // Generera URL:en en gång för att använda den både i source och key
  const imageUrl = `https://image.tmdb.org/t/p/w780${movie.poster_path}`;
  return (
    <View
      style={[
        posterSize === "big"
          ? styles.bigPosterContainer
          : styles.smallPosterContainer,
      ]}
    >
      {imageLoading && posterSize === "big" && (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )}

      <Image
        key={imageUrl}
        source={{ uri: imageUrl }}
        style={[posterSize === "big" ? styles.bigPoster : styles.smallPoster]}
        onLoadStart={() => setImageLoading(true)}
        onLoadEnd={() => setImageLoading(false)}
      />
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  loaderWrapper: {
    position: "absolute",
    zIndex: 1,
  },
  bigPosterContainer: {
    width: width,
    height: height * 0.45,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  bigPoster: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  smallPosterContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 125,
    height: 175,
  },
  smallPoster: {
    width: 125,
    height: 175,
    borderRadius: 10,
  },
});
