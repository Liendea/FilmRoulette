import { View, StyleSheet, Pressable, Text } from "react-native";
import { BlurView } from "expo-blur";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  FilmReelIcon,
  ListStarIcon,
  MagnifyingGlassIcon,
} from "phosphor-react-native";

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const currentRoute = state.routes[state.index].name;
  return (
    <View style={styles.container}>
      {/* Left Pill - blurrad bakgrund så ikonerna syns oavsett vad som ligger bakom */}
      <BlurView intensity={60} tint="dark" style={styles.leftPill}>
        <Pressable
          onPress={() => navigation.navigate("index")}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <FilmReelIcon
            color={currentRoute === "index" ? "red" : "#ffffff"}
            weight="fill"
            size={32}
          />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("watchlist")}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <ListStarIcon
            color={currentRoute === "watchlist" ? "red" : "#ffffff"}
            weight="fill"
            size={32}
          />
        </Pressable>
      </BlurView>
      {/* Right Pill */}
      <BlurView intensity={60} tint="dark" style={styles.rightPill}>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => navigation.navigate("discover")}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <MagnifyingGlassIcon
            color={currentRoute === "discover" ? "red" : "#ffffff"}
            weight="fill"
            size={32}
          />
          <Text
            style={[
              styles.text,
              { color: currentRoute === "discover" ? "red" : "white" },
            ]}
          >
            Discover
          </Text>
        </Pressable>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 65,
    position: "absolute",
    bottom: 10,
    paddingHorizontal: 24,
    width: "100%",
    gap: 25,
  },
  leftPill: {
    width: "45%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#5a595966",
    borderRadius: 50,
    paddingHorizontal: 25,
    overflow: "hidden",
  },
  rightPill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    backgroundColor: "#5a595966",
    borderRadius: 50,
    width: "40%",
    overflow: "hidden",
  },
  text: {
    marginLeft: 5,
    fontSize: 16,
  },
});
