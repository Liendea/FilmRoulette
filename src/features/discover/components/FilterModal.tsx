import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { fetchGenres, fetchProviders } from "../api/fetchMetadata";
import Spacer from "@/sharedComponents/Spacer";
import { SearchFilters } from "@/types/searchfilters";
import Button from "@/sharedComponents/Button";

import Category from "./Category";
import MinRating from "./MinRatingDropdown";
import GenreDropdown from "./GenreDropdown";
import MonetizationFilter from "./MonetizationFilter";
import ProviderFilterDropdown from "./ProviderFilterDropdown";
import { WatchProvider } from "@/types/watchProvider";

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

  const [selectedProviders, setSelectedProviders] = useState<number[]>([]);
  const [availableProviders, setAvailableProviders] = useState<WatchProvider[]>(
    [],
  );
  // Hämta genres när modalen visas
  useEffect(() => {
    const loadData = async () => {
      const [genreData, providerData] = await Promise.all([
        fetchGenres(type),
        fetchProviders(type),
      ]);

      setGenres(genreData);
      setAvailableProviders(providerData);
    };

    if (visible) {
      loadData();
    }
  }, [visible, type]);

  const handleApplyFilters = () => {
    const filters: SearchFilters = {
      type,
      genres: selectedGenres,
      minRating: minRating,
      watchRegion: "SE",
      monetizationTypes: monetizationTypes,
      providers: selectedProviders,
    };
    onSearch(filters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={onClose}>
            <Text style={styles.closeButton}>Avbryt</Text>
          </Pressable>
        </View>
        <Spacer height={40} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Typ av innehåll */}
          <Text style={styles.sectionTitle}>Jag letar efter:</Text>
          <Spacer height={10} />
          <Category type={type} setType={setType} />
          <Spacer height={20} />

          {/* Genre Dropdown */}
          <Text style={styles.sectionTitle}>Genres</Text>
          <GenreDropdown
            genres={genres}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />
          <Spacer height={20} />
          {/* Betyg Dropdown */}
          <Text style={styles.label}>Minsta betyg</Text>
          <Spacer height={10} />
          <MinRating minRating={minRating} setMinRating={setMinRating} />
          <Spacer height={20} />

          {/* Strema / hyr / köp knappar */}
          <Text style={styles.sectionTitle}>Jag vill</Text>
          <Spacer height={10} />
          <MonetizationFilter
            monetizationTypes={monetizationTypes}
            setMonetizationTypes={setMonetizationTypes}
          />
          <Spacer height={20} />
          {/* Tjänst Dropdown */}

          <Text style={styles.sectionTitle}>Välj tjänst</Text>
          <ProviderFilterDropdown
            providers={availableProviders}
            selectedProviders={selectedProviders}
            setSelectedProviders={setSelectedProviders}
          />
        </ScrollView>

        <Button onPress={handleApplyFilters} buttonText={"Hitta filmer"} />
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
    fontSize: 18,
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
    gap: 8,
  },

  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
