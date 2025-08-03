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
  if (isSignedIn && user) {
    if (convexUser && convexUser.onBoardingStatus === true) {
      return { loading: false, serverFault: false, status: true };
    } else if (convexUser && convexUser.onBoardingStatus === false) {
      return { loading: false, serverFault: false, status: false };
    } else {
      return { loading: false, serverFault: true, status: false };
    }
  }
  return { loading: true };
}
