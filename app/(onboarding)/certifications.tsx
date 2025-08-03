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
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from "../../constants/theme";

import {
  ProgressIndicator,
  OnboardingHeader,
  FormCard,
  NavigationButtons,
  CertificationEntry,
} from "../../components/onboarding";
import {
  useOnboardingData,
  Certification,
} from "../../contexts/OnboardingContext";
import { validateCertifications } from "../../utils/validation";

export default function Certifications() {
  const { data, updateCertifications } = useOnboardingData();
  const [certifications, setCertifications] = useState<Certification[]>(
    data.certifications
  );
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Load saved data when component mounts
  useEffect(() => {
    setCertifications(data.certifications);
  }, [data.certifications]);

  // Save data whenever state changes
  useEffect(() => {
    updateCertifications(certifications);
  }, [certifications, updateCertifications]);

  const handleNext = () => {
    // Validate before proceeding
    const validation = validateCertifications(certifications);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      Alert.alert("Validation Error", validation.errors.join("\n"), [
        { text: "OK" },
      ]);
      return;
    }

    setValidationErrors([]);
    router.push("/(onboarding)/social-links");
  };

  const handleBack = () => {
    router.back();
  };

  const handleSkip = () => {
    // Save current data and proceed
    updateCertifications(certifications);
    router.push("/(onboarding)/social-links");
  };

  const addCertification = () => {
    setCertifications([
      ...certifications,
      {
        title: "",
        subtitle: "",
        description: "",
        issueDate: "",
        expiryDate: "",
        credentialId: "",
        isActive: false,
      },
    ]);
  };

  const removeCertification = (index: number) => {
    if (certifications.length > 1) {
      setCertifications(certifications.filter((_, i) => i !== index));
    }
  };

  const updateCertification = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const updatedCertifications = certifications.map((cert, i) => {
      if (i === index) {
        const updated = { ...cert, [field]: value };
        // If setting isActive to true, clear expiryDate
        if (field === "isActive" && value === true) {
          updated.expiryDate = "";
        }
        return updated;
      }
      return cert;
    });
    setCertifications(updatedCertifications);
  };

  return (
    <View style={styles.container}>
      {/* Progress Indicator */}
      <ProgressIndicator currentStep={4} totalSteps={5} progress={80} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <OnboardingHeader
          title="Certifications"
          subtitle="Showcase your fitness credentials and achievements"
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

        {/* Certifications Card */}
        <FormCard
          title="Professional Certifications"
          subtitle="Add your fitness certifications and credentials"
        >
          {certifications.map((certification, index) => (
            <CertificationEntry
              key={index}
              certification={certification}
              index={index}
              onUpdate={updateCertification}
              onRemove={removeCertification}
              canRemove={certifications.length > 1}
            />
          ))}

          <TouchableOpacity style={styles.addButton} onPress={addCertification}>
            <Text style={styles.addButtonText}>
              + Add Another Certification
            </Text>
          </TouchableOpacity>
        </FormCard>
      </ScrollView>

      {/* Navigation Buttons */}
      <NavigationButtons
        onSkip={handleSkip}
        onBack={handleBack}
        onNext={handleNext}
        nextDisabled={!validateCertifications(certifications).isValid}
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
