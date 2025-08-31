/**
 * Logo Image Component
 *
 * A simple, reusable component for displaying the app logo with consistent sizing and positioning.
 * Used across multiple screens for brand identity and visual consistency.
 *
 * Features:
 * - Displays the main app logo image
 * - Consistent sizing (12x10) across all uses
 * - Automatic horizontal centering
 * - Standard top and bottom margins for spacing
 * - Simple, lightweight component for branding
 *
 * Styling:
 * - Fixed width: 48px (w-12)
 * - Fixed height: 40px (h-10)
 * - Top margin: 80px (mt-20) for header spacing
 * - Bottom margin: 20px (mb-5) for content separation
 * - Horizontal centering with mx-auto
 *
 * Usage:
 * Used in headers, splash screens, and navigation areas
 * Provides consistent brand presence throughout the app
 * Simple drop-in component requiring no configuration
 *
 * Dependencies:
 * - App logo from icons constants
 * - Consistent with overall app branding strategy
 *
 * @returns {JSX.Element} Centered logo image with standard spacing
 */

import { icons } from "@/constants/icons";
import { Image } from "react-native";

function LogoImg() {
  return (
    <Image
      source={icons.logo}
      className="w-12 h-10 mt-20 mb-5 mx-auto" // Consistent sizing and centering
    />
  );
}

export default LogoImg;
