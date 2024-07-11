import { useState, useEffect } from 'react';

interface ValidationRule {
  placeholder: string;
  regex?: RegExp;
  errorMessage: string;
  minLength?: number;
  verifyPasswordMatch?: (value: string | number, values: Values) => string;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface Values {
  [key: string]: string;
}

interface useValidationProps {
  values: Values;
  validationRules: ValidationRules;
}
export const useValidation = ({
  values,
  validationRules,
}: useValidationProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const newErrors: { [key: string]: string } = {};
    for (const [field, rule] of Object.entries(validationRules)) {
      if (!values[field]) {
        newErrors[field] = rule.placeholder;
      } else if (rule.regex && !rule.regex.test(values[field])) {
        newErrors[field] = rule.errorMessage;
      } else if (rule.minLength && values[field].length < rule.minLength) {
        newErrors[field] = rule.errorMessage;
      } else if (rule.verifyPasswordMatch) {
        const customError = rule.verifyPasswordMatch(values[field], values);
        if (customError) {
          newErrors[field] = customError;
        }
      }
    }
    setErrors(newErrors);
  }, [values, validationRules]);

  const isComplete = Object.keys(errors).length === 0;

  return { errors, isComplete };
};
