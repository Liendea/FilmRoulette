🎬 Movie Roulette

En interaktiv mobilapplikation byggd med React Native och Expo som hjälper användare att upptäcka filmer och serier genom ett "roulette"-koncept eller sökning med filter. Appen använder TMDB API för att hämta realtidsdata om filmer, serier och streamingtjänster - anpassat efter valfri region.

## ScreenShots

<div align="center">
    <img src="https://github.com/user-attachments/assets/3467d4d0-f6f2-4270-875f-b19a277d8d7c" width="24%" />
    <img src="https://github.com/user-attachments/assets/b2af1f35-86a1-45e5-b1a3-466d7e657923" width="24%" />
  <img src="https://github.com/user-attachments/assets/ed19328f-e474-4345-939e-94498777caad" width="24%" />
<br/>


  <img src="https://github.com/user-attachments/assets/4382b4b6-543c-4cee-b472-ec34c7cfec73" width="24%" />
    <img src="https://github.com/user-attachments/assets/85fa288a-3afa-4ff1-964d-990ef698ff48" width="24%" />
  <img src="https://github.com/user-attachments/assets/18a25613-6a71-41b8-8a08-e4fc13952b38" width="24%" />
</div>





Funktioner:

    Roulette (Slump): Låt appen slumpa fram en film att titta på ikväll, filtrerat på vad som faktiskt går att streama/hyra/köpa i din valda region.

    Sök & Upptäck: Sök filmer eller TV-serier och filtrera på genre, betyg, innehållstyp och streamingtjänst.

    Sortering: Sortera sökresultat i Upptäck efter popularitet eller betyg (stigande/fallande).

    Regionval: Välj vilket land sökningar ska utgå från (flaggikon i appens hörn). Styr både vilka titlar som visas och vilka streamingtjänster som räknas som tillgängliga. Måste väljas innan första slumpningen, men kan bytas när som helst efteråt.

    Watch Providers: Se direkt var en film eller serie går att streama, hyra eller köpa - alltid live-hämtat mot vald region, inte en ögonblicksbild.

    Min lista (Watchlist): Spara filmer/serier för att titta senare. Går att filtrera på vilken region titeln sparades ifrån (praktiskt om man t.ex. reser och byter region), utöver ett "Show all"-läge.

    Dynamisk Detaljsida: Djupgående information om varje film/serie med cover och sammanfattning.

    Multi-Select Genres: Sökbart gränssnitt för att välja flera genrer samtidigt.

    Custom Hooks: Effektiv datahantering med specialbyggda hooks för API-anrop.


🛠 TechStack:

    Framework: Expo (React Native)

    Navigation: Expo Router (Filbaserad routing)

    Ikoner: Phosphor React Native

    UI Komponenter: react-native-element-dropdown för avancerade filter, react-native-safe-area-context för layout kring notch/statusbar

    Lagring: AsyncStorage (watchlist, vald region)

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
    EXPO_PUBLIC_TMDB_ACCESS_TOKEN=din_access_token_här

    Starta projektet:
    Bash

    npx expo start


📂 Projektstruktur (i urval)

    /app - Innehåller alla routes och layouter (Expo Router).

    /api - Konfiguration och fetch-logik för TMDB.

    /features - Specifik affärslogik per del av appen:
        /roulette - Slumpning, resultatvy och "lägg till i lista".
        /discover - Sök/filtrera på filmer och serier, sortering.
        /watchlist - Sparade titlar, regionfilter, live watch providers.
        /country - Regionval (dropdown, tvingande förstagångsval, context).

    /sharedComponents - Återanvändbara UI-komponenter som knappar och spacers.

    /types - TypeScript-definitioner för filmer, serier, filter och providers.

Coming soon to Appstore och Andriod store!




    Skapad av: Linda Bengtsson
    Kontakt: bengtsson-linda@outlook.com
