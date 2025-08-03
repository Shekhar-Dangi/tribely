import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
  COLORS,
  FONTS,
  SPACING,
  BORDER_RADIUS,
} from "../../../constants/theme";

import {
  ProgressIndicator,
  OnboardingHeader,
  FormCard,
  NavigationButtons,
  ExperienceEntry,
} from "../../../components/onboarding";
import {
  useOnboardingData,
  Experience,
} from "../../../contexts/OnboardingContext";
import { validateExperiences } from "../../../utils/validation";

export default function Experiences() {
  const { data, updateExperiences } = useOnboardingData();
  const [experiences, setExperiences] = useState<Experience[]>(
    data.experiences
  );
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Load saved data when component mounts
  useEffect(() => {
    setExperiences(data.experiences);
  }, [data.experiences]);

  // Save data whenever state changes
  useEffect(() => {
    updateExperiences(experiences);
  }, [experiences, updateExperiences]);

  const handleNext = () => {
    // Validate before proceeding
    const validation = validateExperiences(experiences);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      Alert.alert("Validation Error", validation.errors.join("\n"), [
        { text: "OK" },
      ]);
      return;
    }

    setValidationErrors([]);
    router.push("/(auth)/onboarding/certifications");
  };

  const handleBack = () => {
    router.back();
  };

  const handleSkip = () => {
    // Save current data and proceed
    updateExperiences(experiences);
    router.push("/(auth)/onboarding/certifications");
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        title: "",
        subtitle: "",
        description: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
      },
    ]);
  };

  const removeExperience = (index: number) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((_, i) => i !== index));
    }
  };

  const updateExperience = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const updatedExperiences = experiences.map((exp, i) => {
      if (i === index) {
        const updated = { ...exp, [field]: value };
        // If setting isCurrent to true, clear endDate
        if (field === "isCurrent" && value === true) {
          updated.endDate = "";
        }
        return updated;
      }
      return exp;
    });
    setExperiences(updatedExperiences);
  };

  return (
    <View style={styles.container}>
      {/* Progress Indicator */}
      <ProgressIndicator currentStep={3} totalSteps={5} progress={60} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <OnboardingHeader
          title="Experiences"
          subtitle="Add your fitness journey and professional experience"
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

        {/* Experiences Card */}
        <FormCard
          title="Professional Experience"
          subtitle="Share your fitness and career journey"
        >
          {experiences.map((experience, index) => (
            <ExperienceEntry
              key={index}
              experience={experience}
              index={index}
              onUpdate={updateExperience}
              onRemove={removeExperience}
              canRemove={experiences.length > 1}
            />
          ))}

          <TouchableOpacity style={styles.addButton} onPress={addExperience}>
            <Text style={styles.addButtonText}>+ Add Another Experience</Text>
          </TouchableOpacity>
        </FormCard>
      </ScrollView>

      {/* Navigation Buttons */}
      <NavigationButtons
        onSkip={handleSkip}
        onBack={handleBack}
        onNext={handleNext}
        nextDisabled={!validateExperiences(experiences).isValid}
        showSkip={true}
        showBack={true}
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
  addButton: {
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderStyle: "dashed",
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  addButtonText: {
    fontSize: FONTS.sizes.md,
    ...FONTS.medium,
    color: COLORS.secondary,
  },
  exampleText: {
    fontSize: FONTS.sizes.sm,
    ...FONTS.regular,
    color: COLORS.text,
    lineHeight: 20,
  },
  exampleBold: {
    ...FONTS.bold,
    color: COLORS.primary,
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
