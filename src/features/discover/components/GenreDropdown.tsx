import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";

type Genre = {
  id: number;
  name: string;
};

type Props = {
  genres: Genre[];
  selectedGenres: number[];
  setSelectedGenres: (ids: number[]) => void;
};

export default function GenreDropdown({
  genres,
  selectedGenres,
  setSelectedGenres,
}: Props) {
  // Mappa TMDB data till dropdown format
  const data = genres.map((g) => ({
    label: g.name,
    value: g.id.toString(),
  }));

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        {selectedGenres.includes(Number(item.value)) && (
          <View style={styles.dot} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        containerStyle={styles.itemContainer}
        activeColor="#333"
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Välj genres..."
        value={selectedGenres.map((id) => id.toString())}
        search
        searchPlaceholder="Sök genre..."
        onChange={(item) => {
          setSelectedGenres(item.map((id) => Number(id)));
        }}
        renderItem={renderItem}
        // rendera de valda chipsen inuti/under dropdownen
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  dropdown: {
    height: 50,
    backgroundColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  placeholderStyle: { fontSize: 16, color: "#aaa" },
  selectedTextStyle: { fontSize: 14, color: "#fff" },
  itemContainer: { backgroundColor: "#222", borderRadius: 8, borderWidth: 0 },
  selectedStyle: {
    borderRadius: 12,
    backgroundColor: "#E50914",

    borderWidth: 0,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E50914",
  },
});
