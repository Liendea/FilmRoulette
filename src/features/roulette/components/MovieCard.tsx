import {
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import Spacer from "@/components/ui/Spacer";
import { Movie } from "@/types/movietype";
import Icon from "@/components/ui/Icon";
import { Stack } from "expo-router";
import WatchProviderList from "./WatchProviderList";
import { CountryWatchProviders } from "@/types/watchProvider";
import AddToWatchListButton from "./AddToWatchListButton";
import ExitButton from "@/components/ui/ExitButton";
import { watchlistService } from "@/features/watchlist/api/watchlistService";
import Toast from "react-native-toast-message";

type MovieCardProps = {
  movie: Movie;
  watchProvider: CountryWatchProviders | null;
  setMovie: (movie: Movie | null) => void;
};

export default function MovieCard({
  movie,
  watchProvider,
  setMovie,
}: MovieCardProps) {
  async function handleAddToWatchList(movie: Movie) {
    const success = await watchlistService.addToWatchlist(movie);
    if (success) {
      Toast.show({
        type: "success",
        text1: "Woho!",
        text2: "Filmen är nu tillagd till din lista!",
        topOffset: 50,
      });
    } else {
      Toast.show({
        type: "info",
        text1: "Filmen finns redan i din lista",
        topOffset: 50,
      });
    }
  }

  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "Okänt år";

  function onExitPress() {
    setMovie(null);
  }
  return (
    <>
      {/* Poster */}
      <View style={styles.posterContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w780${movie.poster_path}`,
          }}
          style={styles.poster}
        />
        {/* Själva handtaget */}
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>
      </View>

      {/* Betyg  och add wo watchlist knapp */}
      <Spacer height={5} />
      <View style={styles.wrapper}>
        {/* Betyg */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Icon
            icon={require("@/assets/icons/Star.png")}
            width={20}
            height={20}
          />
          <Text style={[styles.subtitle, { fontWeight: "bold" }]}>
            {movie.vote_average}
          </Text>
        </View>
        <View style={styles.addButton}>
          <AddToWatchListButton onPress={() => handleAddToWatchList(movie)} />
        </View>
      </View>

      <Spacer height={10} />
      {/* Titel */}
      <View style={styles.titleWrapper}>
        <Text style={styles.movieTitle}>{movie.title}</Text>
        <Text style={styles.subtitle}>{releaseYear}</Text>
      </View>
      {/* Overview */}
      <Spacer height={10} />
      <ScrollView style={styles.overview}>
        <Text style={styles.subtitle}>{movie.overview}</Text>
      </ScrollView>
      <Spacer height={10} />
      {/* Streaming tjänster */}
      <WatchProviderList providers={watchProvider} />
    </>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  handleContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 10,
    zIndex: 100,
    width: "100%",
    alignItems: "center",
  },
  handle: {
    width: 80,
    height: 5,
    backgroundColor: "#ffffff91", // En mörkgrå färg som syns lagom mycket
    borderRadius: 10,
  },

  posterContainer: {
    width: width,
    height: height * 0.45,
    backgroundColor: "#000",
  },
  poster: {
    position: "absolute",
    top: -10,
    width: "100%",
    height: "100%",
  },
  exitButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#000000be",
    borderRadius: 50,
    padding: 10,
  },
  wrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    paddingHorizontal: 16,
  },
  movieTitle: {
    color: "#ffffff",
    fontSize: 24,
    width: "80%",
  },
  subtitle: {
    color: "#AAAAAA",
    fontSize: 16,
  },
  overview: {
    maxHeight: 110,
    paddingHorizontal: 16,
  },
  addButton: {},
});
