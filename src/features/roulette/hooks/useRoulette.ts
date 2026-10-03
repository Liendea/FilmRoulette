import { Dispatch, SetStateAction, useState } from "react";
import { Movie } from "@/types/movietype";
import { SearchFilters } from "@/types/searchfilters";
import { CountryWatchProviders } from "@/types/watchProvider";
import { fetchRandomMovie } from "../api/fetchRandomMovie";
import { fetchWatchProviders } from "../api/fetchWatchProviders";
import { useRegion } from "@/features/country/context/RegionContext";

export type MonetizationTypes = NonNullable<SearchFilters["monetizationTypes"]>;

// Alla tre valda = "alla": slumpa bland allt som går att se i regionen,
// oavsett om det är streaming, hyra eller köp.
const ALL_MONETIZATION: MonetizationTypes = ["flatrate", "rent", "buy"];

export function useRoulette() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [watchProvider, setWatchProvider] =
    useState<CountryWatchProviders | null>(null);
  // Shuffle-filter: hur man vill se titeln och på vilka tjänster.
  // Formen matchar props i MonetizationFilter och ProviderFilterDropdown.
  const [monetizationTypes, setMonetizationTypesState] =
    useState<MonetizationTypes>(ALL_MONETIZATION);
  // Tom lista = alla tjänster.
  const [selectedProviders, setSelectedProvidersState] = useState<number[]>([]);
  // true när senaste slumpningen inte hittade någon titel som matchar filtren.
  const [noResults, setNoResults] = useState(false);
  const { region } = useRegion();

  // Tjänsterna skiljer sig mellan länder. Byter man region nollställs valet,
  // annars filtrerar man på tjänster som inte finns där och får inga träffar.
  const [prevRegion, setPrevRegion] = useState(region.code);
  if (region.code !== prevRegion) {
    setPrevRegion(region.code);
    setSelectedProvidersState([]);
    setNoResults(false);
  }

  // Ändras filtren gäller inte längre "inga träffar" från förra slumpningen.
  const setMonetizationTypes: Dispatch<SetStateAction<MonetizationTypes>> = (
    action,
  ) => {
    setNoResults(false);
    setMonetizationTypesState(action);
  };

  const setSelectedProviders = (ids: number[]) => {
    setNoResults(false);
    setSelectedProvidersState(ids);
  };

  const hasActiveFilters =
    selectedProviders.length > 0 ||
    monetizationTypes.length < ALL_MONETIZATION.length;

  const resetFilters = () => {
    setNoResults(false);
    setMonetizationTypesState(ALL_MONETIZATION);
    setSelectedProvidersState([]);
  };

  const handleShuffle = async (type: "movie" | "tv" = "movie") => {
    setLoading(true);
    setNoResults(false);
    try {
      const result = await fetchRandomMovie({
        type,
        watchRegion: region.code,
        monetizationTypes: monetizationTypes.length
          ? monetizationTypes
          : ALL_MONETIZATION,
        providers: selectedProviders,
      });

      if (!result) {
        setNoResults(true);
        return;
      }

      setMovie(result);

      if (result.id) {
        const providers = await fetchWatchProviders(
          result.id,
          type,
          region.code,
        );
        setWatchProvider(providers);
      }
    } catch (error) {
      console.error("Något gick fel vid slumpningen:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setMovie(null);
    setWatchProvider(null);
  };

  return {
    movie,
    loading,
    watchProvider,
    monetizationTypes,
    setMonetizationTypes,
    selectedProviders,
    setSelectedProviders,
    hasActiveFilters,
    resetFilters,
    noResults,
    handleShuffle,
    closeModal,
  };
}
