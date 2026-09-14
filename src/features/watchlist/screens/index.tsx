import React, { useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { watchlistService } from "@/features/watchlist/utils/watchlistService";
import { useFocusEffect } from "expo-router";
import { WatchlistItem } from "@/types/movietype";
import WatchlistMovieCard from "../components/WatchlistMovieCard";
import RegionFilterDropdown, {
  ALL_REGIONS_CODE,
} from "../components/RegionFilterDropdown";
import Spacer from "@/sharedComponents/Spacer";

export default function WatchlistScreen() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [regionFilter, setRegionFilter] = useState(ALL_REGIONS_CODE);

  // useFocusEffect så att listan uppdateras VARJE gång man navigerar till fliken
  useFocusEffect(
    React.useCallback(() => {
      loadWatchlist();
    }, []),
  );

  const loadWatchlist = async () => {
    const savedItems = await watchlistService.getWatchlist();
    setItems(savedItems);
  };

  // Distinkta regioner som faktiskt finns bland sparade filmer/serier -
  // det är bara dessa som erbjuds som filter, utöver "Visa alla".
  const availableRegionCodes = useMemo(() => {
    const codes = items
      .map((item) => item.addedFromRegion)
      .filter((code): code is string => Boolean(code));
    return Array.from(new Set(codes));
  }, [items]);

  const filteredItems = useMemo(() => {
    if (regionFilter === ALL_REGIONS_CODE) return items;
    return items.filter((item) => item.addedFromRegion === regionFilter);
  }, [items, regionFilter]);

  return (
    <>
      <View style={styles.container}>
        {items.length > 0 && (
          <>
            <RegionFilterDropdown
              availableCodes={availableRegionCodes}
              selected={regionFilter}
              setSelected={setRegionFilter}
            />
            <Spacer height={15} />
          </>
        )}

        {filteredItems.length === 0 ? (
          <Text style={styles.emptyText}>
            {items.length === 0
              ? "Your list is empty"
              : "No movies/TV shows saved from that region"}
          </Text>
        ) : (
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.movie.id.toString()}
            renderItem={({ item }) => (
              <WatchlistMovieCard
                watchlistItem={item}
                onRefresh={loadWatchlist}
              />
            )}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000000",
    paddingBottom: 100,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",

    color: "#888",
  },
});
