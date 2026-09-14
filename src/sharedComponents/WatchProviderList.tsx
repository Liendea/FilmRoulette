import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { CountryWatchProviders } from "@/types/watchProvider";
import ProviderAccordion from "./ProviderAccordion";

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
        title="Stream"
        data={providers?.flatrate || []}
        isOpen={activeSection === "streaming"}
        onPress={() => toggleSection("streaming")}
        emptyText="Not available to stream right now"
      />

      <ProviderAccordion
        title="Rent"
        data={providers?.rent || []}
        isOpen={activeSection === "rent"}
        onPress={() => toggleSection("rent")}
        emptyText="Not available to rent right now"
      />

      <ProviderAccordion
        title="Buy"
        data={providers?.buy || []}
        isOpen={activeSection === "buy"}
        onPress={() => toggleSection("buy")}
        emptyText="Not available to buy right now"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
