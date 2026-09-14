import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT_REGION_CODE, Region, REGIONS } from "@/types/region";

const REGION_KEY = "@selected_region";
// Skiljer på "vi har ett default-värde" och "användaren har faktiskt gjort ett val" -
// annars går det inte att tvinga fram valet innan första slumpningen.
const REGION_CONFIRMED_KEY = "@region_confirmed";

type RegionContextValue = {
  region: Region;
  setRegion: (code: string) => void;
  confirmRegion: () => void;
  regionConfirmed: boolean;
  loading: boolean;
};

const RegionContext = createContext<RegionContextValue | undefined>(
  undefined,
);

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [regionCode, setRegionCode] = useState(DEFAULT_REGION_CODE);
  const [regionConfirmed, setRegionConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Läs sparad region + om användaren redan gjort ett aktivt val vid appstart
  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(REGION_KEY),
      AsyncStorage.getItem(REGION_CONFIRMED_KEY),
    ])
      .then(([savedCode, confirmed]) => {
        if (savedCode) setRegionCode(savedCode);
        setRegionConfirmed(confirmed === "true");
      })
      .catch((e) => console.error("Kunde inte läsa sparad region", e))
      .finally(() => setLoading(false));
  }, []);

  const confirmRegion = () => {
    setRegionConfirmed(true);
    AsyncStorage.setItem(REGION_CONFIRMED_KEY, "true").catch((e) =>
      console.error("Kunde inte spara att region är vald", e),
    );
  };

  const setRegion = (code: string) => {
    setRegionCode(code);
    setRegionConfirmed(true);
    AsyncStorage.setItem(REGION_KEY, code).catch((e) =>
      console.error("Kunde inte spara vald region", e),
    );
    AsyncStorage.setItem(REGION_CONFIRMED_KEY, "true").catch((e) =>
      console.error("Kunde inte spara att region är vald", e),
    );
  };

  const region = REGIONS.find((r) => r.code === regionCode) ?? REGIONS[0];

  return (
    <RegionContext.Provider
      value={{ region, setRegion, confirmRegion, regionConfirmed, loading }}
    >
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) {
    throw new Error("useRegion måste användas inom en RegionProvider");
  }
  return ctx;
}
