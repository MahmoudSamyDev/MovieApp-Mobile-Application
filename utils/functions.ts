import { Movie, MovieDetails } from "@/interfaces/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "saved-movies";

export async function getFavoriteMovies(): Promise<Movie[]> {
  try {
    const allFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
    return allFavorites ? JSON.parse(allFavorites) : [];
  } catch (error) {
    console.error("Failed to retrieve favorite movies:", error);
    throw new Error("Failed to retrieve favorite movies");
  }
}

export async function addMovieToFavorites(movie: MovieDetails): Promise<void> {
  try {
    const allFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
    const favorites: MovieDetails[] = allFavorites
      ? JSON.parse(allFavorites)
      : [];

    // Check if movie is already in favorites to avoid duplicates
    const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);
    if (isAlreadyFavorite) {
      throw new Error("Movie is already in favorites");
    }

    favorites.push(movie);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to add movie to favorites:", error);
    throw error; // Re-throw to preserve the original error message
  }
}

export async function removeMovieFromFavorites(movieId: number): Promise<void> {
  try {
    const allFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
    const favorites: Movie[] = allFavorites ? JSON.parse(allFavorites) : [];

    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error("Failed to remove movie from favorites:", error);
    throw new Error("Failed to remove movie from favorites");
  }
}

export async function isMovieInFavorites(movieId: number): Promise<boolean> {
  try {
    const favorites = await getFavoriteMovies();
    return favorites.some((movie) => movie.id === movieId);
  } catch (error) {
    console.error("Failed to check if movie is in favorites:", error);
    return false;
  }
}
