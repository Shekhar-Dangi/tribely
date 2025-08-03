import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SPACING, SHADOWS } from "../constants/theme";
import { Link, Redirect } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import useOnBoarding from "../hooks/useOnBoarding";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

const { height } = Dimensions.get("window");

export default function Welcome() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const { loading, serverFault, status } = useOnBoarding();

  // Get user data from Convex to check onboarding status
  const convexUser = useQuery(
    api.users.getUserByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );
  console.log(convexUser);

  // Wait for Clerk to load
  if (!isLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!loading && isSignedIn) {
    if (status) return <Redirect href="/(tabs)/home" />;
    else if (status === false)
      return <Redirect href="/(onboarding)/personal-stats" />;
  }
  return (
    <ImageBackground
      source={require("../assets/onboard.jpg")}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={[
          "rgba(26, 26, 26, 0.2)",
          "rgba(26, 26, 26, 0.6)",
          "rgba(26, 26, 26, 0.9)",
        ]}
        style={styles.gradientOverlay}
      />
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.appName}>TRIBELY</Text>
          <Text style={styles.tagline}>LinkedIn for Gym Bros</Text>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.welcomeText}>
            Connect with gym enthusiasts, share workouts, and grow your fitness
            network
          </Text>

          <Link href="/(auth)/login" asChild>
            <TouchableOpacity
              style={styles.getStartedButton}
              activeOpacity={0.8}
            >
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingTop: height * 0.15,
    paddingBottom: height * 0.08,
  },
  headerContainer: {
    alignItems: "center",
  },
  appName: {
    fontSize: FONTS.sizes.xxl,
    ...FONTS.bold,
    color: COLORS.white,
    letterSpacing: 3,
  },
  tagline: {
    fontSize: FONTS.sizes.md,
    color: COLORS.mediumGray,
    marginTop: SPACING.sm,
  },
  bottomContainer: {
    alignItems: "center",
  },
  welcomeText: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.white,
    textAlign: "center",
    lineHeight: 28,
    marginBottom: SPACING.xl,
    maxWidth: 320,
  },
  getStartedButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
    ...SHADOWS.small,
  },
  getStartedButtonText: {
    fontSize: FONTS.sizes.md,
    ...FONTS.bold,
    color: COLORS.primary,
  },
});
