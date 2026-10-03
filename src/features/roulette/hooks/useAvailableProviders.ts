import { useEffect, useState } from "react";
import { WatchProvider } from "@/types/watchProvider";
import { fetchProviders } from "@/features/discover/api/fetchMetadata";
import { useRegion } from "@/features/country/context/RegionContext";

// Tjänsterna som finns i vald region för film eller serie, sorterade så att
// de största hamnar först. Används som innehåll i ProviderFilterDropdown.
export function useAvailableProviders(type: "movie" | "tv") {
  const [providers, setProviders] = useState<WatchProvider[]>([]);
  const { region } = useRegion();

  useEffect(() => {
    let cancelled = false;

    fetchProviders(type, region.code).then((data) => {
      if (!cancelled) setProviders(data);
    });

    return () => {
      cancelled = true;
    };
  }, [type, region.code]);

  return providers;
}
