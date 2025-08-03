import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import {
  COLORS,
  FONTS,
  SPACING,
  BORDER_RADIUS,
} from "../../../constants/theme";

export default function PersonalStats() {
  const handleNext = () => {
    router.push("/(auth)/onboarding/category");
  };

  const handleSkip = () => {
    router.push("/(auth)/onboarding/category");
  };

  return (
    <View style={styles.container}>
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Step 1 of 5</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "20%" }]} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Personal Stats</Text>
        <Text style={styles.subtitle}>
          Share your fitness metrics and personal records
        </Text>

        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>📊 Personal Stats Screen</Text>
          <Text style={styles.description}>
            • Weight & Height{"\n"}• Personal Records (PRs){"\n"}• Body Fat %
            (optional){"\n"}• Example: "Bench Press 2 reps at 70kg"
          </Text>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  progressContainer: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  progressText: {
    fontSize: FONTS.sizes.sm,
    ...FONTS.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.lightGray,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.secondary,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
  },
  title: {
    fontSize: FONTS.sizes.xxl,
    ...FONTS.bold,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
  },
  placeholderText: {
    fontSize: FONTS.sizes.xl,
    ...FONTS.bold,
    color: COLORS.primary,
    marginBottom: SPACING.lg,
  },
  description: {
    fontSize: FONTS.sizes.md,
    ...FONTS.regular,
    color: COLORS.text,
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
    gap: SPACING.md,
  },
  skipButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: "center",
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  skipButtonText: {
    fontSize: FONTS.sizes.md,
    ...FONTS.medium,
    color: COLORS.text,
  },
  nextButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: "center",
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.secondary,
  },
  nextButtonText: {
    fontSize: FONTS.sizes.md,
    ...FONTS.medium,
    color: COLORS.white,
  },
});
