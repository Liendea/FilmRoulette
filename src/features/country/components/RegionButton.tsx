import { useState } from "react";
import { StyleSheet, View, Text, Pressable, ViewStyle, StyleProp } from "react-native";
import { GlobeIcon } from "phosphor-react-native";
import { useRegion } from "../context/RegionContext";
import CountryScreen from "../screens";

type RegionButtonProps = {
  // Positioneringsstil (top/left/right etc) skickas in av varje skärm så
  // knappen kan placeras konsekvent utifrån den skärmens layout.
  style?: StyleProp<ViewStyle>;
};

// Återanvändbar region-knapp - läggs till på Slump, Discover och Watchlist så
// att man alltid kan byta region, oavsett var i appen man befinner sig.
export default function RegionButton({ style }: RegionButtonProps) {
  const { region } = useRegion();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable
        style={style}
        onPress={() => setVisible(true)}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <View style={styles.wrapper}>
          <Text style={styles.flag}>{region.flag}</Text>
          <GlobeIcon color="#ffffff" weight="fill" size={28} />
        </View>
      </Pressable>

      <CountryScreen visible={visible} onClose={() => setVisible(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  flag: {
    fontSize: 20,
  },
});
