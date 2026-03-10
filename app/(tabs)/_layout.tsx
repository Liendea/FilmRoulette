import { Tabs } from "expo-router";
import CustomTabBar from "@/components/CustomTabBar";

export default function TabLayoout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarShowLabel: false,
        sceneStyle: { backgroundColor: "#000000" },
        headerStyle: {
          backgroundColor: "#000000",
        },
        headerTintColor: "#E50914",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "FILM ROULETTE" }} />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="watchlist" />
    </Tabs>
  );
}
