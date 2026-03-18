import { StyleSheet, Text, View } from "react-native";
import { Movie } from "@/types/movietype";
import { StarIcon } from "phosphor-react-native";

type MovieVoteProps = {
  movie: Movie;
};

export default function MovieVote({ movie }: MovieVoteProps) {
  return (
    <View style={styles.voteContainer}>
      <StarIcon color="yellow" weight="fill" size={20} />

      <Text style={styles.subtitle}>{movie.vote_average}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  voteContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  subtitle: {
    color: "#AAAAAA",
    fontSize: 16,
    fontWeight: "bold",
  },
});
