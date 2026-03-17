import { Text, StyleSheet, Pressable } from "react-native";
import { XCircleIcon } from "phosphor-react-native";

type RemoveButtonProps = {
  onPress: () => void;
};
export default function RemoveButton({ onPress }: RemoveButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <XCircleIcon color="#fff" weight="fill" size={20} />
      <Text style={styles.text}>Ta bort</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5a59596d",
    borderRadius: 50,
    padding: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  text: {
    color: "white",
    fontSize: 12,
  },
});
