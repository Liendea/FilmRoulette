import { View, StyleSheet, Pressable, Text, ActivityIndicator } from "react-native";
import type { WatchlistItem } from "@/types/movietype";
import type { CountryWatchProviders } from "@/types/watchProvider";
import RemoveButton from "./RemoveButton";
import { watchlistService } from "../utils/watchlistService";
import MovieVote from "@/sharedComponents/MovieVote";
import Spacer from "@/sharedComponents/Spacer";
import WatchProviderList from "@/sharedComponents/WatchProviderList";
import MovieDetails from "@/sharedComponents/MovieDetails";
import { useState, useEffect } from "react";
import MoviePoster from "@/sharedComponents/MoviePoster";
import { fetchWatchProviders } from "@/features/roulette/api/fetchWatchProviders";
import { useRegion } from "@/features/country/context/RegionContext";

type WatchListMovieCardProps = {
  watchlistItem: WatchlistItem;
  onRefresh: () => void;
};
export default function WatchlistMovieCard({
  watchlistItem,
  onRefresh,
}: WatchListMovieCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { region } = useRegion();

  const movie = watchlistItem.movie;

  // Tillgänglighet kan ändras (och beror på vilken region man tittar från just
  // nu), så vi hämtar alltid live istället för att lita på snapshotten som
  // sparades när filmen lades till. Hämtas bara när man faktiskt öppnar
  // sektionen, inte i förväg för hela listan.
  const [liveProviders, setLiveProviders] =
    useState<CountryWatchProviders | null>(null);
  const [loadingProviders, setLoadingProviders] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    setLoadingProviders(true);

    fetchWatchProviders(movie.id, movie.media_type ?? "movie", region.code)
      .then((result) => {
        if (!cancelled) setLiveProviders(result);
      })
      .finally(() => {
        if (!cancelled) setLoadingProviders(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, region.code, movie.id, movie.media_type]);

  async function handleRemove(id: number, mediaType?: string) {
    await watchlistService.removeFromWatchlist(id, mediaType);
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
            <RemoveButton onPress={() => handleRemove(movie.id, movie.media_type)} />
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
          <Text style={styles.accordionTitle}>Where can I watch it?</Text>
          <Text style={styles.arrow}>{isOpen ? "▲" : "▼"}</Text>
        </Pressable>
        {isOpen && (
          <View style={styles.accordionContent}>
            {loadingProviders ? (
              <ActivityIndicator color="#E50914" />
            ) : (
              <WatchProviderList providers={liveProviders} />
            )}
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
