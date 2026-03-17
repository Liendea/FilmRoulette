import { Tabs } from "expo-router";
import CustomTabBar from "@/components/shared/CustomTabBar";

export default function TabLayoout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarShowLabel: false,
        sceneStyle: { backgroundColor: "#000000" },
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTintColor: "#E50914",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "FILM ROULETTE" }} />
      <Tabs.Screen
        name="discover"
        options={{
          title: "DISCOVER",
          headerTransparent: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "transparent", // Säkerställer transparens på Android
          },
        }}
      />
      <Tabs.Screen name="watchlist" options={{ title: "WATCH LIST" }} />
    </Tabs>
  );
}
