import { Dispatch, SetStateAction } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Spacer from "@/sharedComponents/Spacer";
import Button from "@/sharedComponents/Button";
import MonetizationFilter from "@/features/discover/components/MonetizationFilter";
import ProviderFilterDropdown from "@/features/discover/components/ProviderFilterDropdown";
import { WatchProvider } from "@/types/watchProvider";
import { MonetizationTypes } from "../hooks/useRoulette";

type ShuffleFilterModalProps = {
  visible: boolean;
  onClose: () => void;
  providers: WatchProvider[];
  monetizationTypes: MonetizationTypes;
  setMonetizationTypes: Dispatch<SetStateAction<MonetizationTypes>>;
  selectedProviders: number[];
  setSelectedProviders: (ids: number[]) => void;
  hasActiveFilters: boolean;
  resetFilters: () => void;
};

// Filter för shuffle: hur man vill se titeln och på vilka tjänster.
// Valen gäller direkt - "Done" stänger bara modalen.
export default function ShuffleFilterModal({
  visible,
  onClose,
  providers,
  monetizationTypes,
  setMonetizationTypes,
  selectedProviders,
  setSelectedProviders,
  hasActiveFilters,
  resetFilters,
}: ShuffleFilterModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.container,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Shuffle filter</Text>
          <Pressable
            onPress={resetFilters}
            disabled={!hasActiveFilters}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text
              style={[
                styles.resetButton,
                !hasActiveFilters && styles.resetButtonDisabled,
              ]}
            >
              Reset
            </Text>
          </Pressable>
        </View>
        <Spacer height={30} />
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Streama / hyr / köp - alla tre valda betyder "alla" */}
          <Text style={styles.sectionTitle}>I want to</Text>
          <Spacer height={10} />
          <MonetizationFilter
            monetizationTypes={monetizationTypes}
            setMonetizationTypes={setMonetizationTypes}
          />
          <Spacer height={25} />

          {/* Tjänster - inget valt betyder alla tjänster */}
          <Text style={styles.sectionTitle}>Choose service</Text>
          <ProviderFilterDropdown
            providers={providers}
            selectedProviders={selectedProviders}
            setSelectedProviders={setSelectedProviders}
          />
          <Text style={styles.hint}>
            Leave empty to shuffle across all services.
          </Text>
        </ScrollView>

        <Button onPress={onClose} buttonText={"Done"} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  resetButton: {
    color: "#E50914",
    fontSize: 16,
  },
  resetButtonDisabled: {
    color: "#555",
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  hint: {
    color: "#AAAAAA",
    fontSize: 13,
  },
});
