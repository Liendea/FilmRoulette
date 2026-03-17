import { View, Text, StyleSheet } from "react-native";
import Spacer from "@/components/shared/Spacer";
import Button from "@/components/shared/Button";

type HeroScreenProps = {
  handleShuffle: () => void;
  loading: boolean;
};
export default function HeroScreen({
  handleShuffle,
  loading,
}: HeroScreenProps) {
  return (
    <>
      <View style={styles.heroSection}>
        <Text style={styles.emoji}>🍿</Text>
        <Spacer height={20} />
        <Text style={styles.title}>Svårt att välja film?</Text>
        <Text style={styles.subtitle}>
          Låt slumpen avgöra kvällens underhållning.
        </Text>
      </View>
      {/* Shuffle button*/}
      <Spacer height={60} />
      <Button
        onPress={handleShuffle}
        loading={loading}
        buttonText={"SLUMPA FRAM EN FILM"}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
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
});
