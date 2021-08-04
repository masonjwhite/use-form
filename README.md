# `useForm` Resuable Form Hook

This project is intended to provide a simple, reusable, custom hook for repetitive/boilerplate form logic in React projects.

It is inspired by libraries such as [Formik](https://www.npmjs.com/package/formik) and [react-hook-form](https://www.npmjs.com/package/react-hook-form) but with a heavier focus on simplicity over breadth of features.

## `useForm` parameters:

1. `formSchema` \*required
   - An object that contains the schema information for a form.
   - Used by `useForm` to assign initial input values, validate values upon submit and determine if a field is required.
   - For information on building a form schema see "Form Schema Building".
   - **Idea for expansion**: support [Yup](https://www.npmjs.com/package/yup) schemas


2. `submitFunction` \*required
   - A function that is called upon the submission of the form
   - Before this function is run, the form is validated
   - `event.target.preventDefault()` called by default
   - Upon completion of this function, the form will be reset automatically
   - **Note**: submit functions can be asynchronous and are awaited by default

## Values exposed by `useForm`

- `values`
  - An object containing the form's values
  - **Usage**

        <input
          id="firstName"
          type='text'
          name='firstName'
          value={values.firstName} // References the input's current value
          onChange={handleChange}
        />

- `errors`
  - An object containing any validation errors that have occured upon submitting the form
  - If a field contains an invalid value at the time of submission its property will be set to `true` in the `errors` object
  - **Usage**

        // Display an error if it exists in the errors object
        
        {errors.firstName && (
          <p className="error">
            First name must be a valid string.
          </p>
        )}

## Methods exposed by `useForm`

- `handleChange`
  - A reusable handle change function that will automatically track an input's value as it changes -**Usage**

      <input
        id="firstName"
        type='text'
        name='firstName'
        value={values.firstName}
        onChange={handleChange} // Wire the input up to `useForm` to track its value
      />

  - If you need to support a form mechanism that does not have an `onChange` event (e.g. buttons), see manuallySetFormValues
  
- `handleSubmit`
  
  - The `submitFunction` parameter provided to the `useForm` hook but encapsulated with the form's values and validation/reset logic. 
  - **Usage**
      
        <form onSubmit={handleSubmit}>

- `reset`
  - A function that when called, will reset the form's input values to their initial state as defined in the `formSchema` parameter provided to the `useForm` hook 
  
  - **Usage**

        <button type="reset" onClick={reset}>
          Cancel
        </button>

- `manuallySetFormValues`
  - A function used to provide a mechanism for untraditional form inputs (e.g. buttons) to track their state via `useForm`
  - **Usage**

        <button
          onClick={
            () => manuallySetFormValues((prevState) => {
              return { ...prevState, myValue: 'Something exciting!' }
            })
          } 
        >
          Click me!
        </button>

## Form schema building

- The form schema object is a declarative way to tell `useForm` how to handle your form. It is simply an object where each key corresponds to an input in the form.

- Each key can have the following properties
  - `initialValue` \*required
    - The input's initial value (will also be used when `reset` is called)
  - `required` \*optional
    - Whether or not the input is required (if it is required and no value is provided upon submit, the form validation will fail)
  - `validator` \*optional
    - The validator function that will be called when the form is submitted
    - Is called with `value` and `formValues` to facilitate cross form validation
  - **Note**: If you are using `manuallySetFormValues` for a non-traditional form input, you still have to have a key for it within the form schema object.

- **Example**

      const formSchema = {
        firstName: {
          required: true,
          initialValue: '',
        },
        lastName: {
          initialValue: '',
        },
        age: {
          initialValue: '',
          required: true,
          validator: (value) => value > 0,
        },
        color: {
          initialValue: '',
          validator: (value) => ['blue', 'red', 'green', 'yellow'].includes(value),
        },
        language: {
          initialValue: null,
          validator: (value) => ['javascript', 'python', 'java'].includes(value),
        }
      };

## Full Form Example
Please see the `UserDetailsForm` component in the `examples` directory
