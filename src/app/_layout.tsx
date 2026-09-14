import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/theme/toastConfig";
import { RegionProvider } from "@/features/country/context/RegionContext";

export default function RootLayout() {
  return (
    <RegionProvider>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerTransparent: true,
            headerTitle: "Movie info",
            headerTintColor: "#E50914",
            headerStyle: { backgroundColor: "#000" },
            headerBackTitle: "Back",
          }}
        />
      </Stack>
      <Toast config={toastConfig} />
    </RegionProvider>
  );
}
