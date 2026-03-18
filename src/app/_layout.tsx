import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/theme/toastConfig";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerTransparent: true,
            headerTitle: "Filminfo",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#000" },
            headerBackTitle: "Tillbaka",
          }}
        />
      </Stack>
      <Toast config={toastConfig} />
    </>
  );
}
