import { useState } from 'react';

function buildInitialState(schema) {
  let initialState = {};

  Object.keys(schema).forEach((key) => {
    initialState[key] = schema[key].initialValue;
  });

  return initialState;
}

function validateForm(schema, formValues) {
  let errors = {};

  const validationResults = Object
    .keys(schema)
    // Use `.map()` instead of `.every()` because the latter short circuits and wouldn't evaluate all fields
    .map(key => {
      const validator = schema[key].validator || null;
      const isRequired = schema[key].required || false;
      const value = formValues[key] || null;
      
      const isValid = validator ? validator(value, formValues) : true;
      const hasRequiredValue = isRequired ? value : true;

      if (!isValid || !hasRequiredValue) {
          errors[key] = true;
          return false;
      }
  
      return true;
    });

  const isValidForm = validationResults.every(r => r);

  return { isValidForm, errors };
}

const useForm = (schema, submitFn) => {
  if (!schema || typeof schema !== 'object') {
    throw new Error('Please provide a valid form schema to `useForm`.')
  }

  if (!submitFn || typeof submitFn !== 'function') {
    throw new Error('Please provide a valid submit function to `useForm.`');
  }

  const initialState = buildInitialState(schema);
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValidForm, errors } = validateForm(schema, values);
    
    if (!isValidForm) {
      return setErrors(errors);
    }

    await submitFn(values);
    reset();
  };

  const reset = () => {
    setErrors({});
    setValues(initialState);
  };

  return { values, errors, handleChange, handleSubmit, reset, manuallySetFormValues: setValues, };
};

export default useForm;