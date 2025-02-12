import React, { useState } from 'react';
import './SignUp.css';
import google_icon from '/icons8-google-48.png';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  // Form field states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Error message states
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleGoogleRegister = () => {
    console.log('Google register clicked'); // Replace with actual Google sign-up logic
  };

  const login = () => {
    navigate('/');
  };

  // Validation functions for each field:

  const validateFullName = () => {
    if (fullName.trim() === '') {
      setFullNameError('Full Name is required');
      return false;
    }
    // Optionally, require the full name to contain at least two words.
    const nameRegex = /^[A-Za-z]+( [A-Za-z]+)+$/;
    if (!nameRegex.test(fullName.trim())) {
      setFullNameError('Please enter your full name');
      return false;
    }
    setFullNameError('');
    return true;
  };

  const validateEmail = () => {
    if (email.trim() === '') {
      setEmailError('Email is required');
      return false;
    }
    const emailRegex = /^[A-Za-z\._\-\d]+@[A-Za-z]+\.[a-z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (password === '') {
      setPasswordError('Password is required');
      return false;
    }
    // For example, enforce a minimum length of 6 characters.
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = () => {
    if (confirmPassword === '') {
      setConfirmPasswordError('Confirm Password is required');
      return false;
    }
    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate each field
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    // If any field fails validation, set a submit error message
    if (!isFullNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      setSubmitError('Please fix the errors above');
      // Remove the submit error after 3 seconds (optional)
      setTimeout(() => setSubmitError(''), 3000);
      return;
    }

    // All validations passed – proceed with the registration logic
    console.log('Form submitted successfully', { fullName, email, password });
    // Reset form fields or navigate to another page as needed
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={validateFullName}
          />
          {fullNameError && <span className="error">{fullNameError}</span>}
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
          />
          {emailError && <span className="error">{emailError}</span>}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
          />
          {passwordError && <span className="error">{passwordError}</span>}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={validateConfirmPassword}
          />
          {confirmPasswordError && <span className="error">{confirmPasswordError}</span>}
        </div>
        {submitError && <div className="error submit-error">{submitError}</div>}
        <button type="submit" className="signup-button">Register</button>
      </form>
      <button onClick={handleGoogleRegister} className="google-signup-button">
        <img src={google_icon} alt="Google" />
        Sign up with Google
      </button>
      <p>
        Already have an account? <a href="#" onClick={login}>Login</a>
      </p>
    </div>
  );
}

export default SignUp;
