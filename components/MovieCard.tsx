import { StyleSheet, Text, View, Image } from "react-native";
import Spacer from "@/components/Spacer";
import { Movie } from "@/types/movietype";
import TabBarIcon from "@/components/TabBarIcon";
import { ScrollView } from "react-native";

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <>
      {/* Poster */}
      <Spacer height={10} />
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        style={{ width: 150, height: 225 }}
      />
      {/* Titel */}
      <Spacer height={20} />
      <Text style={styles.movieTitle}>{movie.title}</Text>

      {/* Overview */}
      <Spacer height={20} />
      <ScrollView style={styles.overview}>
        <Text style={styles.subtitle}>{movie.overview}</Text>
      </ScrollView>

      {/* Betyg */}
      <Spacer height={20} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TabBarIcon
          icon={require("@/assets/icons/Star.png")}
          width={20}
          height={20}
        />
        <Text style={[styles.subtitle, { fontWeight: "bold" }]}>
          Betyg: {movie.vote_average}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  heroSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 60,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#AAAAAA",
    fontSize: 16,
    textAlign: "center",
  },
  movieTitle: {
    color: "#ffffff",
    fontSize: 24,
    textAlign: "center",
  },
  overview: {
    maxHeight: 150,
  },
});
