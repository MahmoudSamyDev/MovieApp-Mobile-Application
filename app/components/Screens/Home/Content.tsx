/**
 * Home Content Component
 *
 * The main content component for the home screen that orchestrates the display of
 * trending movies, latest movies, and search functionality with proper loading states.
 *
 * Features:
 * - Dual data fetching: latest movies from TMDB API and trending from Appwrite
 * - Unified loading state management for multiple data sources
 * - Error handling with user-friendly error messages
 * - Search bar integration with navigation to search screen
 * - Scrollable layout with optimized performance
 * - Logo display for brand consistency
 *
 * Data Sources:
 * - Latest Movies: Fetched from TMDB API via fetchMovies()
 * - Trending Movies: Retrieved from Appwrite database via getTrendingMovies()
 * - Both use the useFetch custom hook for state management
 *
 * Layout Structure:
 * - ScrollView container with vertical scrolling
 * - Logo at the top for branding
 * - Loading indicator when fetching data
 * - Error message display for failed requests
 * - Content sections: Search, Trending, Latest
 *
 * Loading States:
 * - Shows ActivityLoading when either data source is loading
 * - Prevents content rendering until data is available
 * - Handles concurrent loading of multiple data sources
 *
 * Error Handling:
 * - Displays ErrorMessage for any API failures
 * - Graceful degradation when data is unavailable
 * - User-friendly error states
 *
 * Navigation:
 * - Search bar navigates to SearchTap screen
 * - Uses Expo Router for navigation management
 *
 * Performance:
 * - Custom useFetch hook with built-in caching
 * - Optimized ScrollView with proper content sizing
 * - Conditional rendering to avoid unnecessary updates
 *
 * Dependencies:
 * - useFetch hook for data management
 * - API utilities for movie data
 * - Appwrite for trending data
 * - Child components for modular display
 *
 * @returns {JSX.Element} Complete home screen content with loading and error states
 */

import LogoImg from "@/app/components/General/LogoImg";
import { fetchMovies } from "@/utils/api";
import { getTrendingMovies } from "@/utils/appwrite";
import { useFetch } from "@/utils/hooks";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import ActivityLoading from "../../General/ActivityLoading";
import ErrorMessage from "../../General/ErrorMessage";
import SearchBar from "../../General/SearchBar";
import LatestMovies from "./LatestMovies";
import TrendingMovies from "./TrendingMovies";

function Content() {
  const router = useRouter();

  // Fetch latest movies from TMDB API
  const {
    data: latestMovies,
    loading: latestMoviesLoading,
    error,
  } = useFetch(() => fetchMovies());

  // Fetch trending movies from Appwrite database
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(() => getTrendingMovies());

  return (
    <ScrollView
      className="flex-1 px-5"
      showsVerticalScrollIndicator={false} // Hide scroll indicator for cleaner look
      contentContainerStyle={{
        minHeight: "100%", // Ensure full height coverage
        paddingBottom: 10, // Bottom spacing for navigation
      }}
    >
      {/* App logo for brand identity */}
      <LogoImg />

      {/* Show loading indicator when either data source is loading */}
      {(latestMoviesLoading || trendingLoading) && <ActivityLoading />}

      {/* Show error message if any data source fails */}
      {(error || trendingError) && <ErrorMessage />}

      {/* Render content when loading is complete and no errors */}
      {!latestMoviesLoading && !error && (
        <>
          <View className="mt-20">
            {/* Search bar with navigation to search screen */}
            <SearchBar
              placeholder="Search a movie..."
              onPress={() => router.push("/SearchTap")} // Navigate to search
            />

            {/* Trending movies section */}
            <TrendingMovies trendingMovies={trendingMovies ?? []} />

            {/* Latest movies section */}
            <LatestMovies latestMovies={latestMovies} />
          </View>
        </>
      )}
    </ScrollView>
  );
}

export default Content;
