import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { Movie } from "@/types/movietype";
import { useState } from "react";

type MoviePosterBigProps = {
  movie: Movie;
  posterSize: string;
};

// Samma tak som övriga skärmar (Shuffle-sektionen m.fl.) - utan detta
// sträcker sig den stora postern ut över hela iPad-bredden.
const MAX_BIG_POSTER_WIDTH = 480;
const POSTER_ASPECT_RATIO = 2 / 3;

export default function MoviePoster({
  movie,
  posterSize = "big",
}: MoviePosterBigProps) {
  const [imageLoading, setImageLoading] = useState(false);
  const { width, height } = useWindowDimensions();

  const maxPosterHeight = height * 0.35;
  const bigPosterWidth = Math.min(
    maxPosterHeight * POSTER_ASPECT_RATIO,
    width,
    MAX_BIG_POSTER_WIDTH,
  );
  const bigPosterHeight = bigPosterWidth / POSTER_ASPECT_RATIO;

  // Generera URL:en en gång för att använda den både i source och key
  const imageUrl = `https://image.tmdb.org/t/p/w780${movie.poster_path}`;
  return (
    <View
      style={[
        posterSize === "big"
          ? [
              styles.bigPosterContainer,
              { width: bigPosterWidth, height: bigPosterHeight },
            ]
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

const styles = StyleSheet.create({
  loaderWrapper: {
    position: "absolute",
    zIndex: 1,
  },
  bigPosterContainer: {
    // width/height sätts inline (se komponenten) - beror på fönsterstorlek.
    alignSelf: "center",
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  bigPoster: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
