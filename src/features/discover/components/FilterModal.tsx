import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { fetchGenres } from "../api/fetchMetadata";
import Spacer from "@/sharedComponents/Spacer";
import { SearchFilters } from "@/types/searchfilters";
import Button from "@/sharedComponents/Button";
import Chip from "./Chip";

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

  // Hämta genres när modalen visas
  useEffect(() => {
    if (visible) {
      const loadGenres = async () => {
        const data = await fetchGenres(type);
        setGenres(data);
      };
      loadGenres();
    }
  }, [visible, type]);

  {
    /* Toggla genre klick */
  }
  const toggleGenre = (id: number) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };

  const handleApplyFilters = () => {
    const filters: SearchFilters = {
      type,
      genres: selectedGenres,
      watchRegion: "SE",
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
          <Text style={styles.title}>Filter</Text>
          <Pressable onPress={onClose}>
            <Text style={styles.closeButton}>Avbryt</Text>
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Typ av innehåll */}
          <Text style={styles.sectionTitle}>Jag letar efter:</Text>
          <View style={styles.row}>
            <Pressable
              style={[
                styles.typeButton,
                type === "movie" && styles.selectedType,
              ]}
              onPress={() => setType("movie")}
            >
              <Text style={styles.buttonText}>Filmer</Text>
            </Pressable>
            <Pressable
              disabled={true}
              style={[styles.typeButton, type === "tv" && styles.selectedType]}
              onPress={() => setType("tv")}
            >
              <Text style={styles.buttonText}>Serier</Text>
            </Pressable>
          </View>

          <Spacer height={20} />

          {/* Genre Chips */}
          <Text style={styles.sectionTitle}>Kategorier</Text>
          <View style={styles.chipContainer}>
            {genres.map((genre) => (
              <Chip
                key={genre.id}
                onPress={() => {
                  toggleGenre(genre.id);
                }}
                id={genre.id}
                name={genre.name}
                selectedGenres={selectedGenres}
              />
            ))}
          </View>

          <Spacer height={40} />
        </ScrollView>

        <Button onPress={handleApplyFilters} buttonText={"Hitta filmer"} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  closeButton: { color: "#E50914", fontSize: 16 },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  row: { flexDirection: "row", gap: 10 },
  typeButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#333",
    borderRadius: 8,
    alignItems: "center",
  },
  selectedType: { backgroundColor: "#E50914" },
  buttonText: { color: "#fff", fontWeight: "600" },
  chipContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
});
