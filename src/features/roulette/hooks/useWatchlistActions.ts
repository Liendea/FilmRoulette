import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import * as Haptics from "expo-haptics";
import { watchlistService } from "@/features/watchlist/utils/watchlistService";
import { Movie, WatchlistItem } from "@/types/movietype";
import { CountryWatchProviders } from "@/types/watchProvider";
import { useRegion } from "@/features/country/context/RegionContext";

export function useWatchlistActions(movie: Movie) {
  const { region } = useRegion();
  const [isAdded, setIsAdded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Kolla status varje gång skärmen får fokus eller filmen byts,
  // så att knappen stämmer även om filmen tagits bort i watchlist-fliken.
  useFocusEffect(
    useCallback(() => {
      let active = true;
      setIsAdded(false);
      watchlistService
        .isInWatchlist(movie.id, movie.media_type)
        .then((exists) => active && setIsAdded(exists));
      return () => {
        active = false;
      };
    }, [movie.id, movie.media_type]),
  );

  const addToWatchlist = async (providers: CountryWatchProviders | null) => {
    if (isAdded || isSaving) return;
    setIsSaving(true);

    const itemToSave: WatchlistItem = {
      movie,
      providers,
      addedFromRegion: region.code,
    };

    const addedToList = await watchlistService.addToWatchlist(itemToSave);

    if (addedToList) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setIsAdded(true);
    } else {
      // false = fanns redan eller sparningen misslyckades - kolla vilket
      setIsAdded(
        await watchlistService.isInWatchlist(movie.id, movie.media_type),
      );
    }

    setIsSaving(false);
  };

  return { addToWatchlist, isAdded, isSaving };
}
