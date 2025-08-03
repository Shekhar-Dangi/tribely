import { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { COLORS, FONTS, SPACING } from "../constants/theme";

export default function SSOCallback() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    // Add a small delay to let auth state settle
    const timer = setTimeout(() => {
      if (isLoaded) {
        if (isSignedIn) {
          router.replace("/(tabs)/home");
        } else {
          router.replace("/(auth)/login");
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [isLoaded, isSignedIn, router]);

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
