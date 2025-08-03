import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  COLORS,
  FONTS,
  SPACING,
  BORDER_RADIUS,
} from "../../../constants/theme";

export default function SocialLinks() {
  const { user } = useUser();
  const completeOnboarding = useMutation(api.users.completeOnboarding);

  const handleComplete = async () => {
    try {
      if (!user?.id) return;

      // Mark onboarding as complete (for now without data)
      await completeOnboarding({
        clerkId: user.id,
        // TODO: Pass actual onboarding data from previous screens
      });

      // Redirect to main app
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error completing onboarding:", error);
      // Still redirect for now
      router.replace("/(tabs)");
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleSkip = async () => {
    try {
      if (!user?.id) return;

      // Mark onboarding as complete even if skipped
      await completeOnboarding({
        clerkId: user.id,
      });

      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error completing onboarding:", error);
      router.replace("/(tabs)");
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Step 5 of 5</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "100%" }]} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Social Links</Text>
        <Text style={styles.subtitle}>
          Connect your social media profiles (optional)
        </Text>

        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>🔗 Social Links Screen</Text>
          <Text style={styles.description}>
            Link your social media:{"\n\n"}
            📸 Instagram{"\n"}
            📹 YouTube{"\n"}
            🐦 Twitter{"\n\n"}
            This helps others discover and connect with you across platforms.
          </Text>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip & Finish</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleComplete}
        >
          <Text style={styles.completeButtonText}>Complete</Text>
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
    gap: SPACING.sm,
  },
  backButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: "center",
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backButtonText: {
    fontSize: FONTS.sizes.md,
    ...FONTS.medium,
    color: COLORS.text,
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
  completeButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: "center",
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.secondary,
  },
  completeButtonText: {
    fontSize: FONTS.sizes.md,
    ...FONTS.medium,
    color: COLORS.white,
  },
});
