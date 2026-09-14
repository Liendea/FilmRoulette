import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Region, REGIONS } from "@/types/region";

type RegionDropdownProps = {
  region: Region;
  setRegion: (code: string) => void;
};

const renderItem = (item: Region, selected?: boolean) => {
  return (
    <View style={[styles.item, selected && styles.itemSelected]}>
      <Text style={styles.flag}>{item.flag}</Text>
      <Text style={styles.textItem}>{item.name}</Text>
    </View>
  );
};

export default function RegionDropdown({
  region,
  setRegion,
}: RegionDropdownProps) {
  return (
    <Dropdown
      style={styles.dropdown}
      containerStyle={styles.itemContainer}
      autoScroll={false}
      data={REGIONS}
      labelField="name"
      valueField="code"
      activeColor="#333"
      value={region.code}
      search
      searchPlaceholder="Search country..."
      inputSearchStyle={styles.inputSearchStyle}
      onChange={(item) => setRegion(item.code)}
      renderItem={renderItem}
      renderLeftIcon={() => (
        <Text style={[styles.flag, { marginRight: 10 }]}>{region.flag}</Text>
      )}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.selectedTextStyle}
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
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 8,
  },
  item: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  itemSelected: {
    backgroundColor: "#333",
  },
  flag: {
    fontSize: 20,
  },
  textItem: {
    fontSize: 16,
    color: "#fff",
  },
});
