import { useState, useEffect } from 'react';

export const useValidation = (values, validationRules) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newErrors = {};
    for (const [field, rule] of Object.entries(validationRules)) {
      if (!values[field]) {
        newErrors[field] = rule.placeholder;
      } else if (rule.regex && !rule.regex.test(values[field])) {
        newErrors[field] = rule.errorMessage;
      } else if (rule.minLength && values[field].length < rule.minLength) {
        newErrors[field] = rule.errorMessage;
      } else if (rule.customValidator) {
        const customError = rule.customValidator(values[field], values);
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
