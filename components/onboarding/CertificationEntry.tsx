import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from "../../constants/theme";

interface Certification {
  title: string;
  subtitle: string;
  description: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  isActive: boolean;
}

interface CertificationEntryProps {
  certification: Certification;
  index: number;
  onUpdate: (index: number, field: string, value: string | boolean) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

export default function CertificationEntry({
  certification,
  index,
  onUpdate,
  onRemove,
  canRemove,
}: CertificationEntryProps) {
  // Default certification logos based on common fitness certifications
  const getDefaultLogo = () => {
    const logos = [
      "medal", // NASM, ACE
      "trophy", // ACSM, NSCA
      "ribbon", // CrossFit, Yoga
      "star", // Personal training certs
      "shield", // Safety certifications
      "bookmark", // Specialty certs
      "checkmark-circle", // General certifications
    ];
    return logos[index % logos.length] as keyof typeof Ionicons.glyphMap;
  };

  return (
    <View style={styles.container}>
      {/* Header with Logo and Remove Button */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons
            name={getDefaultLogo()}
            size={24}
            color={COLORS.secondary}
          />
        </View>
        <Text style={styles.headerText}>Certification {index + 1}</Text>
        {canRemove && (
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => onRemove(index)}
          >
            <Ionicons
              name="close-circle-outline"
              size={24}
              color={COLORS.secondary}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Certification Title */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Certification Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., NASM-CPT, CrossFit Level 1"
          value={certification.title}
          onChangeText={(text) => onUpdate(index, "title", text)}
          multiline={false}
        />
      </View>

      {/* Issuing Organization */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Issuing Organization *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., National Academy of Sports Medicine"
          value={certification.subtitle}
          onChangeText={(text) => onUpdate(index, "subtitle", text)}
          multiline={false}
        />
      </View>

      {/* Description */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Brief description of the certification..."
          value={certification.description}
          onChangeText={(text) => onUpdate(index, "description", text)}
          multiline={true}
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      {/* Date Range */}
      <View style={styles.dateRow}>
        <View style={styles.dateGroup}>
          <Text style={styles.label}>Issue Date *</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YYYY"
            value={certification.issueDate}
            onChangeText={(text) => onUpdate(index, "issueDate", text)}
          />
        </View>
        <View style={styles.dateGroup}>
          <Text style={styles.label}>Expiry Date</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YYYY"
            value={certification.expiryDate}
            onChangeText={(text) => onUpdate(index, "expiryDate", text)}
            editable={!certification.isActive}
          />
        </View>
      </View>

      {/* Never Expires Toggle */}
      <TouchableOpacity
        style={styles.toggleRow}
        onPress={() => onUpdate(index, "isActive", !certification.isActive)}
      >
        <View
          style={[
            styles.checkbox,
            certification.isActive && styles.checkboxActive,
          ]}
        >
          {certification.isActive && (
            <Ionicons name="checkmark" size={16} color={COLORS.white} />
          )}
        </View>
        <Text style={styles.toggleText}>This certification never expires</Text>
      </TouchableOpacity>

      {/* Credential ID */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Credential ID (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., NASM-CPT-123456"
          value={certification.credentialId}
          onChangeText={(text) => onUpdate(index, "credentialId", text)}
          multiline={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    // borderWidth: 1,
    // borderColor: COLORS.border,
    // padding: SPACING.md,
    marginBottom: SPACING.xxl,
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
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.sm,
  },
  headerText: {
    flex: 1,
    fontSize: FONTS.sizes.md,
    ...FONTS.medium,
    color: COLORS.secondary,
  },
  removeButton: {
    padding: SPACING.xs,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONTS.sizes.sm,
    ...FONTS.medium,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    fontSize: FONTS.sizes.md,
    ...FONTS.regular,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },
  textArea: {
    height: 80,
    paddingTop: SPACING.sm,
  },
  dateRow: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  dateGroup: {
    flex: 1,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 4,
    marginRight: SPACING.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  toggleText: {
    fontSize: FONTS.sizes.sm,
    ...FONTS.regular,
    color: COLORS.text,
  },
});
