import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Types matching our Convex schema
export interface PersonalRecord {
  exerciseName: string;
  subtitle: string;
  date: string; // Will be converted to timestamp later
}

export interface Experience {
  title: string;
  subtitle: string;
  description: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface Certification {
  title: string;
  subtitle: string;
  description: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  isActive: boolean;
}

export interface OnboardingData {
  personalStats: {
    height: string;
    weight: string;
    bodyFat: string;
    personalRecords: PersonalRecord[];
  };
  category: "individual" | "gym" | "brand" | null;
  experiences: Experience[];
  certifications: Certification[];
  socialLinks: {
    instagram: string;
    youtube: string;
    twitter: string;
  };
}

// Initial empty state
const initialData: OnboardingData = {
  personalStats: {
    height: "",
    weight: "",
    bodyFat: "",
    personalRecords: [{ exerciseName: "", subtitle: "", date: "" }],
  },
  category: null,
  experiences: [
    {
      title: "",
      subtitle: "",
      description: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
    },
  ],
  certifications: [
    {
      title: "",
      subtitle: "",
      description: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      isActive: false,
    },
  ],
  socialLinks: {
    instagram: "",
    youtube: "",
    twitter: "",
  },
};

interface OnboardingContextType {
  data: OnboardingData;
  updatePersonalStats: (
    stats: Partial<OnboardingData["personalStats"]>
  ) => void;
  updateCategory: (category: OnboardingData["category"]) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateCertifications: (certifications: Certification[]) => void;
  updateSocialLinks: (
    socialLinks: Partial<OnboardingData["socialLinks"]>
  ) => void;
  clearData: () => void;
  loadSavedData: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

const STORAGE_KEY = "tribely_onboarding_data";

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<OnboardingData>(initialData);

  // Load saved data on mount
  useEffect(() => {
    loadSavedData();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    saveData();
  }, [data]);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving onboarding data:", error);
    }
  };

  const loadSavedData = useCallback(async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setData(parsedData);
      }
    } catch (error) {
      console.error("Error loading onboarding data:", error);
    }
  }, []);

  const updatePersonalStats = useCallback(
    (stats: Partial<OnboardingData["personalStats"]>) => {
      setData((prev) => ({
        ...prev,
        personalStats: { ...prev.personalStats, ...stats },
      }));
    },
    []
  );

  const updateCategory = useCallback((category: OnboardingData["category"]) => {
    setData((prev) => ({ ...prev, category }));
  }, []);

  const updateExperiences = useCallback((experiences: Experience[]) => {
    setData((prev) => ({ ...prev, experiences }));
  }, []);

  const updateCertifications = useCallback(
    (certifications: Certification[]) => {
      setData((prev) => ({ ...prev, certifications }));
    },
    []
  );

  const updateSocialLinks = useCallback(
    (socialLinks: Partial<OnboardingData["socialLinks"]>) => {
      setData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, ...socialLinks },
      }));
    },
    []
  );

  const clearData = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setData(initialData);
    } catch (error) {
      console.error("Error clearing onboarding data:", error);
    }
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        data,
        updatePersonalStats,
        updateCategory,
        updateExperiences,
        updateCertifications,
        updateSocialLinks,
        clearData,
        loadSavedData,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingData() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error(
      "useOnboardingData must be used within an OnboardingProvider"
    );
  }
  return context;
}
