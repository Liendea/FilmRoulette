import { Pressable, StyleSheet, Text } from "react-native";
import Icon from "./ui/Icon";

type AddToWatchListButtonProps = {
  onPress: () => void | Promise<void>;
};

export default function AddToWatchListButton({
  onPress,
}: AddToWatchListButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Icon
        icon={require("@/assets/icons/plus_white.png")}
        height={15}
        width={15}
      />
      <Text style={styles.text}>Lägg till i lista</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5a5959be",
    borderRadius: 50,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  text: {
    color: "white",
    fontSize: 14,
  },
});
