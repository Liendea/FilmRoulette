import { View, StyleSheet, Pressable, Text } from "react-native";
import type { WatchlistItem } from "@/types/movietype";
import RemoveButton from "./RemoveButton";
import { watchlistService } from "../utils/watchlistService";
import MovieVote from "@/sharedComponents/MovieVote";
import Spacer from "@/sharedComponents/Spacer";
import WatchProviderList from "@/sharedComponents/WatchProviderList";
import MovieDetails from "@/sharedComponents/MovieDetails";
import { useState } from "react";
import MoviePoster from "@/sharedComponents/MoviePoster";

type WatchListMovieCardProps = {
  watchlistItem: WatchlistItem;
  onRefresh: () => void;
};
export default function WatchlistMovieCard({
  watchlistItem,
  onRefresh,
}: WatchListMovieCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const movie = watchlistItem.movie;
  const watchProvider = watchlistItem.providers;

  async function handleRemove(id: number) {
    await watchlistService.removeFromWatchlist(id);
    onRefresh();
  }

  return (
    <>
      <View style={styles.movieItem}>
        {/* Movie poster */}
        <MoviePoster movie={movie} posterSize={"small"} />
        {/* Titel och realese år */}
        <View style={styles.movieDesc}>
          <MovieDetails
            movie={movie}
            direction={"column"}
            fontSize={12}
            showOverView={true}
            align={"flex-start"}
          />
          <Spacer height={10} />
          {/* Betyg och remove knapp */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* Betyg */}
            <MovieVote movie={movie} />
            {/* Remove knapp */}
            <RemoveButton onPress={() => handleRemove(movie.id)} />
          </View>
        </View>
        {/* Remove knapp */}
      </View>

      <View style={[styles.container, { borderBottomWidth: isOpen ? 0 : 1 }]}>
        {/* Watchprovider accordion */}
        <Pressable
          onPress={() => setIsOpen(!isOpen)}
          style={styles.accordionHeader}
        >
          <Text style={styles.accordionTitle}>Var kan jag se den?</Text>
          <Text style={styles.arrow}>{isOpen ? "▲" : "▼"}</Text>
        </Pressable>
        {isOpen && (
          <View style={styles.accordionContent}>
            <WatchProviderList providers={watchProvider} />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#928f8f75",
  },
  movieItem: {
    flexDirection: "row",
    gap: 20,
    paddingVertical: 15,
  },
  movieDesc: {
    width: "55%",
    justifyContent: "space-between",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  accordionTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  accordionContent: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  arrow: {
    color: "#aaa",
    fontSize: 12,
  },
});
