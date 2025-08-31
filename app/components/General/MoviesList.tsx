/**
 * Movies List Component
 *
 * A grid-based display component for rendering collections of movies in a 3-column layout.
 * Handles empty states and provides consistent movie card rendering across the app.
 *
 * Features:
 * - 3-column grid layout for optimal mobile viewing
 * - Empty state handling with user-friendly message
 * - Consistent spacing and styling across movie cards
 * - Optimized for performance with FlatList
 * - Disabled scrolling for use within parent scroll containers
 *
 * Props:
 * @param {Movie[]} movies - Array of movie objects to display
 *
 * Layout:
 * - 3 columns with 20px gap between items
 * - Flex-start alignment for natural positioning
 * - Bottom padding to account for navigation bar
 * - Margin and spacing optimized for mobile screens
 *
 * Empty State:
 * - Centered message when no movies are available
 * - Consistent styling with app theme
 * - User-friendly "No movies found" text
 *
 * Performance:
 * - Uses FlatList for efficient rendering of large lists
 * - Unique key generation for each movie item
 * - Disabled internal scrolling to work with parent containers
 *
 * Dependencies:
 * - MovieCard component for individual movie rendering
 * - Movie interface from interfaces for type safety
 *
 * @returns {JSX.Element} Grid layout of movie cards or empty state message
 */

import { Movie } from "@/interfaces/interfaces";
import { FlatList, Text, View } from "react-native";
import MovieCard from "./MovieCard";

function MoviesList({ movies }: { movies: Movie[] }) {
  // Handle empty state with user-friendly message
  if (!movies || movies.length === 0) {
    return (
      <View className="items-center justify-center mt-10">
        <Text className="text-sm text-white">No movies found.</Text>
      </View>
    );
  }

  // Render 3-column grid of movie cards
  return (
    <FlatList
      data={movies}
      numColumns={3} // 3-column grid layout for mobile optimization
      columnWrapperStyle={{
        justifyContent: "flex-start", // Natural left alignment
        gap: 20, // 20px spacing between columns
        paddingRight: 5, // Small right padding for edge spacing
        marginBottom: 10, // Vertical spacing between rows
      }}
      className="mt-2 pb-32" // Top margin and bottom padding for navigation
      scrollEnabled={false} // Disable internal scrolling for parent container use
      renderItem={({ item }) => <MovieCard {...item} />} // Render individual movie cards
      keyExtractor={(item) => Math.random().toString() + item.id.toString()} // Unique key generation
    />
  );
}

export default MoviesList;
