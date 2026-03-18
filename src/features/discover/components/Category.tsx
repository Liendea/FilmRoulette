import { View, Text, StyleSheet, Pressable } from "react-native";

type CategoryProps = {
  type: "movie" | "tv";
  setType: (newType: "movie" | "tv") => void;
};

export default function Category({ type, setType }: CategoryProps) {
  return (
    <>
      {/* Typ av innehåll */}

      <View style={styles.row}>
        <Pressable
          style={[styles.typeButton, type === "movie" && styles.selectedType]}
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
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
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
});
