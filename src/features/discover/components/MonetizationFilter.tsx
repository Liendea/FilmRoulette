import { View, Text, Pressable, StyleSheet } from "react-native";

type MonetizationType = "flatrate" | "rent" | "buy";

type MonetizationFilterProps = {
  monetizationTypes: MonetizationType[];
  setMonetizationTypes: React.Dispatch<
    React.SetStateAction<MonetizationType[]>
  >;
};

export default function MonetizationFilter({
  monetizationTypes,
  setMonetizationTypes,
}: MonetizationFilterProps) {
  return (
    <View style={styles.row}>
      {[
        { label: "Streama", value: "flatrate" as const },
        { label: "Hyra", value: "rent" as const },
        { label: "Köpa", value: "buy" as const },
      ].map((opt) => {
        const isSelected = monetizationTypes.includes(opt.value);

        return (
          <Pressable
            key={opt.value}
            style={[styles.typeButton, isSelected && styles.selectedType]}
            onPress={() => {
              if (isSelected) {
                // Ta bort valet om det redan finns, men behåll minst ett
                if (monetizationTypes.length > 1) {
                  setMonetizationTypes((prev) =>
                    prev.filter((t) => t !== opt.value),
                  );
                }
              } else {
                // Lägg till valet i arrayen
                setMonetizationTypes((prev) => [...prev, opt.value]);
              }
            }}
          >
            <Text style={styles.buttonText}>{opt.label}</Text>
          </Pressable>
        );
      })}
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
