/**
 * Home Screen Component (Index)
 *
 * This is the main landing screen of the application that serves as the home page.
 * It displays trending movies, latest movies, and provides search functionality.
 *
 * Features:
 * - Displays background header with app branding
 * - Shows main content including movie lists and search
 * - Uses primary background color for consistent theming
 * - Acts as the entry point for the main tab navigation
 *
 * Layout Structure:
 * - Header: Background image and branding
 * - Content: Movie lists, search bar, and trending content
 *
 * Navigation:
 * - This is the default route (index) for the tabs navigation
 * - Users can navigate to individual movies from here
 * - Search functionality leads to SearchTap screen
 *
 * @returns {JSX.Element} The home screen with header and content
 */

import { View } from "react-native";
import Header from "../components/General/Header";
import Content from "../components/Screens/Home/Content";

export default function Index() {
  return (
    <View className="flex-1 bg-primary">
      {/* Background header with app branding */}
      <Header />

      {/* Main content area with movies and search */}
      <Content />
    </View>
  );
}
