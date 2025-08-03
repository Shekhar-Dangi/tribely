import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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
  SHADOWS,
} from "../../../constants/theme";
import { Ionicons } from "@expo/vector-icons";

import ProgressIndicator from "../../../components/onboarding/ProgressIndicator";
import OnboardingHeader from "../../../components/onboarding/OnboardingHeader";
import FormCard from "../../../components/onboarding/FormCard";
import NavigationButtons from "../../../components/onboarding/NavigationButtons";
import {
  useOnboardingData,
  PersonalRecord,
} from "../../../contexts/OnboardingContext";
import { validatePersonalStats } from "../../../utils/validation";

export default function PersonalStats() {
  const { data, updatePersonalStats } = useOnboardingData();

  const [height, setHeight] = useState(data.personalStats.height);
  const [weight, setWeight] = useState(data.personalStats.weight);
  const [bodyFat, setBodyFat] = useState(data.personalStats.bodyFat);
  const [prs, setPrs] = useState<PersonalRecord[]>(
    data.personalStats.personalRecords
  );
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Load saved data when component mounts
  useEffect(() => {
    setHeight(data.personalStats.height);
    setWeight(data.personalStats.weight);
    setBodyFat(data.personalStats.bodyFat);
    setPrs(data.personalStats.personalRecords);
  }, [data.personalStats]);

  // Save data whenever state changes
  useEffect(() => {
    updatePersonalStats({
      height,
      weight,
      bodyFat,
      personalRecords: prs,
    });
  }, [height, weight, bodyFat, prs, updatePersonalStats]);

  const handleNext = () => {
    // Validate before proceeding
    const validation = validatePersonalStats({
      height,
      weight,
      bodyFat,
    });

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      Alert.alert("Validation Error", validation.errors.join("\n"), [
        { text: "OK" },
      ]);
      return;
    }

    setValidationErrors([]);
    router.push("/(auth)/onboarding/category");
  };

  const handleSkip = () => {
    // Save current data and proceed
    updatePersonalStats({
      height,
      weight,
      bodyFat,
      personalRecords: prs,
    });
    router.push("/(auth)/onboarding/category");
  };

  const addPR = () => {
    setPrs([...prs, { exerciseName: "", subtitle: "", date: "" }]);
  };

  const removePR = (index: number) => {
    if (prs.length > 1) {
      setPrs(prs.filter((_, i) => i !== index));
    }
  };

  const updatePR = (
    index: number,
    field: "exerciseName" | "subtitle" | "date",
    value: string
  ) => {
    const updatedPrs = prs.map((pr, i) =>
      i === index ? { ...pr, [field]: value } : pr
    );
    setPrs(updatedPrs);
  };

  return (
    <View style={styles.container}>
      {/* Progress Indicator */}
      <ProgressIndicator currentStep={1} totalSteps={5} progress={20} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <OnboardingHeader
          title="Personal Stats"
          subtitle="Share your fitness metrics and personal records"
        />

        {/* Basic Stats Card */}
        <FormCard title="Basic Measurements">
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

          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Height (cm) *</Text>
              <TextInput
                style={[
                  styles.input,
                  validationErrors.some((e) => e.includes("Height")) &&
                    styles.inputError,
                ]}
                value={height}
                onChangeText={setHeight}
                placeholder="175"
                keyboardType="numeric"
                placeholderTextColor={COLORS.textMuted}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Weight (kg) *</Text>
              <TextInput
                style={[
                  styles.input,
                  validationErrors.some((e) => e.includes("Weight")) &&
                    styles.inputError,
                ]}
                value={weight}
                onChangeText={setWeight}
                placeholder="70"
                keyboardType="numeric"
                placeholderTextColor={COLORS.textMuted}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Body Fat % (optional)</Text>
            <TextInput
              style={[
                styles.input,
                validationErrors.some((e) => e.includes("Body fat")) &&
                  styles.inputError,
              ]}
              value={bodyFat}
              onChangeText={setBodyFat}
              placeholder="15"
              keyboardType="numeric"
              placeholderTextColor={COLORS.textMuted}
            />
          </View>
        </FormCard>

        {/* Personal Records Card */}
        <FormCard
          title="Personal Records (PRs)"
          subtitle="Add your best achievements"
        >
          {prs.map((pr, index) => (
            <View key={index} style={styles.prContainer}>
              <View style={styles.prHeader}>
                <Text style={styles.prNumber}>PR #{index + 1}</Text>
                {prs.length > 1 && (
                  <TouchableOpacity onPress={() => removePR(index)}>
                    <Ionicons
                      name="close-circle-outline"
                      size={24}
                      color={COLORS.secondary}
                    />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Exercise Name</Text>
                <TextInput
                  style={styles.input}
                  value={pr.exerciseName}
                  onChangeText={(value) =>
                    updatePR(index, "exerciseName", value)
                  }
                  placeholder="e.g., Bench Press, 5K Run"
                  placeholderTextColor={COLORS.textMuted}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Subtitle</Text>
                <TextInput
                  style={styles.input}
                  value={pr.subtitle}
                  onChangeText={(value) => updatePR(index, "subtitle", value)}
                  placeholder="e.g., 2 reps at 70kg, 17 mins"
                  placeholderTextColor={COLORS.textMuted}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Date</Text>
                <TextInput
                  style={styles.input}
                  value={pr.date}
                  onChangeText={(value) => updatePR(index, "date", value)}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={COLORS.textMuted}
                />
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.addButton} onPress={addPR}>
            <Text style={styles.addButtonText}>+ Add Another PR</Text>
          </TouchableOpacity>
        </FormCard>
      </ScrollView>

      {/* Navigation Buttons */}
      <NavigationButtons
        onSkip={handleSkip}
        onNext={handleNext}
        nextDisabled={
          !validatePersonalStats({ height, weight, bodyFat }).isValid
        }
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

  // Scroll View
  scrollView: {
    flex: 1,
  },

  // Inputs
  inputContainer: {
    flex: 1,
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  inputRow: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  inputLabel: {
    fontSize: FONTS.sizes.sm,
    ...FONTS.medium,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONTS.sizes.md,
    ...FONTS.regular,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },

  // PR Section
  prContainer: {
    // backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.xs,
    // padding: SPACING.xs,
    marginBottom: SPACING.xxl,
    // borderWidth: 1,
    // borderColor: COLORS.lightGray,
  },
  prHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  prNumber: {
    fontSize: FONTS.sizes.sm,
    ...FONTS.bold,
    color: COLORS.secondary,
  },

  // Add Button
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

  // Error Styles
  errorContainer: {
    backgroundColor: COLORS.error ? `${COLORS.error}10` : "#FF444410",
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
  },
  errorText: {
    fontSize: FONTS.sizes.sm,
    ...FONTS.regular,
    color: COLORS.error || "#FF4444",
    lineHeight: 18,
  },
  inputError: {
    borderColor: COLORS.error || "#FF4444",
    borderWidth: 2,
  },
});
