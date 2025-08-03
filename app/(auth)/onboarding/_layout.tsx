import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING } from "../../../constants/theme";

export default function OnboardingLayout() {
  return (
    <View style={styles.container}>
      {/* Progress Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Complete Your Profile</Text>
        <Text style={styles.headerSubtitle}>
          Help us personalize your experience
        </Text>
      </View>

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="personal-stats" />
        <Stack.Screen name="category" />
        <Stack.Screen name="experiences" />
        <Stack.Screen name="certifications" />
        <Stack.Screen name="social-links" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xl,
    ...FONTS.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: FONTS.sizes.md,
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
});
