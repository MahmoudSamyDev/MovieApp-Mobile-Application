/**
 * Search Screen Component
 *
 * This component provides movie search functionality using the TMDB API.
 * It includes real-time search with debouncing, trending data tracking, and result display.
 *
 * Features:
 * - Real-time search with 500ms debounce to prevent excessive API calls
 * - Search query state management with controlled input
 * - Loading states and error handling for better UX
 * - Trending search data tracking via Appwrite
 * - Dynamic result display with search query highlighting
 * - Empty state handling when no search query is entered
 *
 * Search Flow:
 * 1. User types in search bar
 * 2. Component waits 500ms after last keystroke (debouncing)
 * 3. API call is made to search movies
 * 4. Results are displayed in a grid layout
 * 5. Search data is tracked for trending analytics
 *
 * State Management:
 * - searchQuery: Current search input value
 * - movies: Search results from API
 * - loading: Loading state during API calls
 * - error: Error state for failed requests
 *
 * @returns {JSX.Element} Search screen with input and results
 */

import { fetchMovies } from "@/utils/api";
import { updateSearchCounter } from "@/utils/appwrite";
import { useFetch } from "@/utils/hooks";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import Header from "../components/General/Header";
import LogoImg from "../components/General/LogoImg";
import MoviesList from "../components/General/MoviesList";
import SearchBar from "../components/General/SearchBar";

function SearchTap() {
  // Search query state for controlled input
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Custom hook for API data fetching with manual trigger (autoFetch: false)
  const {
    data: movies,
    loading,
    error,
    reset,
    fetchData,
  } = useFetch(() => fetchMovies(searchQuery), false);

  // Debounced search effect - triggers API call 500ms after user stops typing
  useEffect(() => {
    const timeoutID = setTimeout(async function fetchMoviesData() {
      if (searchQuery.trim()) {
        // Trigger search if query is not empty
        await fetchData();
      } else {
        // Clear results if query is empty
        reset();
      }
    }, 500); // 500ms debounce delay

    // Cleanup timeout on dependency change
    return () => clearTimeout(timeoutID);
  }, [searchQuery]);

  // Track search trends in Appwrite database when results are available
  useEffect(() => {
    async function updateTrendingMovies() {
      if (movies.length > 0 && movies?.[0]) {
        // Update search counter for trending analytics
        await updateSearchCounter(searchQuery, movies[0]);
      }
    }

    updateTrendingMovies();
  }, [movies]);

  /**
   * Handle search input changes
   * @param {string} text - The new search query text
   */
  function handleSearchQuery(text: string) {
    setSearchQuery(text);
  }

  /**
   * Handle search submission (currently not implemented)
   * Could be used for additional search actions like navigation
   */
  function handleSearchSubmit() {
    // TODO: Add search submission logic if needed
  }

  return (
    <View className="flex-1 bg-primary">
      {/* Background header component */}
      <Header />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        {/* App logo at the top */}
        <LogoImg />

        {/* Loading state indicator */}
        {loading && (
          <ActivityIndicator
            size="large"
            color="#000ff"
            className="mt-10 self-center"
          />
        )}

        {/* Error state display */}
        {error && (
          <Text className="mt-5 text-red-500 text-center">{error.message}</Text>
        )}

        {/* Main content when not loading and no errors */}
        {!loading && !error && (
          <>
            <View className="mt-5">
              {/* Search input component */}
              <SearchBar
                placeholder="Search for a movie..."
                onEdit={handleSearchQuery}
                value={searchQuery}
                onSubmitEditing={handleSearchSubmit}
              />

              {/* Search results header with query highlighting */}
              {searchQuery.length > 0 && (
                <Text className="text-white text-xl font-bold">
                  Search Results For:{" "}
                  <Text className="text-accent">{searchQuery.trim()}</Text>
                </Text>
              )}
            </View>

            {/* Movie results grid */}
            <MoviesList movies={movies} />
          </>
        )}
      </ScrollView>
    </View>
  );
}

export default SearchTap;
