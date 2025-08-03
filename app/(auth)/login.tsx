import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { Redirect, router, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";

import {
  COLORS,
  FONTS,
  SPACING,
  SHADOWS,
  BORDER_RADIUS,
} from "../../constants/theme";

import { useAuth, useSSO } from "@clerk/clerk-expo";
import { useCallback, useEffect } from "react";

export default function Login() {
  const { startSSOFlow } = useSSO();
  const { isSignedIn, isLoaded } = useAuth();
  if (isLoaded && isSignedIn) {
    <Redirect href={"/"} />;
  }

  const handleGoogleSignIn = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl: AuthSession.makeRedirectUri({ path: "/sso-callback" }),
        });

      // If sign in was successful, set the active session
      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        // Don't manually redirect - let the auth state change trigger automatic redirects
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);
  return (
    <View style={styles.scrollContainer}>
      <View style={styles.heroContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>TRIBELY</Text>
          <Text style={styles.tagline}>Your Professional Fitness Network</Text>
        </View>
      </View>

      {/* Features Highlights */}
      <View style={styles.featuresContainer}>
        <View style={styles.featureItem}>
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={COLORS.secondary}
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>
            Connect with like-minded gym enthusiasts
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={COLORS.secondary}
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>
            Showcase your fitness journey & certifications
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={COLORS.secondary}
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>
            Log workouts with voice & AI insights
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={COLORS.secondary}
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>
            Monetize your expertise as a trainer
          </Text>
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaContainer}>
        <Text style={styles.ctaTitle}>Ready to join your tribe?</Text>
        <Text style={styles.ctaSubtitle}>
          Join thousands of fitness professionals building their network
        </Text>

        <TouchableOpacity
          style={[styles.googleButton]}
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}
        >
          <View style={styles.googleButtonContent}>
            <Ionicons
              name="logo-google"
              size={20}
              color={COLORS.white}
              style={styles.googleIconImage}
            />

            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree to our{" "}
          <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },

  // Hero Section
  heroContainer: {
    alignItems: "center",
    paddingTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoBadge: {
    width: 72,
    height: 72,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  logoIcon: {
    fontSize: 32,
  },
  logoText: {
    fontSize: FONTS.sizes.xxl,
    ...FONTS.bold,
    color: COLORS.primary,
    letterSpacing: 3,
    marginBottom: SPACING.xs,
  },
  tagline: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    textAlign: "center",
  },

  // Features Section
  featuresContainer: {
    marginBottom: SPACING.xxl,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: COLORS.background,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  featureIcon: {
    marginRight: SPACING.md,
  },
  featureText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    ...FONTS.medium,
    flex: 1,
    lineHeight: 20,
  },

  // CTA Section
  ctaContainer: {
    alignItems: "center",
    paddingBottom: SPACING.xl,
  },
  ctaTitle: {
    fontSize: FONTS.sizes.xl,
    ...FONTS.bold,
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  ctaSubtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 320,
    marginBottom: SPACING.xl,
  },

  // Google Button
  googleButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    width: "100%",
    maxWidth: 320,
    marginBottom: SPACING.lg,
    ...SHADOWS.button,
  },
  googleButtonDisabled: {
    opacity: 0.7,
    backgroundColor: COLORS.textMuted,
  },
  googleButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.xs,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  googleIcon: {
    color: COLORS.googleBlue,
    fontSize: FONTS.sizes.sm,
    ...FONTS.bold,
  },
  loadingIndicator: {
    marginRight: SPACING.sm,
  },
  googleButtonText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
    ...FONTS.medium,
  },

  // Terms & Footer
  termsText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 18,
    maxWidth: 320,
  },
  termsLink: {
    color: COLORS.secondary,
    ...FONTS.medium,
  },
  footer: {
    paddingBottom: Platform.OS === "ios" ? SPACING.lg : SPACING.md,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  footerText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textMuted,
    opacity: 0.8,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  googleIconImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
