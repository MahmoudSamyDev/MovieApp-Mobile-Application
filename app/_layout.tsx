/**
 * Root Layout Component
 *
 * This is the main layout component that wraps the entire application.
 * It defines the navigation structure using Expo Router's Stack navigator.
 *
 * Features:
 * - Hides the status bar for a full-screen experience
 * - Sets up stack navigation for the app
 * - Configures two main routes: tabs layout and movie details
 * - Imports global CSS styles for the app
 *
 * Navigation Structure:
 * - (tabs): Main tab-based navigation (Home, Search, Saved, Profile)
 * - movie/[movieId]: Dynamic route for individual movie details
 *
 * @returns {JSX.Element} The root layout with stack navigation
 */

import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "./global.css";

export default function RootLayout() {
  return (
    <>
      {/* Hide status bar for immersive full-screen experience */}
      <StatusBar hidden={true} />

      {/* Main navigation stack */}
      <Stack>
        {/* Tab-based navigation screen (Home, Search, Saved, Profile) */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false, // Hide header for custom tab bar
          }}
        />

        {/* Dynamic movie details screen */}
        <Stack.Screen
          name="movie/[movieId]"
          options={{
            headerShown: false, // Hide header for custom back button
          }}
        />
      </Stack>
    </>
  );
}
