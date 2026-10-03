import { useEffect, useState } from "react";
import { Platform } from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL, fetchOptions } from "@/api/config";

const POSTPONED_KEY = "update_postponed_version";

type Update = { required: boolean; storeUrl: string; latest: string };

// Jämför del för del som tal - som strängar blir "1.10.0" lägre än "1.9.0".
function isOlder(current: string, target: string) {
  const a = current.split(".").map(Number);
  const b = target.split(".").map(Number);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const diff = (a[i] ?? 0) - (b[i] ?? 0);
    if (diff !== 0) return diff < 0;
  }
  return false;
}

export function useUpdateCheck() {
  const [update, setUpdate] = useState<Update | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const current = Constants.expoConfig?.version;
        if (!current) return;

        const response = await fetch(`${BASE_URL}/version`, fetchOptions);
        if (!response.ok) return;
        const info = await response.json();

        if (!isOlder(current, info.latest)) return;

        const postponed = await AsyncStorage.getItem(POSTPONED_KEY);
        const required =
          isOlder(current, info.minimum) || postponed === info.latest;

        if (!cancelled) {
          setUpdate({
            required,
            storeUrl: Platform.OS === "ios" ? info.iosUrl : info.androidUrl,
            latest: info.latest,
          });
        }
      } catch {
        // Versionskollen får aldrig hindra appen från att starta.
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, []);

  function postpone() {
    if (!update) return;
    AsyncStorage.setItem(POSTPONED_KEY, update.latest).catch(() => {});
    setUpdate(null);
  }

  return { update, postpone };
}
