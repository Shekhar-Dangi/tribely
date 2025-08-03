import { useAuth, useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function useOnBoarding(): {
  serverFault?: boolean | undefined;
  status?: boolean;
  loading: boolean;
} {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  const convexUser = useQuery(
    api.users.getUserByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );

  console.log("useOnBoarding hook:", {
    isLoaded,
    isSignedIn,
    userId: user?.id,
    convexUser: convexUser
      ? {
          id: convexUser._id,
          onBoardingStatus: convexUser.onBoardingStatus,
        }
      : convexUser,
  });

  // If auth is not loaded yet, we're loading
  if (!isLoaded) {
    console.log("Auth not loaded, returning loading: true");
    return { loading: true };
  }

  // If user is not signed in, no need to check onboarding
  if (!isSignedIn || !user?.id) {
    console.log("User not signed in, returning status: false");
    return { loading: false, serverFault: false, status: false };
  }

  // If convexUser is still undefined, we're still loading from Convex
  if (convexUser === undefined) {
    console.log("ConvexUser still loading, returning loading: true");
    return { loading: true };
  }

  // If convexUser is null, user doesn't exist in Convex (server fault or new user)
  if (convexUser === null) {
    console.log("ConvexUser is null, returning serverFault: true");
    return { loading: false, serverFault: true, status: false };
  }

  // User exists, return their onboarding status
  const result = {
    loading: false,
    serverFault: false,
    status: convexUser.onBoardingStatus,
  };
  console.log("useOnBoarding final result:", result);
  return result;
}
