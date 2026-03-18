import React from "react";
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { WatchProvider } from "@/types/watchProvider";

interface ProviderAccordionProps {
  title: string;
  data: WatchProvider[];
  isOpen: boolean;
  onPress: () => void;
  emptyText: string;
}

export default function ProviderAccordion({
  title,
  data,
  isOpen,
  onPress,
  emptyText,
}: ProviderAccordionProps) {
  return (
    <View style={styles.sectionContainer}>
      <Pressable style={styles.header} onPress={onPress}>
        <Text style={styles.title}>
          {title} ({data.length})
        </Text>
        <Text style={styles.arrow}>{isOpen ? " ▲" : " ▼"}</Text>
      </Pressable>

      {isOpen && (
        <View style={styles.content}>
          {data.length > 0 ? (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
            >
              {data.map((p) => (
                <Image
                  style={styles.image}
                  key={p.provider_id}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${p.logo_path}`,
                  }}
                />
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.noServiceText}>{emptyText}</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  arrow: {
    color: "#AAAAAA",
    fontSize: 12,
  },
  content: {
    paddingBottom: 15,
  },
  scrollContainer: {
    gap: 12,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 8,
  },
  noServiceText: {
    color: "#666",
    fontSize: 14,
    fontStyle: "italic",
  },
});
