const ACCESS_TOKEN = process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN;

export const fetchRandomMovie = async () => {
  const randomPage = Math.floor(Math.random() * 100) + 1;
  const monetization = "flatrate|buy|rent";
  const url = `https://api.themoviedb.org/3/discover/movie?language=sv-SE&region=SE&watch_region=SE&with_watch_monetization_types=${monetization}&sort_by=popularity.desc&include_adult=false&page=${randomPage}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  if (!response.ok) throw new Error("Kunde inte hämta film");

  const data = await response.json();

  if (Array.isArray(data.results)) {
    // 3. Filtrera bort de som saknar overview
    const filteredMovies = data.results.filter(
      (movie: any) => movie.overview && movie.overview.trim() !== "",
    );

    // 4. Kolla om vi har några filmer KVAR efter filtreringen
    if (filteredMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredMovies.length);
      return filteredMovies[randomIndex];
    }
  }

  throw new Error("Inga filmer med beskrivning hittades på denna sida.");
};
