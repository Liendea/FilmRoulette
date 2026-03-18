🎬 Movie Roulette

En interaktiv mobilapplikation byggd med React Native och Expo som hjälper användare att upptäcka filmer genom ett "roulette"-koncept eller söka på filmer med hjälp av olika filters. Appen använder TMDB API för att hämta realtidsdata om filmer, serier och streamingtjänster.

## ScreenShots

<p float="left">
  <img src="https://github.com/user-attachments/assets/18a25613-6a71-41b8-8a08-e4fc13952b38" width="24%" />
  <img src="https://github.com/user-attachments/assets/85fa288a-3afa-4ff1-964d-990ef698ff48" width="24%" />
  <img src="https://github.com/user-attachments/assets/f17376ec-079c-4aad-aef7-4713eed78597" width="24%" />
  <img src="https://github.com/user-attachments/assets/4382b4b6-543c-4cee-b472-ec34c7cfec73" width="24%" />
</p>
<p float="left">
  <img src="https://github.com/user-attachments/assets/ed19328f-e474-4345-939e-94498777caad" width="24%" />
  <img src="https://github.com/user-attachments/assets/b2af1f35-86a1-45e5-b1a3-466d7e657923" width="24%" />
  <img src="https://github.com/user-attachments/assets/3467d4d0-f6f2-4270-875f-b19a277d8d7c" width="24%" />
</p>





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
