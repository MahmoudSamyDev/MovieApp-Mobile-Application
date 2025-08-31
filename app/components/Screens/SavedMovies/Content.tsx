import LogoImg from "@/app/components/General/LogoImg";
import MoviesList from "@/app/components/General/MoviesList";
import { Movie } from "@/interfaces/interfaces";
import { getFavoriteMovies } from "@/utils/functions";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

function Content() {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFavoriteMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const movies = await getFavoriteMovies();
      setSavedMovies(movies);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load saved movies"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Reload favorites when the screen is focused (user navigates back to this tab)
  useFocusEffect(
    useCallback(() => {
      loadFavoriteMovies();
    }, [loadFavoriteMovies])
  );

  return (
    <ScrollView
      className="flex-1 px-5"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        minHeight: "100%",
        paddingBottom: 10,
      }}
    >
      <LogoImg />

      {loading && (
        <ActivityIndicator
          size="large"
          color="#AB8BFF"
          className="mt-10 self-center"
        />
      )}

      {error && <Text className="mt-5 text-red-500 text-center">{error}</Text>}

      {!loading && !error && (
        <View className="mt-20">
          <Text className="text-lg text-white text-bold mt-5 mb-3">
            Saved Movies ({savedMovies.length})
          </Text>
          {savedMovies.length > 0 ? (
            <MoviesList movies={savedMovies} />
          ) : (
            <Text className="text-center text-light-200 mt-10">
              No saved movies yet. Start adding some favorites!
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

export default Content;
