/**
 * Single Movie Details Screen Component
 *
 * This component displays comprehensive details about a specific movie.
 * It fetches movie data from TMDB API and provides functionality to save/remove from favorites.
 *
 * Features:
 * - Dynamic routing using movieId parameter from URL
 * - Fetches detailed movie information from TMDB API
 * - Save/Remove movie to/from local favorites using AsyncStorage
 * - Visual feedback for favorite status with different icons and colors
 * - Loading states and error handling
 * - Full-screen movie poster display
 * - Detailed movie information including budget, revenue, genres, etc.
 * - Rating display with vote count
 * - Custom back navigation button
 *
 * Data Displayed:
 * - Movie poster (full-width, 550px height)
 * - Title and release year
 * - Runtime information
 * - Rating (vote average) with vote count
 * - Overview/description
 * - Genres (comma-separated)
 * - Budget and revenue (in millions)
 * - Production companies
 *
 * State Management:
 * - movie: Detailed movie data from API
 * - loading: Loading state for API fetch
 * - isMovieSaved: Boolean indicating if movie is in favorites
 * - isSaveLoading: Loading state for save/remove operations
 *
 * User Interactions:
 * - Toggle favorite status (save/remove)
 * - Navigate back to previous screen
 * - Scroll through movie details
 *
 * @returns {JSX.Element} Movie details screen with full information
 */

import ActivityLoading from "@/app/components/General/ActivityLoading";
import MovieInfo from "@/app/components/Screens/SingleMovie/MovieInfo";
import { IMAGE_BASE_URL } from "@/constants/data";
import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/utils/api";
import {
  addMovieToFavorites,
  isMovieInFavorites,
  removeMovieFromFavorites,
} from "@/utils/functions";
import { useFetch } from "@/utils/hooks";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

function SingleMovieDetails() {
  const router = useRouter();
  // Extract movieId from URL parameters
  const { movieId } = useLocalSearchParams();

  // Fetch movie details from TMDB API
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(movieId.toString())
  );

  // State for managing favorite status and loading
  const [isMovieSaved, setIsMovieSaved] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  /**
   * Check if the current movie is saved in favorites
   * Called when component mounts or screen is focused
   */
  const checkIfMovieIsSaved = useCallback(async () => {
    try {
      const saved = await isMovieInFavorites(Number(movieId));
      setIsMovieSaved(saved);
    } catch (error) {
      console.error("Error checking if movie is saved:", error);
    }
  }, [movieId]);

  // Check favorite status when screen is focused (e.g., returning from other screens)
  useFocusEffect(
    useCallback(() => {
      checkIfMovieIsSaved();
    }, [checkIfMovieIsSaved])
  );

  /**
   * Handle toggling movie favorite status
   * Adds to favorites if not saved, removes if already saved
   */
  const handleToggleFavorite = async () => {
    if (!movie) return;

    try {
      setIsSaveLoading(true);
      if (isMovieSaved) {
        // Remove from favorites
        await removeMovieFromFavorites(movie.id);
        setIsMovieSaved(false);
      } else {
        // Add to favorites
        await addMovieToFavorites(movie);
        setIsMovieSaved(true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      // TODO: Show user-friendly error message
    } finally {
      setIsSaveLoading(false);
    }
  };

  // Show loading screen while fetching movie data
  if (loading) return <ActivityLoading />;

  return (
    <View className="flex bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Full-width movie poster */}
        <View>
          <Image
            source={{ uri: `${IMAGE_BASE_URL}${movie?.poster_path}` }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>

        {/* Movie details section */}
        <View className="flex-col items-start justify-center mt-5 px-5">
          {/* Title, year, runtime, and favorite button */}
          <View className="flex flex-row justify-between items-center w-full">
            <View>
              {/* Movie title */}
              <Text className="text-white text-xl font-bold">
                {movie?.title}
              </Text>

              {/* Release year and runtime */}
              <View className="flex-row gap-x-1 items-center mt-2">
                <Text className="text-light-200 text-sm">
                  {movie?.release_date?.split("-")[0]}
                </Text>
                <Text className="text-light-200 text-sm">
                  {movie?.runtime}m
                </Text>
                <Text className="text-light-300">{movie?.runtime} min</Text>
              </View>
            </View>

            {/* Save/Remove favorite button */}
            {movie && (
              <TouchableOpacity
                onPress={handleToggleFavorite}
                disabled={isSaveLoading}
                className={`${isSaveLoading ? "opacity-50" : ""}`}
              >
                <Image
                  source={isMovieSaved ? icons.star : icons.save}
                  className="size-7"
                  tintColor={isMovieSaved ? "#AB8BFF" : "#A8B5DB"}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Rating and vote count */}
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              {movie?.vote_count} Votes
            </Text>
          </View>

          {/* Movie overview */}
          <MovieInfo label="Overview" value={movie?.overview ?? "N/A"} />

          {/* Genres list */}
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((genre) => genre.name).join("-") ?? "N/A"}
          />

          {/* Budget and revenue (side by side) */}
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000}million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${(movie?.revenue ?? 0) / 1_000_000}million`}
            />
          </View>

          {/* Production companies */}
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                ?.map((company) => company.name)
                .join(" - ") ?? "N/A"
            }
          />
        </View>
      </ScrollView>

      {/* Fixed bottom navigation button */}
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">
          Back to Movies
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default SingleMovieDetails;
