import { View, Text, StyleSheet } from "react-native";
import Spacer from "@/sharedComponents/Spacer";
import Button from "@/sharedComponents/Button";

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
        <Spacer height={10} />
        <Text style={styles.subtitle}>
          Låt slumpen avgöra kvällens underhållning.
        </Text>
        {/* Shuffle button*/}
        <Spacer height={50} />
        <Button
          onPress={handleShuffle}
          loading={loading}
          buttonText={"SLUMPA FRAM EN FILM"}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heroSection: {
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
});
