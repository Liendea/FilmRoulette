import { View, StyleSheet } from "react-native";

export default function Handle() {
  return (
    <View style={styles.handleContainer}>
      <View style={styles.handle} />
    </View>
  );
}

const styles = StyleSheet.create({
  handleContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 10,
    zIndex: 100,
    width: "100%",
    alignItems: "center",
  },
  handle: {
    width: 80,
    height: 5,
    backgroundColor: "#ffffff91",
    borderRadius: 10,
  },
});
