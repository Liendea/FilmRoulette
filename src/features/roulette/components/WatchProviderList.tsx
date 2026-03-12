import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { CountryWatchProviders } from "@/types/watchProvider";
import ProviderAccordion from "./ProviderAccordion"; // Importera den nya komponenten

type WatchProviderListProps = {
  providers: CountryWatchProviders | null;
};

export default function WatchProviderList({
  providers,
}: WatchProviderListProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <ScrollView
      style={styles.outerContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <ProviderAccordion
        title="Streama"
        data={providers?.flatrate || []}
        isOpen={activeSection === "streaming"}
        onPress={() => toggleSection("streaming")}
        emptyText="Finns ej att streama just nu"
      />

      <ProviderAccordion
        title="Hyr"
        data={providers?.rent || []}
        isOpen={activeSection === "rent"}
        onPress={() => toggleSection("rent")}
        emptyText="Finns ej att hyra just nu"
      />

      <ProviderAccordion
        title="Köp"
        data={providers?.buy || []}
        isOpen={activeSection === "buy"}
        onPress={() => toggleSection("buy")}
        emptyText="Finns ej att köpa just nu"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  scrollContent: {
    // Justera detta värde (t.ex. 80-100) beroende på hur hög din bottenmeny är
    paddingBottom: 50,
  },
});
