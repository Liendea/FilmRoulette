import { View, StyleSheet, Pressable, Text } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarIcon from "./TabBarIcon";

export default function CustomTabBar({
  state,
  navigation,
  descriptors,
}: BottomTabBarProps) {
  const currentRoute = state.routes[state.index].name;
  return (
    <View style={styles.container}>
      <View style={styles.leftPill}>
        <Pressable onPress={() => navigation.navigate("index")}>
          <TabBarIcon
            icon={
              currentRoute === "index"
                ? require("@/assets/icons/film_red.png")
                : require("@/assets/icons/film_white.png")
            }
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("watchlist")}>
          <TabBarIcon
            icon={
              currentRoute === "watchlist"
                ? require("@/assets/icons/list_red.png")
                : require("@/assets/icons/list_white.png")
            }
          />
        </Pressable>
      </View>
      <View style={styles.rightPill}>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => navigation.navigate("search")}
        >
          <TabBarIcon
            icon={
              currentRoute === "search"
                ? require("@/assets/icons/search_red.png")
                : require("@/assets/icons/search_white.png")
            }
          />
          <Text
            style={[
              styles.text,
              { color: currentRoute === "search" ? "red" : "white" },
            ]}
          >
            Filtrera
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// Aktiv icon color: "#E50914",

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 65,
    position: "absolute",
    bottom: 25,
    paddingHorizontal: 22,
    width: "100%",
    gap: 30,
  },
  leftPill: {
    width: "45%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#121212",
    borderRadius: 50,
    paddingHorizontal: 30,
  },
  rightPill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    backgroundColor: "#121212",
    borderRadius: 50,
    width: "45%",
  },
  text: {
    marginLeft: 5,
    fontSize: 16,
  },
});
