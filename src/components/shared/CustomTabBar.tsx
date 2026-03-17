import { View, StyleSheet, Pressable, Text } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Icon from "./Icon";

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const currentRoute = state.routes[state.index].name;
  return (
    <View style={styles.container}>
      {/* Left Pill */}
      <View style={styles.leftPill}>
        <Pressable
          onPress={() => navigation.navigate("index")}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Icon
            icon={
              currentRoute === "index"
                ? require("@/assets/icons/film_red.png")
                : require("@/assets/icons/film_white.png")
            }
          />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("watchlist")}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Icon
            icon={
              currentRoute === "watchlist"
                ? require("@/assets/icons/list_red.png")
                : require("@/assets/icons/list_white.png")
            }
          />
        </Pressable>
      </View>
      {/* Right Pill */}
      <View style={styles.rightPill}>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => navigation.navigate("discover")}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Icon
            icon={
              currentRoute === "discover"
                ? require("@/assets/icons/search_red.png")
                : require("@/assets/icons/search_white.png")
            }
          />
          <Text
            style={[
              styles.text,
              { color: currentRoute === "discover" ? "red" : "white" },
            ]}
          >
            Upptäck
          </Text>
        </Pressable>
      </View>
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
    backgroundColor: "#5a5959be",
    borderRadius: 50,
    paddingHorizontal: 25,
  },
  rightPill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    backgroundColor: "#5a5959be",
    borderRadius: 50,
    width: "40%",
  },
  text: {
    marginLeft: 5,
    fontSize: 16,
  },
});
