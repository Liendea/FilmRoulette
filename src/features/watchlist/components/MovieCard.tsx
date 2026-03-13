import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import type { Movie } from "@/types/movietype";
import Icon from "@/components/ui/Icon";
import RemoveButton from "./RemoveButton";
import Spacer from "@/components/ui/Spacer";
import { watchlistService } from "../api/watchlistService";

type MovieCardProps = {
  item: Movie;
  onRefresh: () => void;
};
export default function MovieCard({ item, onRefresh }: MovieCardProps) {
  async function handleRemove(id: number) {
    await watchlistService.removeFromWatchlist(id);
    onRefresh();
  }

  return (
    <View style={styles.movieItem}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w780${item.poster_path}`,
        }}
        width={125}
        height={175}
        style={styles.moviePoster}
      />
      <View style={styles.movieDesc}>
        {/* Titel och realese år */}
        <View>
          <Text style={styles.movieTitle}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.release_date}</Text>
          <Spacer height={10} />
          <ScrollView style={styles.scrollOverView}>
            <Text style={styles.subtitle}>{item.overview}</Text>
          </ScrollView>
        </View>
        {/* Betyg och remove knapp */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/* Betyg */}
          <View style={styles.gradeWrapper}>
            <Icon
              icon={require("@/assets/icons/Star.png")}
              width={20}
              height={20}
            />
            <Text style={styles.subtitleBold}>{item.vote_average}</Text>
          </View>
          <RemoveButton onPress={() => handleRemove(item.id)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  movieItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#928f8f75",

    flexDirection: "row",
    gap: 20,
    paddingVertical: 15,
  },
  moviePoster: {
    borderRadius: 10,
  },
  movieDesc: {
    width: "55%",
    gap: 10,
    justifyContent: "space-between",
  },
  movieTitle: {
    fontSize: 18,
    color: "#fff",
  },
  subtitle: {
    fontSize: 12,
    color: "#b7b5b5",
  },
  scrollOverView: {
    maxHeight: 100,
  },
  gradeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  subtitleBold: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
});
