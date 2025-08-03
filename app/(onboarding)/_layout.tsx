import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING } from "../../constants/theme";
import { OnboardingProvider } from "../../contexts/OnboardingContext";

export default function OnboardingLayout() {
  return (
    <OnboardingProvider>
      <View style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="personal-stats" />
          <Stack.Screen name="category" />
          <Stack.Screen name="experiences" />
          <Stack.Screen name="certifications" />
          <Stack.Screen name="social-links" />
        </Stack>
      </View>
    </OnboardingProvider>
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
