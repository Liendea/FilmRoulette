import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlexAlignType,
} from "react-native";
import Spacer from "@/sharedComponents/Spacer";
import { Movie } from "@/types/movietype";
import WatchProviderList from "./WatchProviderList";
import { CountryWatchProviders } from "@/types/watchProvider";
import AddToWatchListButton from "../features/roulette/components/AddToWatchListButton";
import MovieVote from "@/sharedComponents/MovieVote";
import MovieDetails from "@/sharedComponents/MovieDetails";
import MoviePoster from "@/sharedComponents/MoviePoster";
import Handle from "@/sharedComponents/Handle";
import { useWatchlistActions } from "../features/roulette/hooks/useWatchlistActions";

type MovieCardProps = {
  movie: Movie;
  watchProvider: CountryWatchProviders | null;
  loading: boolean;
  showHandle?: boolean;
  overViewSize?: number;
  align?: FlexAlignType;
};

export default function MovieCard({
  movie,
  watchProvider,
  loading,
  showHandle = true,
  overViewSize,
  align,
}: MovieCardProps) {
  const { addToWatchlist } = useWatchlistActions();

  return (
    <>
      {/* Poster */}

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <MoviePoster movie={movie} posterSize="big" />
      )}

      {/* handtag för att stänga modalen */}
      {showHandle && <Handle />}
      <Spacer height={15} />
      {/* Betyg  och add wo watchlist knapp */}
      <View style={styles.voteWrapper}>
        <MovieVote movie={movie} />
        <AddToWatchListButton
          onPress={() => {
            addToWatchlist(movie, watchProvider);
          }}
        />
      </View>
      <Spacer height={15} />
      {/* Movie details - Titel, release year, overview */}
      <View style={styles.descWrapper}>
        <MovieDetails
          movie={movie}
          showOverView={true}
          overViewSize={overViewSize}
          align={align}
        />
      </View>
      {/* Streaming tjänster */}
      <WatchProviderList providers={watchProvider} />
    </>
  );
}

const styles = StyleSheet.create({
  descWrapper: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  voteWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});
