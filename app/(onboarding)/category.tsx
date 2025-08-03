import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  FONTS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
} from "../../constants/theme";

import ProgressIndicator from "../../components/onboarding/ProgressIndicator";
import OnboardingHeader from "../../components/onboarding/OnboardingHeader";
import SelectionCard from "../../components/onboarding/SelectionCard";
import NavigationButtons from "../../components/onboarding/NavigationButtons";
import FormCard from "../../components/onboarding/FormCard";
import { useOnboardingData } from "../../contexts/OnboardingContext";
import { validateCategory } from "../../utils/validation";

type CategoryType = "individual" | "gym" | "brand" | null;

interface CategoryOption {
  id: CategoryType;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
}

const categories: CategoryOption[] = [
  {
    id: "individual",
    title: "Individual User",
    subtitle: "Personal fitness journey",
    icon: "person-outline",
    description:
      "Share your workouts, connect with trainers, and track your progress",
  },
  {
    id: "gym",
    title: "Gym/Fitness Center",
    subtitle: "Business profile",
    icon: "business-outline",
    description:
      "Showcase your facility, attract members, and manage training services",
  },
  {
    id: "brand",
    title: "Brand/Sponsor",
    subtitle: "Commercial profile",
    icon: "star-outline",
    description:
      "Promote products, sponsor athletes, and build brand awareness",
  },
];

export default function Category() {
  const { data, updateCategory } = useOnboardingData();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    data.category
  );
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Load saved data when component mounts
  useEffect(() => {
    setSelectedCategory(data.category);
  }, [data.category]);

  // Save data whenever state changes
  useEffect(() => {
    updateCategory(selectedCategory);
  }, [selectedCategory, updateCategory]);

  const handleNext = () => {
    // Validate before proceeding
    const validation = validateCategory(selectedCategory);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      Alert.alert("Validation Error", validation.errors.join("\n"), [
        { text: "OK" },
      ]);
      return;
    }

    setValidationErrors([]);
    router.push("/(onboarding)/experiences");
  };

  const handleSkip = () => {
    // Save current data and proceed
    updateCategory(selectedCategory);
    router.push("/(onboarding)/experiences");
  };

  return (
    <View style={styles.container}>
      {/* Progress Indicator */}
      <ProgressIndicator currentStep={2} totalSteps={5} progress={40} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <OnboardingHeader
          title="User Category"
          subtitle="What best describes you? This helps us personalize your experience."
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

        {/* Category Selection */}
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <SelectionCard
              key={category.id}
              title={category.title}
              subtitle={category.subtitle}
              description={category.description}
              icon={category.icon}
              isSelected={selectedCategory === category.id}
              onPress={() => setSelectedCategory(category.id)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <NavigationButtons
        onSkip={handleSkip}
        onNext={handleNext}
        nextDisabled={!validateCategory(selectedCategory).isValid}
        showSkip={true}
        showBack={false}
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
  categoriesContainer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  helpText: {
    fontSize: FONTS.sizes.sm,
    ...FONTS.regular,
    color: COLORS.text,
    lineHeight: 20,
  },
  helpBold: {
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
