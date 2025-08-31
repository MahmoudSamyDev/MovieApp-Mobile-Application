/**
 * Saved Movies Screen Component
 *
 * This component displays the user's saved/favorite movies stored in AsyncStorage.
 * It provides a clean interface to view and manage the user's personal movie collection.
 *
 * Features:
 * - Displays movies saved to local storage using AsyncStorage
 * - Automatically refreshes when screen is focused (useFocusEffect in Content)
 * - Shows loading states while fetching saved movies
 * - Handles empty states when no movies are saved
 * - Consistent theming with other app screens
 *
 * Layout Structure:
 * - Header: Background image and app branding
 * - Content: Saved movies grid with loading/error/empty states
 *
 * Data Flow:
 * 1. Screen mounts and Content component loads saved movies
 * 2. AsyncStorage is queried for saved movie data
 * 3. Movies are displayed in a grid layout
 * 4. Screen refreshes data when user navigates back (focus effect)
 *
 * Navigation:
 * - Accessible via bottom tab navigation
 * - Users can tap on movies to view details
 * - Details screen allows removing movies from saved list
 *
 * @returns {JSX.Element} Saved movies screen with header and content
 */

import Content from "@/app/components/Screens/SavedMovies/Content";
import { View } from "react-native";
import Header from "../components/General/Header";

export default function SavedTap() {
  return (
    <View className="flex-1 bg-primary">
      {/* Background header with app branding */}
      <Header />

      {/* Content component handles all saved movies logic */}
      <Content />
    </View>
  );
}
