import { Pressable, StyleSheet, Text } from "react-native";
import { CheckCircleIcon, PlusCircleIcon } from "phosphor-react-native";

type AddToWatchListButtonProps = {
  onPress: () => void | Promise<void>;
  isAdded: boolean;
  disabled?: boolean;
};

export default function AddToWatchListButton({
  onPress,
  isAdded,
  disabled,
}: AddToWatchListButtonProps) {
  const Icon = isAdded ? CheckCircleIcon : PlusCircleIcon;

  return (
    <Pressable
      style={[styles.button, isAdded && styles.buttonAdded]}
      onPress={onPress}
      disabled={isAdded || disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isAdded || disabled }}
    >
      <Icon color="#fff" weight="fill" size={15} />
      <Text style={styles.text}>
        {isAdded ? "Added to watchlist" : "Add to list"}
      </Text>
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
  buttonAdded: {
    backgroundColor: "#E50914",
  },
  text: {
    color: "white",
    fontSize: 14,
  },
});
