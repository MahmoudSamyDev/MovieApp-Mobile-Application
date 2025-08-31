/**
 * Movie Card Component
 *
 * A reusable card component for displaying individual movie information in grid layouts.
 * Features movie poster, title, rating, and year with navigation to detailed view.
 *
 * Features:
 * - Movie poster image with fallback handling
 * - Movie title with text truncation
 * - Star rating display (converted from 0-10 to 0-5 scale)
 * - Release year extraction and display
 * - Navigable link to detailed movie view
 * - Responsive design for grid layouts
 *
 * Props (extends Movie interface):
 * @param {number} id - Movie ID for navigation routing
 * @param {string} title - Movie title for display
 * @param {string} poster_path - Poster image path from TMDB
 * @param {number} vote_average - Movie rating (0-10 scale from TMDB)
 * @param {string} release_date - Release date in YYYY-MM-DD format
 *
 * Layout:
 * - 30% width for 3-column grid compatibility
 * - Fixed height poster with rounded corners
 * - Compact info section with rating and year
 * - Consistent spacing and typography
 *
 * Navigation:
 * - Uses Expo Router Link for navigation
 * - Routes to /movie/[id] for detailed view
 * - TouchableOpacity for better press feedback
 *
 * Data Processing:
 * - Converts TMDB 10-point rating to 5-star display
 * - Extracts year from full release date
 * - Handles missing poster images gracefully
 *
 * Dependencies:
 * - Movie interface for type safety
 * - TMDB image base URL for poster display
 * - Star icon for rating visualization
 *
 * @returns {JSX.Element} Interactive movie card with navigation
 */

import { IMAGE_BASE_URL } from "@/constants/data";
import { icons } from "@/constants/icons";
import { Movie } from "@/interfaces/interfaces";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

function MovieCard({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
}: Movie) {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        {/* Movie poster with TMDB image URL construction */}
        <Image
          source={{
            uri: poster_path ? `${IMAGE_BASE_URL}${poster_path}` : undefined,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover" // Maintain aspect ratio while filling container
        />

        {/* Movie title with truncation for long titles */}
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        {/* Rating and metadata section */}
        <View className="flex-row justify-start items-center gap-x-1">
          {/* Star rating display */}
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)}{" "}
            {/* Convert 10-point to 5-star scale */}
          </Text>

          {/* Year and type information */}
          <View className="flex-row justify-between items-center">
            <Text className="text-xs text-light-300 mt-1 font-medium">
              {release_date?.split("-")[0]} {/* Extract year from date */}
            </Text>
            <Text className="text-xs text-light-300 mt-1 font-medium uppercase">
              Movie
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default MovieCard;
