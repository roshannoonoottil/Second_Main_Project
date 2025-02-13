import React, { useState } from 'react';
import './SignUp.css';
import google_icon from '/icons8-google-48.png';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function SignUp() {
  const navigate = useNavigate();

  // Form field states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Toggle password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const validatePassword = (): boolean => {
    if (password.trim() === '') {
      setPasswordError('Password is required');
      return false;
    }
    // Regex to enforce strong password criteria:
    // - Minimum 8 characters
    // - At least one uppercase letter, one lowercase letter, one number, and one special character
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setPasswordError(
        'Password must be 8+ chars with upper, lower, number & special char'
      );
      return false;
    }
    setPasswordError('');
    return true;
  };
  
  const validateConfirmPassword = (): boolean => {
    if (confirmPassword.trim() === '') {
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
        {/* Full Name Field */}
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
        {/* Email Field */}
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
        {/* Password Field with Eye Toggle */}
        <div className="form-group">
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
              style={{ paddingRight: '40px' }}
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer'
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {passwordError && <span className="error">{passwordError}</span>}
        </div>
        {/* Confirm Password Field with Eye Toggle */}
        <div className="form-group">
          <div style={{ position: 'relative' }}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={validateConfirmPassword}
              style={{ paddingRight: '40px' }}
              required
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer'
              }}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
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
