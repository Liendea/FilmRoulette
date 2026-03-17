import { StyleSheet, Text, View } from "react-native";
import { Movie } from "@/types/movietype";
import Icon from "@/components/shared/Icon";

type MovieVoteProps = {
  movie: Movie;
};

export default function MovieVote({ movie }: MovieVoteProps) {
  return (
    <View style={styles.voteContainer}>
      <Icon icon={require("@/assets/icons/Star.png")} width={20} height={20} />
      <Text style={styles.subtitle}>{movie.vote_average}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  voteContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  subtitle: {
    color: "#AAAAAA",
    fontSize: 16,
    fontWeight: "bold",
  },
});
