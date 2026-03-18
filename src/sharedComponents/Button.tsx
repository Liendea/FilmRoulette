import { Pressable, Text, StyleSheet } from "react-native";

type ButtonProps = {
  onPress: () => void;
  loading?: boolean;
  buttonText: string;
};
export default function Button({ onPress, loading, buttonText }: ButtonProps) {
  return (
    <Pressable
      style={[styles.button, loading && { opacity: 0.7 }]}
      onPress={onPress}
      disabled={loading}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
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
