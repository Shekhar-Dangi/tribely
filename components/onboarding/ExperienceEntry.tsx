import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from "../../constants/theme";

interface ExperienceEntryProps {
  experience: {
    title: string;
    subtitle: string;
    description: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
  };
  index: number;
  onUpdate: (index: number, field: string, value: string | boolean) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

export default function ExperienceEntry({
  experience,
  index,
  onUpdate,
  onRemove,
  canRemove,
}: ExperienceEntryProps) {
  const defaultLogos = [
    "business-outline",
    "fitness-outline",
    "barbell-outline",
    "medal-outline",
    "trophy-outline",
    "school-outline",
  ];

  const getDefaultLogo = (index: number) => {
    return defaultLogos[index % defaultLogos.length];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons
            name={getDefaultLogo(index) as any}
            size={24}
            color={COLORS.secondary}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.entryNumber}>Experience #{index + 1}</Text>
        </View>
        {canRemove && (
          <TouchableOpacity
            onPress={() => onRemove(index)}
            style={styles.removeButton}
          >
            <Ionicons
              name="close-circle-outline"
              size={24}
              color={COLORS.secondary}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Title / Position</Text>
        <TextInput
          style={styles.input}
          value={experience.title}
          onChangeText={(value) => onUpdate(index, "title", value)}
          placeholder="e.g., Personal Trainer, Fitness Coach"
          placeholderTextColor={COLORS.textMuted}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Company / Gym</Text>
        <TextInput
          style={styles.input}
          value={experience.subtitle}
          onChangeText={(value) => onUpdate(index, "subtitle", value)}
          placeholder="e.g., Gold's Gym, LA Fitness"
          placeholderTextColor={COLORS.textMuted}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Description (optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={experience.description}
          onChangeText={(value) => onUpdate(index, "description", value)}
          placeholder="Brief description of your role and achievements"
          placeholderTextColor={COLORS.textMuted}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.dateContainer}>
        <View style={styles.dateInputContainer}>
          <Text style={styles.inputLabel}>Start Date</Text>
          <TextInput
            style={styles.input}
            value={experience.startDate}
            onChangeText={(value) => onUpdate(index, "startDate", value)}
            placeholder="MM/YYYY"
            placeholderTextColor={COLORS.textMuted}
          />
        </View>

        <View style={styles.dateInputContainer}>
          <Text style={styles.inputLabel}>End Date</Text>
          <TextInput
            style={[styles.input, experience.isCurrent && styles.inputDisabled]}
            value={experience.isCurrent ? "Present" : experience.endDate}
            onChangeText={(value) => onUpdate(index, "endDate", value)}
            placeholder="MM/YYYY"
            placeholderTextColor={COLORS.textMuted}
            editable={!experience.isCurrent}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.currentToggle}
        onPress={() => onUpdate(index, "isCurrent", !experience.isCurrent)}
      >
        <View
          style={[
            styles.checkbox,
            experience.isCurrent && styles.checkboxSelected,
          ]}
        >
          {experience.isCurrent && (
            <Ionicons name="checkmark" size={16} color={COLORS.white} />
          )}
        </View>
        <Text style={styles.checkboxLabel}>I currently work here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.xs,
    marginBottom: SPACING.xxl,
    borderColor: COLORS.lightGray,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  titleContainer: {
    flex: 1,
  },
  entryNumber: {
    fontSize: FONTS.sizes.sm,
    ...FONTS.bold,
    color: COLORS.secondary,
  },
  removeButton: {
    padding: SPACING.xs,
  },
  inputContainer: {
    marginBottom: SPACING.md,
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
  inputDisabled: {
    backgroundColor: COLORS.lightGray,
    color: COLORS.textMuted,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  dateContainer: {
    flexDirection: "row",
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  dateInputContainer: {
    flex: 1,
  },
  currentToggle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginRight: SPACING.sm,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  checkboxSelected: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  checkboxLabel: {
    fontSize: FONTS.sizes.sm,
    ...FONTS.medium,
    color: COLORS.text,
  },
});
