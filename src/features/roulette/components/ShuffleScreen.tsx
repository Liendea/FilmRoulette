import { Dispatch, SetStateAction, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SlidersHorizontalIcon } from "phosphor-react-native";
import Spacer from "@/sharedComponents/Spacer";
import Button from "@/sharedComponents/Button";
import Category from "@/features/discover/components/Category";
import ShuffleFilterModal from "./ShuffleFilterModal";
import { useAvailableProviders } from "../hooks/useAvailableProviders";
import { MonetizationTypes } from "../hooks/useRoulette";

type HeroScreenProps = {
  handleShuffle: (type: "movie" | "tv") => void;
  loading: boolean;
  monetizationTypes: MonetizationTypes;
  setMonetizationTypes: Dispatch<SetStateAction<MonetizationTypes>>;
  selectedProviders: number[];
  setSelectedProviders: (ids: number[]) => void;
  hasActiveFilters: boolean;
  resetFilters: () => void;
  noResults: boolean;
};
export default function HeroScreen({
  handleShuffle,
  loading,
  monetizationTypes,
  setMonetizationTypes,
  selectedProviders,
  setSelectedProviders,
  hasActiveFilters,
  resetFilters,
  noResults,
}: HeroScreenProps) {
  const [type, setType] = useState<"movie" | "tv">("movie");
  const [filterVisible, setFilterVisible] = useState(false);
  // Tjänsterna att välja bland beror på både region och film/serie.
  const providers = useAvailableProviders(type);

  return (
    <>
      <View style={styles.heroSection}>
        <Text style={styles.emoji}>🍿</Text>
        <Spacer height={20} />
        <Text style={styles.title}>Can&apos;t decide what to watch?</Text>
        <Spacer height={10} />
        <Text style={styles.subtitle}>
          Let fate decide tonight&apos;s entertainment.
        </Text>
        {/* Välj film eller serie att slumpa bland */}
        <Spacer height={40} />
        <View style={styles.typeSelector}>
          <Text style={styles.sectionTitle}>I want to shuffle:</Text>
          <Spacer height={10} />
          <View style={styles.typeSelectorRow}>
            <Category type={type} setType={setType} />
          </View>
        </View>
        <Spacer height={20} />
        <Button
          onPress={() => handleShuffle(type)}
          loading={loading}
          buttonText={type === "tv" ? "SHUFFLE A TV SHOW" : "SHUFFLE A MOVIE"}
        />
        <Spacer height={20} />
        {/* Öppnar shuffle-filtret. Röd när ett filter är aktivt, så att det
            syns varför urvalet är begränsat. */}
        <Pressable
          style={styles.filterButton}
          onPress={() => setFilterVisible(true)}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <SlidersHorizontalIcon
            color={hasActiveFilters ? "#E50914" : "#AAAAAA"}
            weight="bold"
            size={18}
          />
          <Text
            style={[
              styles.filterButtonText,
              hasActiveFilters && styles.filterButtonTextActive,
            ]}
          >
            {hasActiveFilters ? "Edit shuffle filter" : "Add shuffle filter"}
          </Text>
        </Pressable>
        {noResults && (
          <>
            <Spacer height={12} />
            <Text style={styles.noResults}>
              No titles match your filter. Try changing it.
            </Text>
          </>
        )}
      </View>

      <ShuffleFilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        providers={providers}
        monetizationTypes={monetizationTypes}
        setMonetizationTypes={setMonetizationTypes}
        selectedProviders={selectedProviders}
        setSelectedProviders={setSelectedProviders}
        hasActiveFilters={hasActiveFilters}
        resetFilters={resetFilters}
      />
    </>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    width: "100%",
    // Utan detta sträcker sig knappar/rader (som är width: "100%" av denna)
    // ut över hela bredden på en iPad. maxWidth begränsar dem till en läsbar
    // bredd och alignSelf centrerar hero-sektionen själv på bred skärm.
    maxWidth: 480,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
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
  typeSelector: {
    width: "100%",
    alignItems: "center",
  },
  typeSelectorRow: {
    // Samma bredd som FilterModal ger Category - annars kapas "TV Shows".
    width: "100%",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  filterButtonText: {
    color: "#AAAAAA",
    fontSize: 14,
    fontWeight: "600",
  },
  filterButtonTextActive: {
    color: "#E50914",
  },
  noResults: {
    color: "#AAAAAA",
    fontSize: 14,
    textAlign: "center",
  },
});
