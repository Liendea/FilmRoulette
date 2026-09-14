import { StyleSheet, View, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MovieCard from "@/sharedComponents/MovieCard";
import ShuffleScreen from "../components/ShuffleScreen";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/theme/toastConfig";
import { useRoulette } from "../hooks/useRoulette";
import CountryScreen from "@/features/country/screens";
import { useRegion } from "@/features/country/context/RegionContext";
import RegionButton from "@/features/country/components/RegionButton";

export default function RouletteScreen() {
  const { movie, loading, watchProvider, handleShuffle, closeModal } =
    useRoulette();
  const { regionConfirmed, loading: regionLoading } = useRegion();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <RegionButton style={styles.regionIcon} />

      {/* Först visas Shuffle Screen */}
      <ShuffleScreen handleShuffle={handleShuffle} loading={loading} />

      {/* Tvingande region-val - måste bekräftas innan man kan slumpa första gången */}
      <CountryScreen
        visible={!regionLoading && !regionConfirmed}
        onClose={() => {}}
        dismissable={false}
      />

      {/* Shuffle resultat visas i modal */}
      <Modal
        visible={movie !== null}
        animationType="slide"
        presentationStyle="overFullScreen"
        onRequestClose={closeModal}
      >
        <View style={[styles.modalBackground, { paddingTop: insets.top }]}>
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
  regionIcon: {
    position: "absolute",
    top: 63,
    left: 30,
    zIndex: 100,
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
