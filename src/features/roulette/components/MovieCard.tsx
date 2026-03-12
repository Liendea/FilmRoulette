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
import AddToWatchListButton from "../../../components/AddToWatchListButton";
import ExitButton from "@/components/ui/ExitButton";

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
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "Okänt år";

  function onExitPress() {
    setMovie(null);
  }
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "din film",
        }}
      />
      {/* Poster */}
      <View style={styles.posterContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w780${movie.poster_path}`,
          }}
          style={styles.poster}
        />
      </View>
      {/* Exit button */}
      <View style={styles.exitButton}>
        <ExitButton onPress={onExitPress} />
      </View>

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
          <AddToWatchListButton onPress={() => {}} />
        </View>
      </View>

      <Spacer height={10} />
      {/* Titel */}
      <View style={styles.wrapper}>
        <Text style={styles.movieTitle}>{movie.title}</Text>
        <Text style={styles.subtitle}>{releaseYear}</Text>
      </View>
      {/* Overview */}
      <Spacer height={10} />
      <ScrollView style={styles.overview}>
        <Text style={styles.subtitle}>{movie.overview}</Text>
      </ScrollView>
      <Spacer height={20} />
      {/* Streaming tjänster */}
      <WatchProviderList providers={watchProvider} />
    </>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  posterContainer: {
    width: width,
    height: height * 0.45,
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
    paddingHorizontal: 20,
  },

  movieTitle: {
    color: "#ffffff",
    fontSize: 24,
    textAlign: "center",
  },
  subtitle: {
    color: "#AAAAAA",
    fontSize: 16,
  },
  overview: {
    maxHeight: 110,
    paddingHorizontal: 20,
  },
  addButton: {},
});
