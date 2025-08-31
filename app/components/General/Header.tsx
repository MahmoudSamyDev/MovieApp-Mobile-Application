/**
 * Header Component
 *
 * A background header component that provides a consistent visual foundation for app screens.
 * Uses a full-width background image positioned absolutely for layering with other content.
 *
 * Features:
 * - Full-width background image display
 * - Absolute positioning for content layering
 * - Zero z-index for proper stacking order
 * - Consistent background across multiple screens
 * - Simple, lightweight header solution
 *
 * Styling:
 * - Full width (w-full) to span entire screen
 * - Absolute positioning for background layering
 * - z-index: 0 to stay behind foreground content
 * - Uses app's main background image for consistency
 *
 * Usage:
 * Used as a background element in various screens
 * Provides visual foundation for content overlay
 * Ensures consistent app appearance and branding
 * Works with content positioned on top
 *
 * Layout Strategy:
 * - Positioned absolutely to avoid affecting layout flow
 * - Full width ensures complete background coverage
 * - Low z-index keeps it behind interactive elements
 * - Simple drop-in component for background needs
 *
 * Dependencies:
 * - Background image from images constants
 * - Designed to work with absolute/relative positioned content
 *
 * @returns {JSX.Element} Full-width background image header
 */

import { images } from "@/constants/images";
import { Image } from "react-native";

function Header() {
  return (
    <Image
      source={images.bg}
      className="w-full z-0 absolute" // Full-width absolute background
    />
  );
}

export default Header;
