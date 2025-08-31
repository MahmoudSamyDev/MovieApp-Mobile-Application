/**
 * Trending Movies Section Component
 *
 * Displays a horizontal scrollable list of trending movies based on user search activity.
 * Shows movies that are currently popular among users with smooth horizontal scrolling.
 *
 * Features:
 * - Horizontal scrollable list for space-efficient display
 * - Section header with "Trending Movies" title
 * - Custom trending movie cards with special styling
 * - Hidden scroll indicators for clean appearance
 * - Unique key generation for list performance
 *
 * Props:
 * @param {TrendingMovie[]} trendingMovies - Array of trending movie objects from Appwrite
 *
 * Data Structure:
 * - Uses TrendingMovie interface (different from regular Movie)
 * - Contains movie_id, search_count, and movie details
 * - Data sourced from Appwrite tracking user searches
 *
 * Layout:
 * - Section title with consistent typography
 * - Horizontal FlatList for movie cards
 * - No item separators (commented out for tighter spacing)
 * - Optimized for mobile horizontal scrolling
 *
 * Performance:
 * - FlatList for efficient rendering of large lists
 * - Unique key extraction using movie_id and random component
 * - Hidden scroll indicators to reduce visual clutter
 * - Horizontal scrolling optimized for mobile touch
 *
 * Visual Design:
 * - White text title on dark background
 * - Consistent spacing with other home sections
 * - Smooth horizontal scrolling experience
 * - Custom trending cards with index-based styling
 *
 * Dependencies:
 * - TrendingMovieCard for individual movie display
 * - TrendingMovie interface for type safety
 * - Data from Appwrite trending movies service
 *
 * @returns {JSX.Element} Horizontal scrolling trending movies section
 */

import { TrendingMovie } from "@/interfaces/interfaces";
import { FlatList, Text } from "react-native";
import TrendingMovieCard from "./TrendingMovieCard";

function TrendingMovies({
  trendingMovies,
}: {
  trendingMovies: TrendingMovie[];
}) {
  return (
    <>
      {/* Section title for trending movies */}
      <Text className="text-lg text-white text-bold mt-5 mb-3">
        Trending Movies
      </Text>

      {/* Horizontal scrollable list of trending movies */}
      <FlatList
        horizontal // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hide scroll indicator
        // ItemSeparatorComponent={() => <View className="w-4" />} // Spacing between items (disabled)
        data={trendingMovies}
        renderItem={({ item, index }) => (
          <TrendingMovieCard movie={item} index={index} /> // Custom trending card with index
        )}
        keyExtractor={
          (item) => Math.random().toString() + item.movie_id.toString() // Unique key for performance
        }
      />
    </>
  );
}

export default TrendingMovies;
