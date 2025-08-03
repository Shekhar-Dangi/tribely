export const COLORS = {
  // Primary brand colors
  primary: "#1a1a1a", // Dark charcoal - main brand color
  secondary: "#7d9ae8ff", // Electric blue - accent/CTA color

  // Background colors
  white: "#ffffff", // Main background
  background: "#fafafa", // Subtle off-white for cards

  // Text colors
  text: "#1a1a1a", // Primary text (matches primary)
  textSecondary: "#666666", // Secondary text
  textMuted: "#999999", // Muted text for less important info

  // Gray scale
  lightGray: "#f5f5f5", // Very light gray for subtle backgrounds
  mediumGray: "#e0e0e0", // Medium gray for borders
  darkGray: "#555555", // Dark gray for secondary elements
  black: "#000000",

  // Functional colors
  success: "#10b981", // Green for success states
  warning: "#f59e0b", // Orange for warnings
  error: "#ef4444", // Red for errors

  // Social/Interactive colors
  googleBlue: "#4285F4", // Google sign-in
  premium: "#ffd700", // Gold for premium features

  // Workout/Fitness specific
  cardBg: "#ffffff", // Clean white cards
  border: "#e5e7eb", // Subtle borders for cards
  shadow: "rgba(0, 0, 0, 0.1)", // Card shadows
};

export const FONTS = {
  regular: {
    fontFamily: "Inter",
    fontWeight: "400" as const,
  },
  medium: {
    fontFamily: "Inter",
    fontWeight: "500" as const,
  },
  bold: {
    fontFamily: "Inter",
    fontWeight: "700" as const,
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 36,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const SHADOWS = {
  // Card shadows - subtle as per minimalist design
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  button: {
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
};

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 999, // For circular elements
};
