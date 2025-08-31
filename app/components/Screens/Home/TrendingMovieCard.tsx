/**
 * Trending Movie Card Component
 *
 * A specialized movie card for trending movies featuring a unique ranking number overlay
 * with gradient masking effect. Displays trending movies with visual priority indicators.
 *
 * Features:
 * - Movie poster with TMDB image integration
 * - Ranking number overlay with gradient mask effect
 * - Navigable link to detailed movie view
 * - Star rating indicator (simplified for trending)
 * - Compact layout optimized for horizontal scrolling
 * - Title truncation for consistent card sizing
 *
 * Props (TrendingCardProps):
 * @param {TrendingMovie} movie - Trending movie object with movie_id, title, poster_url
 * @param {number} index - Array index used for ranking display (0-based, displays as 1-based)
 *
 * Visual Features:
 * - Large ranking number (1, 2, 3, etc.) with gradient mask
 * - Positioned absolutely over the bottom-left of poster
 * - MaskedView creates gradient text effect for ranking
 * - Star icon for rating indication
 * - Consistent sizing (w-32) for horizontal scroll
 *
 * Layout:
 * - Fixed width (w-32/128px) for horizontal list consistency
 * - Poster image with rounded corners and cover resize
 * - Ranking overlay positioned absolutely
 * - Title and metadata below poster
 * - Left padding for proper spacing in horizontal list
 *
 * Navigation:
 * - Links to /movie/[movie_id] for detailed view
 * - Uses Expo Router Link with TouchableOpacity
 * - Provides tactile feedback on press
 *
 * Ranking Display:
 * - Uses MaskedView for gradient text effect
 * - Index + 1 converts 0-based to 1-based ranking
 * - Large, bold text (text-6xl) for prominence
 * - Gradient background applied through mask
 *
 * Dependencies:
 * - MaskedView for gradient text effects
 * - TrendingCardProps interface for type safety
 * - TMDB image base URL for poster display
 * - Ranking gradient image for mask effect
 *
 * @returns {JSX.Element} Trending movie card with ranking overlay
 */

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { TrendingCardProps } from "@/interfaces/interfaces";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

// TMDB image base URL for poster images
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function TrendingMovieCard({ movie, index }: TrendingCardProps) {
  const { title, poster_url, movie_id } = movie;

  return (
    <Link href={`/movie/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        {/* Movie poster image */}
        <Image
          source={{
            uri: poster_url ? `${IMAGE_BASE_URL}${poster_url}` : undefined,
          }}
          className="w-full h-48 rounded-lg"
          resizeMode="cover" // Maintain aspect ratio while filling container
        />

        {/* Ranking number overlay with gradient mask effect */}
        <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-4">
          <MaskedView
            maskElement={
              <>
                {/* Large ranking number (1-based from 0-based index) */}
                <Text className="text-white font-bold text-6xl">
                  {index + 1}
                </Text>
                {/* Gradient mask image for text effect */}
                <Image
                  source={images.rankingGradient}
                  className="size-14"
                  resizeMode="cover"
                />
              </>
            }
          >
            {/* White background masked by the text and gradient */}
            <View className="bg-white h-full w-full rounded-4" />
          </MaskedView>
        </View>

        {/* Movie title with truncation */}
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        {/* Rating and metadata section */}
        <View className="flex-row justify-start items-center gap-x-1">
          {/* Star rating indicator */}
          <Image source={icons.star} className="size-4" />

          {/* Movie type indicator */}
          <View className="flex-row justify-between items-center">
            <Text className="text-xs text-light-300 mt-1 font-medium uppercase">
              Movie
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default TrendingMovieCard;
