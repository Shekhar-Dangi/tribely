import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useEffect, useCallback } from "react";
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from "../../constants/theme";

import {
  ProgressIndicator,
  OnboardingHeader,
  FormCard,
  NavigationButtons,
  SocialLinkEntry,
} from "../../components/onboarding";
import { useOnboardingData } from "../../contexts/OnboardingContext";
import { validateSocialLinks } from "../../utils/validation";
import { transformOnboardingDataForSubmission } from "../../utils/dataTransformation";

type SocialLinksType = {
  instagram: string;
  youtube: string;
  twitter: string;
};

export default function SocialLinks() {
  const { user } = useUser();
  const { data, updateSocialLinks, clearData } = useOnboardingData();
  const completeOnboarding = useMutation(api.users.completeOnboarding);

  const [socialLinks, setSocialLinks] = useState<SocialLinksType>(
    data.socialLinks
  );
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load saved data when component mounts
  useEffect(() => {
    setSocialLinks(data.socialLinks);
  }, [data.socialLinks]);

  // Save data when socialLinks changes (but avoid the update function in dependencies)
  const handleSocialLinksUpdate = useCallback(
    (newSocialLinks: SocialLinksType) => {
      setSocialLinks(newSocialLinks);
      updateSocialLinks(newSocialLinks);
    },
    [updateSocialLinks]
  );

  const handleComplete = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      if (!user?.id) return;

      // Validate social links (though they're optional)
      const validation = validateSocialLinks(socialLinks);

      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        Alert.alert("Validation Error", validation.errors.join("\n"), [
          { text: "OK" },
        ]);
        return;
      }

      setValidationErrors([]);

      // Get all onboarding data from context
      const completeOnboardingData = { ...data, socialLinks };

      // Transform data to match Convex schema
      console.log("Transforming onboarding data...");
      const transformedData = transformOnboardingDataForSubmission(
        completeOnboardingData
      );

      console.log("Submitting onboarding data:", transformedData);

      // Submit complete onboarding data to Convex
      await completeOnboarding({
        clerkId: user.id,
        ...transformedData,
      });

      console.log("Onboarding completed successfully!");

      // Clear local storage after successful submission
      // await clearData(); // Uncomment if you want to clear local data

      // Redirect to main app
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Error completing onboarding:", error);

      // Show user-friendly error message
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      Alert.alert(
        "Submission Error",
        `Failed to complete onboarding: ${errorMessage}. Please try again.`,
        [
          { text: "OK", style: "default" },
          {
            text: "Skip for now",
            style: "destructive",
            onPress: () => router.replace("/(tabs)"),
          },
        ]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleSkip = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      if (!user?.id) return;

      // Submit onboarding without social links
      const completeOnboardingData = {
        ...data,
        socialLinks: { instagram: "", youtube: "", twitter: "" },
      };
      const transformedData = transformOnboardingDataForSubmission(
        completeOnboardingData
      );

      await completeOnboarding({
        clerkId: user.id,
        ...transformedData,
      });

      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error completing onboarding:", error);
      // Still redirect if error occurs
      router.replace("/(tabs)");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateSocialLink = (platform: keyof SocialLinksType, value: string) => {
    const newSocialLinks = {
      ...socialLinks,
      [platform]: value,
    };
    handleSocialLinksUpdate(newSocialLinks);
  };

  return (
    <View style={styles.container}>
      {/* Progress Indicator */}
      <ProgressIndicator currentStep={5} totalSteps={5} progress={100} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <OnboardingHeader
          title="Social Links"
          subtitle="Connect your social media profiles (optional)"
        />

        {/* Error Display */}
        {validationErrors.length > 0 && (
          <View style={styles.errorContainer}>
            {validationErrors.map((error, index) => (
              <Text key={index} style={styles.errorText}>
                • {error}
              </Text>
            ))}
          </View>
        )}

        {/* Social Media Links Card */}
        <FormCard
          title="Social Media Profiles"
          subtitle="Help others discover and connect with you"
        >
          <SocialLinkEntry
            platform="instagram"
            value={socialLinks.instagram}
            onChangeText={(value) => updateSocialLink("instagram", value)}
          />

          <SocialLinkEntry
            platform="youtube"
            value={socialLinks.youtube}
            onChangeText={(value) => updateSocialLink("youtube", value)}
          />

          <SocialLinkEntry
            platform="twitter"
            value={socialLinks.twitter}
            onChangeText={(value) => updateSocialLink("twitter", value)}
          />
        </FormCard>
      </ScrollView>

      {/* Navigation Buttons */}
      <NavigationButtons
        onSkip={handleSkip}
        onBack={handleBack}
        onNext={handleComplete}
        nextDisabled={!validateSocialLinks(socialLinks).isValid || isSubmitting}
        showSkip={true}
        showBack={true}
        nextText={isSubmitting ? "Completing..." : "Complete"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  helpText: {
    fontSize: FONTS.sizes.sm,
    ...FONTS.regular,
    color: COLORS.text,
    lineHeight: 20,
  },
  // Error Styles
  errorContainer: {
    backgroundColor: COLORS.error ? `${COLORS.error}10` : "#FF444410",
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
  },
  errorText: {
    fontSize: FONTS.sizes.sm,
    ...FONTS.regular,
    color: COLORS.error || "#FF4444",
    lineHeight: 18,
  },
});
