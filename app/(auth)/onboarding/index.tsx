import { Redirect } from "expo-router";

export default function OnboardingIndex() {
  // Redirect to the first step of onboarding
  return <Redirect href="/(auth)/onboarding/personal-stats" />;
}
