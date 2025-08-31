/**
 * Tab Icon Component
 *
 * This component renders custom tab icons for the bottom navigation bar.
 * It provides visual feedback for focused and unfocused states with different styling.
 *
 * Features:
 * - Displays different styles for focused vs unfocused states
 * - Focused: Shows icon + text with highlight background
 * - Unfocused: Shows only icon with muted colors
 * - Uses custom background image for focused state
 * - Responsive sizing with minimum width constraints
 *
 * Props:
 * @param {string} tapName - The display name for the tab (e.g., "Home", "Search")
 * @param {any} icon - The icon image source to display
 * @param {boolean} isFocused - Whether this tab is currently active/focused
 *
 * Styling:
 * - Focused: Highlight background, dark text/icon, horizontal layout with gap
 * - Unfocused: Transparent background, light gray icon, centered layout
 * - Consistent rounded design with overflow hidden
 * - Fixed icon size (20x20) for consistency
 *
 * Visual States:
 * - Active (focused): Highlight background with icon and text
 * - Inactive (unfocused): Simple icon with light tint
 *
 * @returns {JSX.Element} Styled tab icon with conditional appearance
 */

import { images } from "@/constants/images";
import { Image, ImageBackground, Text, View } from "react-native";

function TapIcon({
  tapName,
  icon,
  isFocused,
}: {
  tapName: string;
  icon: any;
  isFocused: boolean;
}) {
  // Render focused state with highlight background and text
  if (isFocused) {
    return (
      <ImageBackground
        source={images.highlight} // Custom highlight background image
        className="flex flex-row gap-2 justify-center items-center flex-1 w-full min-w-[112px] min-h-[52px] rounded-full overflow-hidden mt-4"
      >
        {/* Dark tinted icon for visibility on light background */}
        <Image source={icon} tintColor="#151312" className="size-5" />

        {/* Tab name text */}
        <Text className="text-base text-secondary font-semibold">
          {tapName}
        </Text>
      </ImageBackground>
    );
  }

  // Render unfocused state with simple icon only
  return (
    <View className="justify-center items-center size-full rounded-full mt-4">
      {/* Light gray tinted icon for unfocused state */}
      <Image source={icon} tintColor="#A8B5DB" className="size-5" />
    </View>
  );
}

export default TapIcon;
