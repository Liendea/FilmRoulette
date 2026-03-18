import { StyleSheet, View, Modal } from "react-native";
import MovieCard from "@/sharedComponents/MovieCard";
import ShuffleScreen from "../components/ShuffleScreen";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/theme/toastConfig";
import { useRoulette } from "../hooks/useRoulette";

export default function RouletteScreen() {
  const { movie, loading, watchProvider, handleShuffle, closeModal } =
    useRoulette();

  return (
    <View style={styles.container}>
      {/* Först visas Shuffle Screen */}
      <ShuffleScreen handleShuffle={handleShuffle} loading={loading} />

      {/* Shuffle resultat visas i modal */}
      <Modal
        visible={movie !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          {movie && (
            <MovieCard
              movie={movie}
              watchProvider={watchProvider}
              loading={loading}
            />
          )}
        </View>
        <Toast config={toastConfig} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heroSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 60,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#AAAAAA",
    fontSize: 16,
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "#000",
  },
});
