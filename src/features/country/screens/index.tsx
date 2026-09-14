import { StyleSheet, View, Text, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRegion } from "../context/RegionContext";
import RegionDropdown from "../components/RegionDropdown";
import Spacer from "@/sharedComponents/Spacer";
import Button from "@/sharedComponents/Button";

type CountryScreenProps = {
  visible: boolean;
  onClose: () => void;
  // false = kan inte avbrytas/swipas bort utan att bekräfta ett val
  // (används för att tvinga fram ett regionval innan första slumpningen).
  dismissable?: boolean;
};

export default function CountryScreen({
  visible,
  onClose,
  dismissable = true,
}: CountryScreenProps) {
  const { region, setRegion, confirmRegion } = useRegion();
  const insets = useSafeAreaInsets();

  const handleDone = () => {
    confirmRegion();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="overFullScreen"
      onRequestClose={dismissable ? onClose : () => {}}
    >
      <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
        {!dismissable && (
          <>
            <View style={styles.header}>
              <Text style={styles.sectionTitle}>Welcome!</Text>
            </View>
            <Spacer height={40} />
          </>
        )}

        <Text style={styles.sectionTitle}>Region</Text>
        <Spacer height={10} />
        <Text style={styles.helperText}>
          {dismissable
            ? "Search results and available streaming services are shown based on your selected region."
            : "Choose your region before shuffling your first movie - search results and streaming services will be tailored to it."}
        </Text>
        <Spacer height={20} />
        <RegionDropdown region={region} setRegion={setRegion} />

        <View style={styles.spacer} />

        <Button onPress={handleDone} buttonText={"Done"} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  helperText: {
    color: "#AAAAAA",
    fontSize: 14,
  },
  spacer: {
    flex: 1,
  },
});
