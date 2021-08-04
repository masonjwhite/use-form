import React from 'react';
import useForm from '../../useForm';

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

function UserDetailsForm() {
    const alertDetails = (values) => alert(JSON.stringify(values));
  
    const { 
      values, 
      errors, 
      handleChange, 
      handleSubmit, 
      reset,
    } = useForm(formSchema, alertDetails);
  
    const errorStyle = { color: 'red' };

    return (
        <form onSubmit={handleSubmit}>
          <div>
            <label for="firstName">First Name</label>
            <input 
              id="firstName"
              type='text' 
              name='firstName' 
              value={values.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p style={errorStyle}>First must be a valid string.</p>}
          </div>
          <div>
            <label for="lastName">Last Name</label>
            <input 
              id="lastName"
              type='text' 
              name='lastName' 
              value={values.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p style={errorStyle}>Last name must be a valid string.</p>}
          </div>
          <div>
            <label for="age">Enter your age:</label>
            <input 
              id="age"
              type='number' 
              name='age' 
              value={values.age}
              onChange={handleChange}
            />
            {errors.age && <p style={errorStyle}>Age must be greater than 0.</p>}
          </div>
          <div>
            <label for="color">Pick your favorite color:</label>
            <select id="color" name="color" value={values.color} onChange={handleChange}>
              <option value={''}>Choose a color</option>
              <option value="blue">Blue</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
            </select>
            {errors.color && <p style={errorStyle}>Color must be one of the provided options.</p>}
          </div>
          <div>
            <p>Pick your favorite programming language:</p>
            <input type="radio" id="javascript" name="language" value="javascript" onChange={handleChange} />
            <label for="javascript">JavaScript</label>
            <input type="radio" id="python" name="language" value="python" onChange={handleChange} />
            <label for="python">Python</label>
            <input type="radio" id="java" name="language" value="java" onChange={handleChange} />
            <label for="Java">Java</label>
            {errors.language && <p style={errorStyle}>Favorite programming language must be one of the provided options.</p>}
          </div>
          <button type="reset" onClick={reset}>Cancel</button>
          <button type="submit">Submit</button>
        </form>
    )
}

export default UserDetailsForm
