import { Pressable, Text, StyleSheet } from "react-native";

type ShuffleButtonProps = {
  onPress: () => void;
  loading: boolean;
};
export default function ShuffleButton({
  onPress,
  loading,
}: ShuffleButtonProps) {
  return (
    <Pressable
      style={[styles.button, loading && { opacity: 0.7 }]}
      onPress={onPress}
      disabled={loading}
    >
      <Text style={styles.buttonText}>SLUMPA FRAM EN FILM</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#E50914",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: "100%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },
});
