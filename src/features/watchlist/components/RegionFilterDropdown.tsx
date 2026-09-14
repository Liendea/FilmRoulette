import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { REGIONS } from "@/types/region";

export const ALL_REGIONS_CODE = "ALL";

type FilterOption = {
  code: string; // "ALL" eller en ISO-regionskod
  name: string;
  flag: string;
};

type RegionFilterDropdownProps = {
  // Distinkta regionskoder som faktiskt finns bland sparade filmer/serier -
  // bara dessa erbjuds som filter, utöver "Visa alla".
  availableCodes: string[];
  selected: string;
  setSelected: (code: string) => void;
};

export default function RegionFilterDropdown({
  availableCodes,
  selected,
  setSelected,
}: RegionFilterDropdownProps) {
  const options: FilterOption[] = [
    { code: ALL_REGIONS_CODE, name: "Show all", flag: "🌍" },
    ...availableCodes
      .map((code) => REGIONS.find((r) => r.code === code))
      .filter((r): r is (typeof REGIONS)[number] => Boolean(r)),
  ];

  const selectedOption = options.find((o) => o.code === selected) ?? options[0];

  const renderItem = (item: FilterOption) => (
    <View style={styles.item}>
      <Text style={styles.flag}>{item.flag}</Text>
      <Text style={styles.textItem}>{item.name}</Text>
    </View>
  );

  return (
    <Dropdown
      style={styles.dropdown}
      containerStyle={styles.itemContainer}
      autoScroll={false}
      data={options}
      labelField="name"
      valueField="code"
      activeColor="#333"
      value={selected}
      onChange={(item) => setSelected(item.code)}
      renderItem={renderItem}
      renderLeftIcon={() => (
        <Text style={[styles.flag, { marginRight: 10 }]}>
          {selectedOption.flag}
        </Text>
      )}
      selectedTextStyle={styles.selectedTextStyle}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    backgroundColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  selectedTextStyle: {
    color: "#fff",
    fontSize: 16,
  },
  itemContainer: {
    backgroundColor: "#222",
    borderRadius: 8,
    borderWidth: 0,
  },
  item: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  flag: {
    fontSize: 18,
  },
  textItem: {
    fontSize: 16,
    color: "#fff",
  },
});
