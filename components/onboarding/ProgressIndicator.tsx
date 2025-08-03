import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING } from "../../constants/theme";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  progress: number; // percentage (0-100)
}

export default function ProgressIndicator({
  currentStep,
  totalSteps,
  progress,
}: ProgressIndicatorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Step {currentStep} of {totalSteps}
      </Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  text: {
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
});
