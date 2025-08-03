import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  FONTS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
} from "../../constants/theme";

interface SelectionCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  isSelected: boolean;
  onPress: () => void;
  children?: ReactNode;
}

export default function SelectionCard({
  title,
  subtitle,
  description,
  icon,
  isSelected,
  onPress,
  children,
}: SelectionCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={icon}
            size={28}
            color={isSelected ? COLORS.secondary : COLORS.textSecondary}
          />
        </View>
        <View style={styles.info}>
          <Text style={[styles.title, isSelected && styles.titleSelected]}>
            {title}
          </Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.radioContainer}>
          <View
            style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}
          >
            {isSelected && <View style={styles.radioInner} />}
          </View>
        </View>
      </View>

      <Text style={styles.description}>{description}</Text>

      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  cardSelected: {
    borderColor: COLORS.secondary,
    borderWidth: 2,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: FONTS.sizes.md,
    ...FONTS.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  titleSelected: {
    color: COLORS.secondary,
  },
  subtitle: {
    fontSize: FONTS.sizes.sm,
    ...FONTS.medium,
    color: COLORS.textSecondary,
  },
  description: {
    fontSize: FONTS.sizes.sm,
    ...FONTS.regular,
    color: COLORS.text,
    lineHeight: 20,
    marginLeft: 50 + SPACING.md, // Align with title
  },
  radioContainer: {
    marginLeft: SPACING.sm,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  radioOuterSelected: {
    borderColor: COLORS.secondary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.secondary,
  },
});
