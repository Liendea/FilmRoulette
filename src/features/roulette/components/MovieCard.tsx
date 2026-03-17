import { StyleSheet, View, ActivityIndicator } from "react-native";
import Spacer from "@/components/shared/Spacer";
import { Movie } from "@/types/movietype";
import WatchProviderList from "../../../components/shared/WatchProviderList";
import { CountryWatchProviders } from "@/types/watchProvider";
import AddToWatchListButton from "./AddToWatchListButton";
import MovieVote from "@/components/shared/MovieVote";
import MovieDetails from "@/components/shared/MovieDetails";
import MoviePoster from "@/components/shared/MoviePoster";
import Handle from "@/components/shared/Handle";
import { useWatchlistActions } from "../hooks/useWatchlistActions";

type MovieCardProps = {
  movie: Movie;
  watchProvider: CountryWatchProviders | null;
  loading: boolean;
};

export default function MovieCard({
  movie,
  watchProvider,
  loading,
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
      <Handle />
      <Spacer height={10} />
      {/* Betyg  och add wo watchlist knapp */}
      <View style={styles.voteWrapper}>
        <MovieVote movie={movie} />
        <AddToWatchListButton
          onPress={() => {
            addToWatchlist(movie, watchProvider);
          }}
        />
      </View>
      <Spacer height={10} />
      {/* Movie details - Titel, release year, overview */}
      <View style={styles.descWrapper}>
        <MovieDetails movie={movie} showOverView={true} />
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
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
});
