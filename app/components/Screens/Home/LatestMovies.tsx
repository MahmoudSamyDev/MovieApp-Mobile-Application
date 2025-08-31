/**
 * Latest Movies Section Component
 *
 * Displays the latest movies from TMDB API in a grid layout with section header.
 * Simple wrapper component that provides consistent section styling and delegates
 * movie display to the reusable MoviesList component.
 *
 * Features:
 * - Section header with "Latest Movies" title
 * - Grid layout of latest movies via MoviesList component
 * - Consistent typography and spacing with other home sections
 * - Simple, focused component with single responsibility
 *
 * Props:
 * @param {Movie[]} latestMovies - Array of latest movie objects from TMDB API
 *
 * Data Source:
 * - Movies fetched from TMDB "now_playing" or similar endpoint
 * - Uses standard Movie interface for type safety
 * - Data passed down from parent Content component
 *
 * Layout:
 * - Section title with consistent styling (white text, bold)
 * - Standard margin and spacing between title and content
 * - Delegates grid layout to MoviesList component
 * - Maintains visual consistency with TrendingMovies section
 *
 * Component Architecture:
 * - Thin wrapper around MoviesList for specific use case
 * - Separation of concerns: title vs. content display
 * - Reusable pattern for sectioned movie displays
 * - Consistent with other home screen sections
 *
 * Visual Design:
 * - White text title on dark background
 * - Consistent spacing (mt-5 mb-3) with trending section
 * - Bold text for section hierarchy
 * - Clean, minimal section header
 *
 * Dependencies:
 * - MoviesList component for grid display
 * - Movie interface for type safety
 * - Consistent with app's section-based layout pattern
 *
 * @returns {JSX.Element} Latest movies section with title and grid
 */

import { Movie } from "@/interfaces/interfaces";
import { Text } from "react-native";
import MoviesList from "../../General/MoviesList";

function LatestMovies({ latestMovies }: { latestMovies: Movie[] }) {
  return (
    <>
      {/* Section title for latest movies */}
      <Text className="text-lg text-white text-bold mt-5 mb-3">
        Latest Movies
      </Text>

      {/* Grid display of latest movies */}
      <MoviesList movies={latestMovies} />
    </>
  );
}

export default LatestMovies;
