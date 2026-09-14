import { watchlistService } from "@/features/watchlist/utils/watchlistService";
import { Movie, WatchlistItem } from "@/types/movietype";
import { CountryWatchProviders } from "@/types/watchProvider";
import Toast from "react-native-toast-message";
import { useRegion } from "@/features/country/context/RegionContext";

export function useWatchlistActions() {
  const { region } = useRegion();

  const addToWatchlist = async (
    movie: Movie,
    providers: CountryWatchProviders | null,
  ) => {
    const itemToSave: WatchlistItem = {
      movie,
      providers,
      addedFromRegion: region.code,
    };

    const addedToList = await watchlistService.addToWatchlist(itemToSave);

    if (addedToList) {
      Toast.show({
        type: "success",
        text1: "Woho!",
        text2: "The movie has been added to your list!",
        position: "bottom",
        bottomOffset: 30,
      });
    } else {
      Toast.show({
        type: "info",
        text1: "Info",
        text2: "The movie is already in your list",
        position: "bottom",
        bottomOffset: 30,
      });
    }

    return addedToList;
  };

  return { addToWatchlist };
}
