import { Text, StyleSheet, Pressable } from "react-native";

type ChipProps = {
  id: number;
  selectedGenres: number[];
  name: string;

  onPress: () => void;
};

export default function FilterModal({
  id,
  selectedGenres,
  name,
  onPress,
}: ChipProps) {
  return (
    <>
      {/* Genre Chips */}
      <Pressable
        style={[
          styles.chip,
          selectedGenres.includes(id) && styles.selectedChip,
        ]}
        onPress={onPress}
      >
        <Text style={styles.chipText}>{name}</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#333",
    borderRadius: 20,
  },
  selectedChip: {
    backgroundColor: "#E50914",
  },
  chipText: { color: "#fff", fontSize: 14 },
});
