import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from "../../constants/theme";

interface SocialLinkProps {
  platform: "instagram" | "youtube" | "twitter";
  value: string;
  onChangeText: (value: string) => void;
}

export default function SocialLinkEntry({
  platform,
  value,
  onChangeText,
}: SocialLinkProps) {
  const getSocialConfig = () => {
    switch (platform) {
      case "instagram":
        return {
          icon: "logo-instagram" as keyof typeof Ionicons.glyphMap,
          label: "Instagram",
          placeholder: "@username or profile URL",
          color: "#E4405F",
        };
      case "youtube":
        return {
          icon: "logo-youtube" as keyof typeof Ionicons.glyphMap,
          label: "YouTube",
          placeholder: "Channel URL or @handle",
          color: "#FF0000",
        };
      case "twitter":
        return {
          icon: "logo-twitter" as keyof typeof Ionicons.glyphMap, // Keep Twitter icon for now as there's no X icon
          label: "X",
          placeholder: "@username or profile URL",
          color: "#000000", // X's black color
        };
    }
  };

  const config = getSocialConfig();

  return (
    <View style={styles.container}>
      {/* Header with Platform Icon */}
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: `${config.color}20` },
          ]}
        >
          <Ionicons name={config.icon} size={24} color={config.color} />
        </View>
        <Text style={styles.label}>{config.label}</Text>
      </View>

      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder={config.placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={COLORS.textMuted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.sm,
  },
  label: {
    fontSize: FONTS.sizes.md,
    ...FONTS.medium,
    color: COLORS.text,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONTS.sizes.md,
    ...FONTS.regular,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },
});
