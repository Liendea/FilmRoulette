import AsyncStorage from "@react-native-async-storage/async-storage";
import { WatchlistItem } from "@/types/movietype";

const WATCHLIST_KEY = "@movie_watchlist";

export const watchlistService = {
  // Hämta listan
  getWatchlist: async (): Promise<WatchlistItem[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(WATCHLIST_KEY);
      return jsonValue != null
        ? (JSON.parse(jsonValue) as WatchlistItem[])
        : [];
    } catch (e) {
      console.error("Kunde inte hämta watchlist", e);
      return [];
    }
  },

  // Lägg till en film (om den inte redan finns)
  addToWatchlist: async (item: WatchlistItem) => {
    try {
      const currentList: WatchlistItem[] =
        await watchlistService.getWatchlist();
      const exists = currentList.find((i) => i.movie.id === item.movie.id);

      if (!exists) {
        const newList = [...currentList, item];
        await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(newList));
        return true;
      }
      return false;
    } catch (e) {
      console.error("Kunde inte spara film", e);
      return false;
    }
  },

  // Ta bort film från watchlist
  removeFromWatchlist: async (movieId: number) => {
    const currentList = await watchlistService.getWatchlist();
    const newList = currentList.filter(
      (item: WatchlistItem) => item.movie.id !== movieId,
    );
    await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(newList));
    return newList;
  },
};
