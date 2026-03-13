import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "@/types/movietype";
const WATCHLIST_KEY = "@movie_watchlist";

export const watchlistService = {
  // Hämta listan
  getWatchlist: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(WATCHLIST_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error("Kunde inte hämta watchlist", e);
      return [];
    }
  },

  // Lägg till en film (om den inte redan finns)
  addToWatchlist: async (movie: Movie) => {
    try {
      const currentList = await watchlistService.getWatchlist();
      const exists = currentList.find((m: Movie) => m.id === movie.id);

      if (!exists) {
        const newList = [...currentList, movie];
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
    const newList = currentList.filter((movie: Movie) => movie.id !== movieId);
    await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(newList));
    return newList;
  },
};
