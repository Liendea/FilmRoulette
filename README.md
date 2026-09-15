🎬 Movie Roulette

An interactive mobile app built with React Native and Expo that helps you discover movies and TV shows through a "roulette" concept, or by searching with filters. The app uses the TMDB API to fetch real-time data on movies, TV shows, and streaming services - tailored to whichever region you choose.

## ScreenShots

<div align="center">
<img width="24%" height="2622" alt="Simulator Screenshot - iPhone 17 Pro - 2026-09-15 at 12 49 09" src="https://github.com/user-attachments/assets/701505e8-0f49-4fb4-b452-48353c11ef4d" />
<img width="24%" height="2622" alt="Simulator Screenshot - iPhone 17 Pro - 2026-09-15 at 12 49 44" src="https://github.com/user-attachments/assets/f45bf69d-4cda-4b7c-8e7d-1afcf02d8f80" />
<img width="24%" height="2622" alt="Simulator Screenshot - iPhone 17 Pro - 2026-09-15 at 12 50 20" src="https://github.com/user-attachments/assets/c75d6c87-1e5f-45d0-9d9f-36ab5ae46b1b" />

<br/>
<img width="24%" height="2622" alt="Simulator Screenshot - iPhone 17 Pro - 2026-09-15 at 12 50 11" src="https://github.com/user-attachments/assets/3124257e-969f-471a-881a-e7289e127ba4" />
<img width="24%" height="2622" alt="Simulator Screenshot - iPhone 17 Pro - 2026-09-15 at 12 50 05" src="https://github.com/user-attachments/assets/d6f67f26-6131-4aca-b997-8a57e2253394" />
<img width="24%" height="2622" alt="Simulator Screenshot - iPhone 17 Pro - 2026-09-15 at 12 49 17" src="https://github.com/user-attachments/assets/3fea7d8d-6f13-48c8-821a-2cd66a12c6cc" />

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
