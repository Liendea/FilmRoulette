import { watchlistService } from "@/features/watchlist/utils/watchlistService";
import { Movie, WatchlistItem } from "@/types/movietype";
import { CountryWatchProviders } from "@/types/watchProvider";
import Toast from "react-native-toast-message";

export function useWatchlistActions() {
  const addToWatchlist = async (
    movie: Movie,
    providers: CountryWatchProviders | null,
  ) => {
    const itemToSave: WatchlistItem = {
      movie,
      providers,
    };

    const addedToList = await watchlistService.addToWatchlist(itemToSave);

    if (addedToList) {
      Toast.show({
        type: "success",
        text1: "Woho!",
        text2: "Filmen är nu tillagd till din lista!",
        topOffset: 30,
      });
    } else {
      Toast.show({
        type: "info",
        text1: "Info",
        text2: "Filmen finns redan i din lista",
        topOffset: 30,
      });
    }

    return addedToList;
  };

  return { addToWatchlist };
}
