import { StyleSheet, View, Modal, Pressable } from "react-native";
import { XIcon } from "phosphor-react-native";
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
          {/* overFullScreen har inget inbyggt sätt att swipa bort modalen på,
              så en explicit stäng-knapp behövs (pageSheet gjorde detta gratis
              på iOS, men läckte den vita kanten som fixades tidigare). */}
          <Pressable
            style={[styles.closeButton, { top: insets.top + 20 }]}
            onPress={closeModal}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <XIcon color="#ffffff" weight="bold" size={24} />
          </Pressable>
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
  closeButton: {
    // top sätts dynamiskt inline (insets.top + 20) - absolut positionerade
    // element i RN respekterar inte förälderns paddingTop, så utan detta
    // hamnar knappen under statusfältet/klockan och blir oklickbar.
    position: "absolute",
    right: 20,
    zIndex: 100,
    backgroundColor: "#5a5959be",
    borderRadius: 20,
    padding: 8,
  },
});
