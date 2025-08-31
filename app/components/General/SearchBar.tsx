/**
 * Search Bar Component
 *
 * A versatile search input component used throughout the app for movie search functionality.
 * Features a customized appearance with search icon and flexible interaction options.
 *
 * Features:
 * - Clean, rounded search input design with dark theme
 * - Search icon integrated on the left side with custom tint
 * - Flexible interaction: supports both text input and press actions
 * - Configurable placeholder text
 * - Submit handling for search execution
 * - Controlled input with optional value binding
 *
 * Props:
 * @param {string} placeholder - Placeholder text displayed when input is empty
 * @param {function} [onPress] - Optional handler for when the input area is pressed
 * @param {function} [onEdit] - Handler function called when text changes
 * @param {function} [onSubmitEditing] - Handler called when user submits (presses enter)
 * @param {string} [value] - Optional controlled value for the input
 *
 * Styling:
 * - Dark background (dark-200) with rounded-full design
 * - White text color for good contrast against dark background
 * - Search icon with blue tint (#ab8ff) for visual appeal
 * - Horizontal padding and spacing for comfortable interaction
 * - Flexible layout with proper icon and text alignment
 *
 * Usage:
 * Used in SearchTap component and other screens requiring search functionality
 * Supports both controlled and uncontrolled input patterns
 * Can be configured for different search scenarios
 *
 * @returns {JSX.Element} Styled search input with icon and flexible interactions
 */

import { icons } from "@/constants/icons";
import { Image, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
  onEdit?: (text: string) => void;
  onSubmitEditing?: () => void;
  value?: string;
}

function SearchBar({
  placeholder,
  onPress,
  onEdit,
  onSubmitEditing,
  value,
}: Props) {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      {/* Search icon with blue tint for visual appeal */}
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8ff" // Blue tint for aesthetic consistency
      />

      {/* Flexible text input supporting multiple interaction patterns */}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="grey" // Subtle placeholder text
        className="flex-1 ml-2 text-white" // White text on dark background
        onPress={onPress} // Optional press handler for custom behavior
        onChangeText={onEdit} // Text change handler for live search
        onSubmitEditing={onSubmitEditing} // Submit handler for search execution
        value={value} // Optional controlled value
      />
    </View>
  );
}

export default SearchBar;
