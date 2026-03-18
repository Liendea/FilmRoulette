🎬 Movie Roulette

En interaktiv mobilapplikation byggd med React Native och Expo som hjälper användare att upptäcka filmer genom ett "roulette"-koncept eller söka på filmer med hjälp av olika filters. Appen använder TMDB API för att hämta realtidsdata om filmer, serier och streamingtjänster.

Funktioner:

    Smart Filtrering: Filtrera filmer baserat på genre, betyg (TMDB) och innehållstyp (Film/Serie).

    Watch Providers: Se direkt var filmen går att streama i Sverige (Netflix, HBO, Disney+, etc.).

    Dynamisk Detaljsida: Djupgående information om varje film med snygga covers och sammanfattningar.

    Multi-Select Genres: Sökbart gränssnitt för att välja flera kategorier samtidigt.

    Custom Hooks: Effektiv datahantering med specialbyggda hooks för API-anrop.

🛠 TechStack:

    Framework: Expo (React Native)

    Navigation: Expo Router (Filbaserad routing)

    Ikoner: Phosphor React Native

    UI Komponenter: react-native-element-dropdown för avancerade filter.

    API: The Movie Database (TMDB)

    Språk: TypeScript

📦 Installation

    Klona repot:
    Bash

    git clone https://github.com/ditt-användarnamn/movie-roulette.git

    Installera beroenden:
    Bash

    npm install
    # eller
    npx expo install

    Skapa en .env fil (eller uppdatera din config) med din TMDB API-nyckel:
    Code snippet

    EXPO_PUBLIC_TMDB_API_KEY=din_nyckel_här

    Starta projektet:
    Bash

    npx expo start

📂 Projektstruktur (i urval)

    /app - Innehåller alla routes och layouter (Expo Router).

    /api - Konfiguration och fetch-logik för TMDB.

    /features - Specifik affärslogik (t.ex. /roulette för filter och kort).

    /sharedComponents - Återanvändbara UI-komponenter som knappar och spacers.

    /types - TypeScript-definitioner för filmer och providers.

Coming soon to Appstore och Andriod store!

    Skapad av: Linda Bengtsson
    Kontakt: bengtsson-linda@outlook.com
