import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  // Wait for Clerk to load and be ready
  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // If user is signed in, redirect to main app
  if (isSignedIn) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ title: "Login", headerShown: false }}
      />
    </Stack>
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
