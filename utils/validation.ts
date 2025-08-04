// Validation utilities for onboarding forms

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Personal Stats Validation
export function validatePersonalStats(data: {
  height: string;
  weight: string;
  bodyFat: string;
}): ValidationResult {
  const errors: string[] = [];

  // Height validation (required)
  if (!data.height.trim()) {
    errors.push("Height is required");
  } else {
    const heightNum = parseFloat(data.height);
    if (isNaN(heightNum) || heightNum <= 0 || heightNum > 300) {
      errors.push("Height must be a valid number between 1-300 cm");
    }
  }

  // Weight validation (required)
  if (!data.weight.trim()) {
    errors.push("Weight is required");
  } else {
    const weightNum = parseFloat(data.weight);
    if (isNaN(weightNum) || weightNum <= 0 || weightNum > 500) {
      errors.push("Weight must be a valid number between 1-500 kg");
    }
  }

  // Body fat validation (optional)
  if (data.bodyFat.trim()) {
    const bodyFatNum = parseFloat(data.bodyFat);
    if (isNaN(bodyFatNum) || bodyFatNum < 0 || bodyFatNum > 100) {
      errors.push("Body fat must be a valid percentage between 0-100%");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Date validation helper
export function validateDate(dateString: string, fieldName: string): string[] {
  const errors: string[] = [];

  if (!dateString.trim()) {
    errors.push(`${fieldName} is required`);
    return errors;
  }

  // Check format MM/YYYY
  const dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
  if (!dateRegex.test(dateString)) {
    errors.push(`${fieldName} must be in MM/YYYY format (e.g., 01/2024)`);
    return errors;
  }

  // Check if it's a reasonable date
  const [month, year] = dateString.split("/").map(Number);
  const currentYear = new Date().getFullYear();

  if (year < 1950 || year > currentYear + 10) {
    errors.push(
      `${fieldName} year must be between 1950 and ${currentYear + 10}`
    );
  }

  return [];
}

// Category validation
export function validateCategory(category: string | null): ValidationResult {
  const errors: string[] = [];

  if (!category) {
    errors.push("Please select a category");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Experience validation (completely optional, but if provided must be valid)
export function validateExperiences(experiences: any[]): ValidationResult {
  const errors: string[] = [];

  // Filter out completely empty experiences
  const nonEmptyExperiences = experiences.filter(
    (exp) => exp.title.trim() || exp.subtitle.trim() || exp.description.trim()
  );

  // If no experiences provided, that's fine
  if (nonEmptyExperiences.length === 0) {
    return { isValid: true, errors: [] };
  }

  // Validate each non-empty experience
  nonEmptyExperiences.forEach((exp, index) => {
    if (!exp.title.trim()) {
      errors.push(`Experience ${index + 1}: Title is required`);
    }
    if (!exp.subtitle.trim()) {
      errors.push(`Experience ${index + 1}: Company/Organization is required`);
    }
    if (!exp.startDate.trim()) {
      errors.push(`Experience ${index + 1}: Start date is required`);
    } else {
      const startDateErrors = validateDate(
        exp.startDate,
        `Experience ${index + 1} start date`
      );
      errors.push(...startDateErrors);
    }

    // End date validation (only if not current)
    if (!exp.isCurrent && !exp.endDate.trim()) {
      errors.push(
        `Experience ${index + 1}: End date is required (or mark as current)`
      );
    } else if (!exp.isCurrent && exp.endDate.trim()) {
      const endDateErrors = validateDate(
        exp.endDate,
        `Experience ${index + 1} end date`
      );
      errors.push(...endDateErrors);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Certification validation (completely optional, but if provided must be valid)
export function validateCertifications(
  certifications: any[]
): ValidationResult {
  const errors: string[] = [];

  // Filter out completely empty certifications
  const nonEmptyCertifications = certifications.filter(
    (cert) =>
      cert.title.trim() || cert.subtitle.trim() || cert.description.trim()
  );

  // If no certifications provided, that's fine
  if (nonEmptyCertifications.length === 0) {
    return { isValid: true, errors: [] };
  }

  // Validate each non-empty certification
  nonEmptyCertifications.forEach((cert, index) => {
    if (!cert.title.trim()) {
      errors.push(`Certification ${index + 1}: Title is required`);
    }
    if (!cert.subtitle.trim()) {
      errors.push(
        `Certification ${index + 1}: Issuing organization is required`
      );
    }
    if (!cert.issueDate.trim()) {
      errors.push(`Certification ${index + 1}: Issue date is required`);
    } else {
      const issueDateErrors = validateDate(
        cert.issueDate,
        `Certification ${index + 1} issue date`
      );
      errors.push(...issueDateErrors);
    }

    // Expiry date validation (only if not active)
    if (!cert.isActive && !cert.expiryDate.trim()) {
      errors.push(
        `Certification ${index + 1}: Expiry date is required (or mark as never expires)`
      );
    } else if (!cert.isActive && cert.expiryDate.trim()) {
      const expiryDateErrors = validateDate(
        cert.expiryDate,
        `Certification ${index + 1} expiry date`
      );
      errors.push(...expiryDateErrors);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Social Links validation (all optional)
export function validateSocialLinks(socialLinks: any): ValidationResult {
  // All social links are optional, so always valid
  return { isValid: true, errors: [] };
}
