import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  FONTS,
  SPACING,
  SHADOWS,
  BORDER_RADIUS,
} from "../../constants/theme";

interface PersonalRecord {
  exerciseName: string;
  subtitle: string;
  date: number;
}

interface Experience {
  title: string;
  subtitle?: string;
  description?: string;
  logoUrl?: string;
  startDate: number;
  endDate?: number;
  isCurrent: boolean;
}

interface Certification {
  title: string;
  subtitle?: string;
  description?: string;
  logoUrl?: string;
  issueDate: number;
  expiryDate?: number;
  credentialId?: string;
  isActive: boolean;
}

interface UserStats {
  height: number;
  weight: number;
  bodyFat?: number;
  personalRecords?: PersonalRecord[];
}

interface DataTabProps {
  bio?: string;
  stats?: UserStats;
  experiences?: Experience[];
  certifications?: Certification[];
  affiliation?: string;
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const BioCard = ({ bio }: { bio?: string }) => {
  if (!bio) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>About</Text>
      <Text style={styles.bioText}>{bio}</Text>
    </View>
  );
};

const StatsCard = ({ stats }: { stats?: UserStats }) => {
  if (!stats) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Personal Stats</Text>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.height} cm</Text>
          <Text style={styles.statLabel}>Height</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.weight} kg</Text>
          <Text style={styles.statLabel}>Weight</Text>
        </View>

        {stats.bodyFat && (
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.bodyFat}%</Text>
            <Text style={styles.statLabel}>Body Fat</Text>
          </View>
        )}
      </View>

      {stats.personalRecords && stats.personalRecords.length > 0 && (
        <View style={styles.prsSection}>
          <Text style={styles.sectionTitle}>Personal Records</Text>
          {stats.personalRecords.map((pr, index) => (
            <View key={index} style={styles.prItem}>
              <View style={styles.prItemWithIcon}>
                <View style={styles.iconContainer}>
                  <Ionicons name="trophy" size={20} color={COLORS.secondary} />
                </View>
                <View style={styles.prContent}>
                  <Text style={styles.prExercise}>{pr.exerciseName}</Text>
                  <Text style={styles.prSubtitle}>{pr.subtitle}</Text>
                </View>
              </View>
              <Text style={styles.prDate}>{formatDate(pr.date)}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const ExperienceCard = ({ experiences }: { experiences?: Experience[] }) => {
  if (!experiences || experiences.length === 0) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Experience</Text>

      {experiences.map((exp, index) => (
        <View key={index} style={styles.experienceItem}>
          <View style={styles.itemWithIcon}>
            <View style={styles.iconContainer}>
              <Ionicons name="briefcase" size={20} color={COLORS.secondary} />
            </View>
            <View style={styles.experienceContent}>
              <Text style={styles.experienceTitle}>{exp.title}</Text>
              {exp.subtitle && (
                <Text style={styles.experienceSubtitle}>{exp.subtitle}</Text>
              )}
              {exp.description && (
                <Text style={styles.experienceDescription}>
                  {exp.description}
                </Text>
              )}
              <Text style={styles.dateText}>
                {formatDate(exp.startDate)} -{" "}
                {exp.isCurrent
                  ? "Present"
                  : exp.endDate
                    ? formatDate(exp.endDate)
                    : "Present"}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const CertificationCard = ({
  certifications,
}: {
  certifications?: Certification[];
}) => {
  if (!certifications || certifications.length === 0) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Certifications</Text>

      {certifications.map((cert, index) => (
        <View key={index} style={styles.certificationItem}>
          <View style={styles.itemWithIcon}>
            <View style={styles.iconContainer}>
              <Ionicons name="school" size={20} color={COLORS.secondary} />
            </View>
            <View style={styles.certificationContent}>
              <Text style={styles.certificationTitle}>{cert.title}</Text>
              {cert.subtitle && (
                <Text style={styles.certificationSubtitle}>
                  {cert.subtitle}
                </Text>
              )}
              {cert.credentialId && (
                <Text style={styles.credentialId}>ID: {cert.credentialId}</Text>
              )}
              <View style={styles.certificationDates}>
                <Text style={styles.dateText}>
                  {formatDate(cert.issueDate)} -{" "}
                  {cert.expiryDate ? formatDate(cert.expiryDate) : "present"}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.statusBadge,
              cert.isActive ? styles.activeBadge : styles.inactiveBadge,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                cert.isActive
                  ? styles.activeStatusText
                  : styles.inactiveStatusText,
              ]}
            >
              {cert.isActive ? "Active" : "Inactive"}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default function DataTab({
  bio,
  stats,
  experiences,
  certifications,
  affiliation,
}: DataTabProps) {
  const hasData =
    bio ||
    stats ||
    (experiences && experiences.length > 0) ||
    (certifications && certifications.length > 0);

  if (!hasData) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No profile data available</Text>
        <Text style={styles.emptySubtext}>
          Complete your onboarding to see your stats and achievements here
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {affiliation && (
        <View style={styles.affiliationCard}>
          <View style={styles.affiliationContent}>
            <Ionicons name="business" size={16} color={COLORS.secondary} />
            <Text style={styles.affiliationText}>{affiliation}</Text>
          </View>
        </View>
      )}

      <BioCard bio={bio} />
      <StatsCard stats={stats} />
      <ExperienceCard experiences={experiences} />
      <CertificationCard certifications={certifications} />

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background || "#f8f9fa",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.textSecondary,
    ...FONTS.medium,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  emptySubtext: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textMuted,
    ...FONTS.regular,
    textAlign: "center",
    lineHeight: 22,
  },

  // Affiliation
  affiliationCard: {
    margin: SPACING.lg,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.small,
  },
  affiliationContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
  },
  affiliationText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    ...FONTS.medium,
  },

  // Card Styles
  card: {
    margin: SPACING.lg,
    marginBottom: SPACING.md,
    // padding: SPACING.lg,
    // backgroundColor: COLORS.white,
    // borderRadius: BORDER_RADIUS.md,
    // ...SHADOWS.small,
  },
  cardTitle: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.primary,
    ...FONTS.bold,
    marginBottom: SPACING.lg,
  },

  // Bio Section
  bioText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    ...FONTS.regular,
    lineHeight: 22,
    textAlign: "left",
  },

  // Stats Section
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: SPACING.lg,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.primary,
    ...FONTS.medium,
  },
  statLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    ...FONTS.regular,
    marginTop: SPACING.xs,
  },

  // Personal Records
  prsSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    ...FONTS.bold,
    marginBottom: SPACING.md,
  },
  prItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray || "#f0f0f0",
  },
  prItemWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background || "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  itemWithIcon: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: SPACING.sm,
  },
  prContent: {
    flex: 1,
  },
  prExercise: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    ...FONTS.medium,
  },
  prSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    ...FONTS.regular,
    marginTop: SPACING.xs,
  },
  prDate: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textMuted,
    ...FONTS.regular,
  },

  // Experience Section
  experienceItem: {
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray || "#f0f0f0",
  },
  experienceContent: {
    flex: 1,
    gap: 2,
  },
  experienceTitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    ...FONTS.bold,
  },
  experienceSubtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.primary,
    ...FONTS.medium,
    marginTop: SPACING.xs,
  },
  experienceDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    ...FONTS.regular,
    marginTop: SPACING.xs,
    lineHeight: 20,
  },
  experienceDates: {
    alignSelf: "flex-start",
  },

  // Certification Section
  certificationItem: {
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray || "#f0f0f0",
    position: "relative",
  },
  certificationContent: {
    flex: 1,
  },
  certificationTitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    ...FONTS.bold,
  },
  certificationSubtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.primary,
    ...FONTS.medium,
    marginTop: SPACING.xs,
  },
  credentialId: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textMuted,
    ...FONTS.regular,
    marginTop: SPACING.xs,
  },
  certificationDates: {
    marginBottom: SPACING.sm,
  },
  dateText: {
    marginTop: 6,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    ...FONTS.regular,
  },
  expiredText: {
    color: COLORS.error || "#ff4444",
  },

  // Status Badge
  statusBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  activeBadge: {
    backgroundColor: "#e8f5e8",
  },
  inactiveBadge: {
    backgroundColor: "#ffeaea",
  },
  statusText: {
    fontSize: FONTS.sizes.xs,
    ...FONTS.medium,
  },
  activeStatusText: {
    color: "#2d5a2d",
  },
  inactiveStatusText: {
    color: "#8b0000",
  },

  bottomSpacing: {
    height: SPACING.xl,
  },
});
