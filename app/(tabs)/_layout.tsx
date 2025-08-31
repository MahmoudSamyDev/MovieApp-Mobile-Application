/**
 * Tab Layout Component
 *
 * This component defines the main tab-based navigation for the application.
 * It creates a custom-styled tab bar with three main screens: Home, Saved, and Search.
 *
 * Features:
 * - Custom rounded tab bar with dark theme styling
 * - Icon-based navigation with focus states
 * - Positioned absolutely at the bottom with custom margins
 * - Uses custom TapIcon component for enhanced visual feedback
 *
 * Tab Structure:
 * - Home (index): Main screen showing latest and trending movies
 * - Saved: Screen displaying user's favorite movies stored locally
 * - Search: Screen for searching movies by query
 *
 * Styling:
 * - Dark background (#0f0D23) with rounded corners (50px)
 * - Fixed height (52px) with horizontal margins (20px)
 * - Bottom margin (40px) for spacing from screen edge
 * - No labels shown, only custom icons with text
 *
 * @returns {JSX.Element} Tab navigation layout
 */

import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import TapIcon from "../components/General/TapIcon";

function _Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false, // Hide default labels, using custom TapIcon instead
        tabBarStyle: {
          backgroundColor: "#0f0D23", // Dark background matching app theme
          borderColor: "#0f0D23", // Border color same as background
          position: "absolute", // Position at bottom of screen
          borderRadius: 50, // Rounded corners for modern look
          overflow: "hidden", // Ensure content stays within rounded borders
          marginHorizontal: 20, // Horizontal spacing from screen edges
          marginBottom: 40, // Spacing from bottom of screen
          height: 52, // Fixed height for consistent appearance
          justifyContent: "center", // Center content vertically
          alignContent: "center", // Center content alignment
          alignItems: "center", // Center items alignment
        },
      }}
    >
      {/* Home Screen - Main landing page with latest and trending movies */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false, // Hide header for custom design
          tabBarIcon: ({ focused }) => (
            <TapIcon tapName="Home" icon={icons.home} isFocused={focused} />
          ),
        }}
      />

      {/* Saved Movies Screen - User's favorite movies stored locally */}
      <Tabs.Screen
        name="SavedTap"
        options={{
          title: "Saved",
          headerShown: false, // Hide header for custom design
          tabBarIcon: ({ focused }) => (
            <TapIcon tapName="Saved" icon={icons.save} isFocused={focused} />
          ),
        }}
      />

      {/* Search Screen - Movie search functionality */}
      <Tabs.Screen
        name="SearchTap"
        options={{
          title: "Search",
          headerShown: false, // Hide header for custom design
          tabBarIcon: ({ focused }) => (
            <TapIcon tapName="Search" icon={icons.search} isFocused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

export default _Layout;
