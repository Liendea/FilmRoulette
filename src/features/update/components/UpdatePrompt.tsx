import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Linking,
} from "react-native";
import { useUpdateCheck } from "../hooks/useUpdateCheck";

export default function UpdatePrompt() {
  const { update, postpone } = useUpdateCheck();
  if (!update) return null;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={() => {}}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Update available</Text>
          <Text style={styles.body}>
            {update.required
              ? "Please update Film Roulette to continue."
              : "A new version of Film Roulette is available."}
          </Text>

          <Pressable
            style={styles.primary}
            onPress={() => Linking.openURL(update.storeUrl)}
          >
            <Text style={styles.primaryText}>Update</Text>
          </Pressable>

          {!update.required && (
            <Pressable onPress={postpone} hitSlop={10}>
              <Text style={styles.secondaryText}>Later</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#121212",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    gap: 16,
  },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  body: { color: "#fff", fontSize: 16, textAlign: "center" },
  primary: {
    backgroundColor: "#E50914",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  primaryText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  secondaryText: { color: "#aaa", fontSize: 16 },
});
