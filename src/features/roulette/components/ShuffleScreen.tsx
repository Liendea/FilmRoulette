import { View, Text, StyleSheet } from "react-native";
import Spacer from "@/sharedComponents/Spacer";
import Button from "@/sharedComponents/Button";

type HeroScreenProps = {
  handleShuffle: (type: "movie" | "tv") => void;
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
        <Text style={styles.title}>Can&apos;t decide what to watch?</Text>
        <Spacer height={10} />
        <Text style={styles.subtitle}>
          Let fate decide tonight&apos;s entertainment.
        </Text>
        {/* Shuffle buttons - film eller serie */}
        <Spacer height={50} />
        <Button
          onPress={() => handleShuffle("movie")}
          loading={loading}
          buttonText={"SHUFFLE A MOVIE"}
        />
        <Spacer height={15} />
        <Button
          onPress={() => handleShuffle("tv")}
          loading={loading}
          buttonText={"SHUFFLE A TV SHOW"}
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
