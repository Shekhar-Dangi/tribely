import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { View, Text, StyleSheet } from "react-native";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

// Initialize Convex client
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

function InitialLayout() {
  const { isLoaded } = useAuth();

  // Show loading screen while Clerk is initializing
  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="sso-callback" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="leaderboard" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="workout-logs" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <InitialLayout />
        </ClerkLoaded>
      </ClerkProvider>
    </ConvexProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "500",
  },
});
