import { View, Text, Pressable, StyleSheet } from "react-native";
import { SortBy } from "@/types/searchfilters";

type SortByFilterProps = {
  sortBy: SortBy;
  setSortBy: (newSortBy: SortBy) => void;
};

const OPTIONS: { label: string; value: SortBy }[] = [
  { label: "Popularity", value: "popularity.desc" },
  { label: "Rating \u2193", value: "vote_average.desc" },
  { label: "Rating \u2191", value: "vote_average.asc" },
];

export default function SortByFilter({ sortBy, setSortBy }: SortByFilterProps) {
  return (
    <View style={styles.row}>
      {OPTIONS.map((opt) => (
        <Pressable
          key={opt.value}
          style={[styles.typeButton, sortBy === opt.value && styles.selectedType]}
          onPress={() => setSortBy(opt.value)}
        >
          <Text style={styles.buttonText}>{opt.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
