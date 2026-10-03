import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  Linking,
  ViewStyle,
  StyleProp,
} from "react-native";
import { InfoIcon, XIcon } from "phosphor-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { TMDB_LOGO_XML } from "@/assets/tmdbLogo";

type InfoButtonProps = {
  // Positioneringsstil (top/left/right etc) skickas in av skärmen som
  // använder knappen, precis som RegionButton gör.
  style?: StyleProp<ViewStyle>;
};

// Info-knapp med cirkel-ikon - öppnar en modal med info om appen och
// attribution till TMDB, vars API driver all film-/serie-data.
export default function InfoButton({ style }: InfoButtonProps) {
  const [visible, setVisible] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <>
      <Pressable
        style={style}
        onPress={() => setVisible(true)}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <InfoIcon color="#ffffff" weight="fill" size={28} />
      </Pressable>

      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setVisible(false)}
      >
        <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
          <Pressable
            style={styles.closeButton}
            onPress={() => setVisible(false)}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <XIcon color="#ffffff" weight="bold" size={24} />
          </Pressable>

          <Text style={styles.emoji}>🍿</Text>
          <Text style={styles.title}>Film Roulette</Text>
          <Text style={styles.paragraph}>
            Can&apos;t decide what to watch? Film Roulette picks a movie or
            TV show for you based on your filters, so you don&apos;t have to
            scroll forever.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Data</Text>
          <Text style={styles.paragraph}>
            All movie and TV information comes from The Movie Database
            (TMDB).
          </Text>
          <Pressable
            style={styles.tmdbLogoWrapper}
            onPress={() => Linking.openURL("https://www.themoviedb.org/")}
          >
            <SvgXml xml={TMDB_LOGO_XML} width={140} height={11.7} />
          </Pressable>
          <Text style={styles.disclaimer}>
            This product uses the TMDB API but is not endorsed or certified
            by TMDB.
          </Text>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 24,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 100,
    backgroundColor: "#5a5959be",
    borderRadius: 20,
    padding: 8,
  },
  emoji: {
    fontSize: 48,
    marginTop: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  paragraph: {
    color: "#AAAAAA",
    fontSize: 15,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#333",
    marginVertical: 24,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  tmdbLogoWrapper: {
    marginTop: 12,
  },
  disclaimer: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
    marginTop: 16,
  },
});
