import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Link, router } from "expo-router";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import {
  COLORS,
  FONTS,
  SPACING,
  SHADOWS,
  BORDER_RADIUS,
} from "../../constants/theme";
import { DataTab } from "../../components/profile";

export default function Profile() {
  const { signOut } = useClerk();
  const { user: clerkUser } = useUser();
  const [activeTab, setActiveTab] = useState("posts");

  // Get user data from Convex
  const convexUser = useQuery(
    api.users.getUserByClerkId,
    clerkUser?.id ? { clerkId: clerkUser.id } : "skip"
  );

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          {convexUser?.avatarUrl || clerkUser?.imageUrl ? (
            <Image
              source={{ uri: convexUser?.avatarUrl || clerkUser?.imageUrl }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {(convexUser?.username || clerkUser?.fullName || "U")
                  .charAt(0)
                  .toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.topDetails}>
          {/* User Info */}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {clerkUser?.fullName || convexUser?.username || "User"}
            </Text>
            <Text style={styles.userHandle}>
              @{convexUser?.username || "elemental"}
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.trainButton}>
              <Text style={styles.trainButtonText}>Train</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "posts" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("posts")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "posts" && styles.activeTabText,
            ]}
          >
            Posts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "data" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("data")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "data" && styles.activeTabText,
            ]}
          >
            Data
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>
        {activeTab === "posts" ? (
          <View style={styles.contentContainer}>
            <Text style={styles.contentPlaceholder}>
              User Posts will go here
            </Text>
          </View>
        ) : (
          <DataTab
            bio={convexUser?.bio}
            stats={convexUser?.stats}
            experiences={convexUser?.experiences}
            certifications={convexUser?.certifications}
            affiliation={convexUser?.affiliation}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // Profile Header
  profileHeader: {
    display: "flex",
    flexDirection: "row",
    gap: SPACING.lg,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.small,
  },

  // Avatar
  avatarContainer: {
    alignItems: "flex-start",
    marginBottom: SPACING.lg,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: COLORS.secondary,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: COLORS.secondary,
  },
  avatarText: {
    fontSize: 48,
    ...FONTS.bold,
    color: COLORS.text,
  },

  // User Info
  userInfo: {
    alignItems: "flex-start",
    marginBottom: SPACING.lg,
  },
  topDetails: {
    display: "flex",
    alignItems: "flex-start",
  },
  userName: {
    fontSize: FONTS.sizes.lg,
    textAlign: "left",
    ...FONTS.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  userHandle: {
    textAlign: "left",
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    ...FONTS.regular,
  },

  // Action Buttons
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: SPACING.md,
  },
  followButton: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    minWidth: 100,
    alignItems: "center",
  },
  followButtonText: {
    color: COLORS.secondary,
    fontSize: FONTS.sizes.md,
    ...FONTS.medium,
  },
  trainButton: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    minWidth: 100,
    alignItems: "center",
    ...SHADOWS.small,
  },
  trainButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    ...FONTS.medium,
  },

  // Content Container
  contentContainer: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  contentPlaceholder: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textMuted,
    textAlign: "center",
    ...FONTS.regular,
  },

  // Tab Navigation
  tabContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tabButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabButton: {
    borderBottomColor: COLORS.secondary,
  },
  tabText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    ...FONTS.medium,
  },
  activeTabText: {
    color: COLORS.secondary,
    ...FONTS.bold,
  },
  tabContent: {
    flex: 1,
  },
});
