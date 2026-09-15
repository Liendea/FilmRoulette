import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Spacer from "@/sharedComponents/Spacer";
import Button from "@/sharedComponents/Button";
import Category from "@/features/discover/components/Category";

type HeroScreenProps = {
  handleShuffle: (type: "movie" | "tv") => void;
  loading: boolean;
};
export default function HeroScreen({
  handleShuffle,
  loading,
}: HeroScreenProps) {
  const [type, setType] = useState<"movie" | "tv">("movie");

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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    width: "100%",
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
});
