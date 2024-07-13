import { useState, useEffect } from 'react';
import { valuesType } from '@utils/validationRules';

interface ValidationRule {
  placeholder: string;
  errorMessage: string;
  regex?: RegExp;
  minLength?: number;
  verifyPasswordMatch?: (value: string, values: valuesType) => string;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface useValidationProps {
  values: valuesType;
  validationRules: ValidationRules;
}

const validateField = (
  field: string,
  value: string,
  rule: ValidationRule,
  values: valuesType
) => {
  if (!value) {
    return rule.placeholder;
  }
  if (rule.regex && !rule.regex.test(value)) {
    return rule.errorMessage;
  }
  if (rule.minLength && value.length < rule.minLength) {
    return rule.errorMessage;
  }
  if (rule.verifyPasswordMatch) {
    return rule.verifyPasswordMatch(value, values);
  }
  return '';
};

export const useValidation = ({
  values,
  validationRules,
}: useValidationProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const newErrors = Object.entries(validationRules).reduce(
      (acc, [field, rule]) => {
        const error = validateField(field, values[field], rule, values);
        if (error) acc[field] = error;
        return acc;
      },
      {} as { [key: string]: string }
    );

    setErrors(newErrors);
  }, [values, validationRules]);

  const isComplete = Object.keys(errors).length === 0;

  return { errors, isComplete };
};
