🎬 Movie Roulette

An interactive mobile app built with React Native and Expo that helps you discover movies and TV shows through a "roulette" concept, or by searching with filters. The app uses the TMDB API to fetch real-time data on movies, TV shows, and streaming services - tailored to whichever region you choose.

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





Features:

    Roulette (Shuffle): Choose whether you want a movie or a TV show, then let the app shuffle a random title, filtered to what's actually available to stream/rent/buy in your selected region.

    Search & Discover: Search movies or TV shows and filter by genre, rating, content type, and streaming service.

    Sorting: Sort search results in Discover by popularity or rating (ascending/descending).

    Region selection: Choose which country searches should be based on (flag icon in the corner of the app). Controls both which titles show up and which streaming services count as available. Must be chosen before your first shuffle, but can be changed at any time afterwards.

    Watch Providers: See exactly where a movie or show is available to stream, rent, or buy - always fetched live against your selected region rather than a snapshot from when it was saved.

    My List (Watchlist): Save movies/shows to watch later. If you've saved titles from more than one region, a region filter appears automatically so you can see what you saved from each one - alongside a "Show all" view. With only one region saved (the default case), the filter stays hidden to avoid clutter.

    Dynamic Detail Screen: In-depth information about each movie/show with cover art and summary.

    Multi-Select Genres: Searchable interface for selecting multiple genres at once.

    Custom Hooks: Efficient data handling with purpose-built hooks for API calls.

    Blurred Tab Bar: The bottom navigation uses a frosted-glass blur effect behind the icons so they stay clearly visible over any content.


🛠 TechStack:

    Framework: Expo (React Native)

    Navigation: Expo Router (file-based routing)

    Icons: Phosphor React Native

    UI Components: react-native-element-dropdown for advanced filters, react-native-safe-area-context for layout around the notch/status bar, expo-blur for the frosted tab bar

    Storage: AsyncStorage (watchlist, selected region)

    API: The Movie Database (TMDB)

    Language: TypeScript
    

📦 Installation

    Clone the repo:
    Bash

    git clone https://github.com/your-username/movie-roulette.git

    Install dependencies:
    Bash

    npm install
    # or
    npx expo install

    Create a .env file (or update your config) with your TMDB API key:
    Code snippet

    EXPO_PUBLIC_TMDB_API_KEY=your_key_here
    EXPO_PUBLIC_TMDB_ACCESS_TOKEN=your_access_token_here

    Start the project:
    Bash

    npx expo start


📂 Project Structure (selected)

    /app - All routes and layouts (Expo Router).

    /api - Configuration and fetch logic for TMDB.

    /features - Business logic split by app area:
        /roulette - Shuffle (movie/TV toggle), result view and "add to list".
        /discover - Search/filter movies and TV shows, sorting.
        /watchlist - Saved titles, region filter, live watch providers.
        /country - Region selection (dropdown, forced first-run choice, context).

    /sharedComponents - Reusable UI components like buttons, spacers, and the tab bar.

    /types - TypeScript definitions for movies, shows, filters, and providers.

Coming soon to the App Store and Google Play!




    Made by: Linda Bengtsson
    Contact: bengtsson-linda@outlook.com
