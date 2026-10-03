import { Movie } from "@/types/movietype";
import { SearchFilters } from "@/types/searchfilters";
import { fetchOptions } from "@/api/config";
import { buildDiscoverUrl, normalizeTitle, TMDBTitle } from "@/api/discover";

// Vi slumpar bland de 100 första sidorna (2000 mest populära träffarna) så
// att resultatet håller sig till någorlunda kända titlar.
const MAX_PAGE = 100;
// En sida kan sakna titlar med beskrivning - då provar vi en annan sida.
const MAX_ATTEMPTS = 3;
// Samma kvalitetsgräns som Discover använder, se nedan.
const MIN_VOTES_WITH_RATING = 200;

// Antal sidor per filterkombination. Sparas under sessionen så att bara den
// första slumpningen med ett visst filter behöver ett extra anrop.
const pageCountCache = new Map<string, number>();

type DiscoverPage = { results: TMDBTitle[]; totalPages: number };

async function fetchPage(url: string): Promise<DiscoverPage> {
  const response = await fetch(url, fetchOptions);
  if (!response.ok) throw new Error(`Kunde inte hämta titlar (${response.status})`);

  const data = await response.json();
  return {
    results: Array.isArray(data.results) ? data.results : [],
    totalPages: Math.min(Number(data.total_pages) || 0, MAX_PAGE),
  };
}

// Returnerar en slumpad titel som matchar filtren, eller null om inget
// matchar. Kastar bara vid nätverks-/API-fel.
export const fetchRandomMovie = async (
  filters: SearchFilters,
): Promise<Movie | null> => {
  const type = filters.type ?? "movie";
  // Sorteringen styr inte vilken titel som väljs, bara vilka som hamnar bland
  // de första sidorna - därför alltid popularitet oavsett vad filtret säger.
  const query: SearchFilters = { ...filters, type, sortBy: "popularity.desc" };
  // Ett betygsfilter utan röstgräns släpper igenom titlar med en enda röst.
  const minVoteCount =
    filters.minRating && filters.minRating > 0
      ? MIN_VOTES_WITH_RATING
      : undefined;
  const urlFor = (page: number) =>
    buildDiscoverUrl(query, { page, minVoteCount });

  // Med filter kan det finnas allt från 0 till hundratals sidor. Vi måste
  // veta hur många innan vi slumpar, annars landar vi på sidor som inte finns.
  const cacheKey = urlFor(1);
  let firstPage: DiscoverPage | null = null;
  let totalPages = pageCountCache.get(cacheKey);

  if (totalPages === undefined) {
    firstPage = await fetchPage(cacheKey);
    totalPages = firstPage.totalPages;
    pageCountCache.set(cacheKey, totalPages);
  }

  if (totalPages === 0) return null;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const page = Math.floor(Math.random() * totalPages) + 1;
    const { results } =
      page === 1 && firstPage ? firstPage : await fetchPage(urlFor(page));

    const candidates = results.filter(
      (item) => item.overview && item.overview.trim() !== "",
    );

    if (candidates.length > 0) {
      const picked = candidates[Math.floor(Math.random() * candidates.length)];
      return normalizeTitle(picked, type) as unknown as Movie;
    }
  }

  return null;
};
