import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { StarIcon } from "phosphor-react-native";

type RatingItem = {
  label: string;
  value: string;
};

const data = [
  { label: "Alla betyg", value: "0" },
  { label: "1+ ", value: "1" },
  { label: "2+ ", value: "2" },
  { label: "3+ ", value: "3" },
  { label: "4+ ", value: "4" },
  { label: "5+ ", value: "5" },
  { label: "6+ ", value: "6" },
  { label: "7+ ", value: "7" },
  { label: "8+ ", value: "8" },
];

type MinRatingProps = {
  minRating: number;
  setMinRating: (value: number) => void;
};

const renderItem = (item: RatingItem) => {
  return (
    <View style={styles.item}>
      {item.value !== "0" && (
        <StarIcon color="#FFD700" weight="fill" size={18} />
      )}
      <Text style={styles.textItem}>{item.label}</Text>
    </View>
  );
};

export default function Category({ minRating, setMinRating }: MinRatingProps) {
  return (
    <Dropdown
      style={styles.dropdown}
      containerStyle={styles.itemContainer}
      autoScroll={false}
      data={data}
      labelField="label"
      valueField="value"
      activeColor="#333"
      value={minRating.toString()}
      onChange={(item) => setMinRating(Number(item.value))}
      renderItem={renderItem}
      renderLeftIcon={() => (
        <StarIcon
          color="#FFD700"
          weight="fill"
          size={20}
          style={{ marginRight: 10 }}
        />
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
    color: "white",
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
    gap: 5,
  },
  textItem: {
    fontSize: 16,
    color: "#fff",
  },
});
