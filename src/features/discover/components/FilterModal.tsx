import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fetchGenres, fetchProviders } from "../api/fetchMetadata";
import Spacer from "@/sharedComponents/Spacer";
import { SearchFilters, SortBy } from "@/types/searchfilters";
import Button from "@/sharedComponents/Button";

import Category from "./Category";
import MinRating from "./MinRatingDropdown";
import GenreDropdown from "./GenreDropdown";
import MonetizationFilter from "./MonetizationFilter";
import ProviderFilterDropdown from "./ProviderFilterDropdown";
import SortByFilter from "./SortByFilter";
import { WatchProvider } from "@/types/watchProvider";
import { useRegion } from "@/features/country/context/RegionContext";

type Genre = {
  id: number;
  name: string;
};

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onSearch: (filters: SearchFilters) => void;
};

export default function FilterModal({
  visible,
  onClose,
  onSearch,
}: FilterModalProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [type, setType] = useState<"movie" | "tv">("movie");
  const [minRating, setMinRating] = useState<number>(0);
  const [monetizationTypes, setMonetizationTypes] = useState<
    ("flatrate" | "rent" | "buy")[]
  >(["flatrate"]);

  const [sortBy, setSortBy] = useState<SortBy>("popularity.desc");
  const [selectedProviders, setSelectedProviders] = useState<number[]>([]);
  const [availableProviders, setAvailableProviders] = useState<WatchProvider[]>(
    [],
  );
  const { region } = useRegion();
  const insets = useSafeAreaInsets();

  // Hämta genres när modalen visas
  useEffect(() => {
    const loadData = async () => {
      const [genreData, providerData] = await Promise.all([
        fetchGenres(type),
        fetchProviders(type, region.code),
      ]);

      setGenres(genreData);
      setAvailableProviders(providerData);
    };

    if (visible) {
      loadData();
    }
  }, [visible, type, region.code]);

  // Genre-id:n (och delvis providers) skiljer sig mellan TMDB:s movie- och
  // tv-namespace - byter man typ utan att nollställa dessa riskerar man att
  // filtrera på fel/obefintliga genrer i tysthet.
  const handleTypeChange = (newType: "movie" | "tv") => {
    setType(newType);
    setSelectedGenres([]);
    setSelectedProviders([]);
  };

  const handleApplyFilters = () => {
    const filters: SearchFilters = {
      type,
      genres: selectedGenres,
      minRating: minRating,
      watchRegion: region.code,
      monetizationTypes: monetizationTypes,
      providers: selectedProviders,
      sortBy,
    };
    onSearch(filters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
        <View style={styles.header}>
          <Pressable onPress={onClose}>
            <Text style={styles.closeButton}>Cancel</Text>
          </Pressable>
        </View>
        <Spacer height={40} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Typ av innehåll */}
          <Text style={styles.sectionTitle}>I&apos;m looking for:</Text>
          <Spacer height={10} />
          <Category type={type} setType={handleTypeChange} />
          <Spacer height={15} />

          {/* Genre Dropdown */}
          <Text style={styles.sectionTitle}>Genres</Text>
          <GenreDropdown
            genres={genres}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />

          {/* Betyg Dropdown */}
          <Text style={styles.label}>Minimum rating</Text>
          <Spacer height={10} />
          <MinRating minRating={minRating} setMinRating={setMinRating} />
          <Spacer height={15} />

          {/* Strema / hyr / köp knappar */}
          <Text style={styles.sectionTitle}>I want to</Text>
          <Spacer height={10} />
          <MonetizationFilter
            monetizationTypes={monetizationTypes}
            setMonetizationTypes={setMonetizationTypes}
          />
          <Spacer height={15} />
          {/* Tjänst Dropdown */}

          <Text style={styles.sectionTitle}>Choose service</Text>
          <ProviderFilterDropdown
            providers={availableProviders}
            selectedProviders={selectedProviders}
            setSelectedProviders={setSelectedProviders}
          />

          {/* Sortering */}
          <Text style={styles.sectionTitle}>Sort by</Text>
          <Spacer height={10} />
          <SortByFilter sortBy={sortBy} setSortBy={setSortBy} />
          <Spacer height={220} />
        </ScrollView>

        <Button onPress={handleApplyFilters} buttonText={"Search"} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    color: "#E50914",
    fontSize: 16,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#333",
    borderRadius: 8,
    alignItems: "center",
  },
  selectedType: {
    backgroundColor: "#E50914",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
