import { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { COLORS, FONTS, SPACING } from "../constants/theme";
import useOnBoarding from "../hooks/useOnBoarding";

export default function SSOCallback() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const { serverFault, status } = useOnBoarding();

  useEffect(() => {
    // Add a small delay to let auth state settle
    const timer = setTimeout(() => {
      console.log(
        "SSO Callback - status:",
        status,
        "isSignedIn:",
        isSignedIn,
        "isLoaded:",
        isLoaded
      );
      if (isLoaded) {
        if (isSignedIn) {
          if (status !== undefined) {
            if (status === true) {
              router.replace("/(tabs)/home");
            } else {
              router.replace("/(onboarding)/personal-stats");
            }
          }
        } else {
          router.replace("/(auth)/login");
        }
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [isLoaded, isSignedIn, status, router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.secondary} />
      <Text style={styles.loadingText}>Completing sign in...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
  },
  loadingText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    textAlign: "center",
  },
});
