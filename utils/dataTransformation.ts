// Data transformation utilities for converting onboarding data to Convex schema format

import { OnboardingData } from "../contexts/OnboardingContext";

// Convert MM/YYYY date string to timestamp
export function dateStringToTimestamp(dateString: string): number {
  if (!dateString.trim()) {
    throw new Error("Date string is required");
  }

  const [month, year] = dateString.split("/").map(Number);
  if (!month || !year || month < 1 || month > 12) {
    throw new Error("Invalid date format. Expected MM/YYYY");
  }

  // Create date at the first day of the month
  const date = new Date(year, month - 1, 1);
  return date.getTime();
}

// Transform personal stats for Convex
export function transformPersonalStats(
  personalStats: OnboardingData["personalStats"]
) {
  const height = parseFloat(personalStats.height);
  const weight = parseFloat(personalStats.weight);
  const bodyFat = personalStats.bodyFat.trim()
    ? parseFloat(personalStats.bodyFat)
    : undefined;

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Height and weight must be valid numbers");
  }

  // Filter out empty personal records and transform dates
  const personalRecords = personalStats.personalRecords
    .filter(
      (pr) => pr.exerciseName.trim() && pr.subtitle.trim() && pr.date.trim()
    )
    .map((pr) => ({
      exerciseName: pr.exerciseName.trim(),
      subtitle: pr.subtitle.trim(),
      date: dateStringToTimestamp(pr.date),
    }));

  return {
    height,
    weight,
    bodyFat,
    personalRecords: personalRecords.length > 0 ? personalRecords : undefined,
  };
}

// Transform experiences for Convex
export function transformExperiences(
  experiences: OnboardingData["experiences"]
) {
  // Filter out completely empty experiences
  const validExperiences = experiences.filter(
    (exp) => exp.title.trim() || exp.subtitle.trim() || exp.description.trim()
  );

  if (validExperiences.length === 0) {
    return undefined;
  }

  return validExperiences.map((exp) => ({
    title: exp.title.trim(),
    subtitle: exp.subtitle.trim() || undefined,
    description: exp.description.trim() || undefined,
    logoUrl: undefined, // Not collected in onboarding
    startDate: dateStringToTimestamp(exp.startDate),
    endDate: exp.isCurrent ? undefined : dateStringToTimestamp(exp.endDate),
    isCurrent: exp.isCurrent,
  }));
}

// Transform certifications for Convex
export function transformCertifications(
  certifications: OnboardingData["certifications"]
) {
  // Filter out completely empty certifications
  const validCertifications = certifications.filter(
    (cert) =>
      cert.title.trim() || cert.subtitle.trim() || cert.description.trim()
  );

  if (validCertifications.length === 0) {
    return undefined;
  }

  return validCertifications.map((cert) => ({
    title: cert.title.trim(),
    subtitle: cert.subtitle.trim() || undefined,
    description: cert.description.trim() || undefined,
    logoUrl: undefined, // Not collected in onboarding
    issueDate: dateStringToTimestamp(cert.issueDate),
    expiryDate: cert.isActive
      ? undefined
      : dateStringToTimestamp(cert.expiryDate),
    credentialId: cert.credentialId.trim() || undefined,
    isActive: cert.isActive,
  }));
}

// Transform social links for Convex
export function transformSocialLinks(
  socialLinks: OnboardingData["socialLinks"]
) {
  const hasAnyLink =
    socialLinks.instagram.trim() ||
    socialLinks.youtube.trim() ||
    socialLinks.twitter.trim();

  if (!hasAnyLink) {
    return undefined;
  }

  return {
    instagram: socialLinks.instagram.trim() || undefined,
    youtube: socialLinks.youtube.trim() || undefined,
    twitter: socialLinks.twitter.trim() || undefined,
  };
}

// Transform complete onboarding data for Convex submission
export function transformOnboardingDataForSubmission(data: OnboardingData) {
  try {
    const stats = transformPersonalStats(data.personalStats);
    const experiences = transformExperiences(data.experiences);
    const certifications = transformCertifications(data.certifications);
    const socialLinks = transformSocialLinks(data.socialLinks);

    // Map category to affiliation for gym/brand types
    const affiliation =
      data.category === "gym" || data.category === "brand"
        ? `${data.category}_user` // Could be enhanced later with actual gym/brand names
        : undefined;

    return {
      stats,
      experiences,
      certifications,
      socialLinks,
      affiliation,
    };
  } catch (error) {
    console.error("Error transforming onboarding data:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Data transformation failed: ${errorMessage}`);
  }
}
