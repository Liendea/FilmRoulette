import AsyncStorage from "@react-native-async-storage/async-storage";
import { WatchlistItem } from "@/types/movietype";

const WATCHLIST_KEY = "@movie_watchlist";

// TMDB:s id-serier för film och serie är separata - samma numeriska id kan
// alltså peka på en helt annan titel beroende på media_type. Poster sparade
// innan media_type fanns antas vara filmer (roulette-slumpningen sätter
// fortfarande inte media_type, och slumpar bara bland filmer).
const itemKey = (id: number, mediaType?: string) =>
  `${mediaType ?? "movie"}-${id}`;

export const watchlistService = {
  // Hämta listan
  getWatchlist: async (): Promise<WatchlistItem[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(WATCHLIST_KEY);
      if (jsonValue == null) return [];

      const parsed = JSON.parse(jsonValue) as WatchlistItem[];

      // Skydd mot skräpdata (t.ex. gamla poster sparade innan schemat ändrades):
      // en post utan movie.id skulle annars krascha FlatList-renderingen.
      // Vi städar och skriver tillbaka listan så att skräpet inte dyker upp igen.
      const validItems = parsed.filter(
        (item) => item?.movie?.id !== undefined && item?.movie?.id !== null,
      );

      if (validItems.length !== parsed.length) {
        console.warn(
          `Watchlist innehöll ${parsed.length - validItems.length} ogiltiga post(er) - dessa har städats bort.`,
        );
        await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(validItems));
      }

      return validItems;
    } catch (e) {
      console.error("Kunde inte hämta watchlist", e);
      return [];
    }
  },

  // Lägg till en film/serie (om den inte redan finns)
  addToWatchlist: async (item: WatchlistItem) => {
    try {
      const currentList: WatchlistItem[] =
        await watchlistService.getWatchlist();
      const exists = currentList.find(
        (i) =>
          itemKey(i.movie.id, i.movie.media_type) ===
          itemKey(item.movie.id, item.movie.media_type),
      );

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

  // Ta bort film/serie från watchlist
  removeFromWatchlist: async (movieId: number, mediaType?: string) => {
    const currentList = await watchlistService.getWatchlist();
    const newList = currentList.filter(
      (item: WatchlistItem) =>
        itemKey(item.movie.id, item.movie.media_type) !==
        itemKey(movieId, mediaType),
    );
    await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(newList));
    return newList;
  },
};
