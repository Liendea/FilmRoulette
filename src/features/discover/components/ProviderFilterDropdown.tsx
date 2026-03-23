import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import { WatchProvider } from "@/types/watchProvider";

type DropdownItem = {
  label: string;
  value: string;
  logo: string;
};

type ProviderDropdownProps = {
  providers: WatchProvider[];
  selectedProviders: number[];
  setSelectedProviders: (ids: number[]) => void;
};

export default function ProviderDropdown({
  providers,
  selectedProviders,
  setSelectedProviders,
}: ProviderDropdownProps) {
  const data = providers.map((p) => ({
    label: p.provider_name,
    value: p.provider_id.toString(),
    logo: p.logo_path,
  }));

  const renderItem = (item: DropdownItem) => {
    return (
      <View style={styles.item}>
        <View style={styles.providerInfo}>
          {item.logo && (
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${item.logo}`,
              }}
              style={styles.logo}
            />
          )}
          <Text style={styles.selectedTextStyle}>{item.label}</Text>
        </View>
        {selectedProviders.includes(Number(item.value)) && (
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
        placeholder="Välj tjänster (t.ex. Netflix)..."
        value={selectedProviders.map((id) => id.toString())}
        search
        searchPlaceholder="Sök streamingtjänst..."
        onChange={(item) => {
          setSelectedProviders(item.map((id) => Number(id)));
        }}
        renderItem={renderItem}
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
  itemContainer: {
    backgroundColor: "#222",
    borderRadius: 8,
    borderWidth: 0,
  },
  selectedStyle: {
    borderRadius: 12,
    backgroundColor: "#E50914",
    borderWidth: 0,
  },
  item: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  providerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 6,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 8,
    borderWidth: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E50914",
  },
});
