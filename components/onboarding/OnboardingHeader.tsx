import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING } from "../../constants/theme";

interface OnboardingHeaderProps {
  title: string;
  subtitle: string;
}

export default function OnboardingHeader({
  title,
  subtitle,
}: OnboardingHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  title: {
    fontSize: FONTS.sizes.lg,
    ...FONTS.bold,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
});
