import React, { useState } from 'react';
import './Login.css';
import google_icon from '/icons8-google-48.png';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Login: React.FC = () => {
  const navigate = useNavigate();

  // Form field state variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Error message state variables
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleGoogleLogin = (): void => {
    console.log('Google login clicked'); // Replace with actual Google login logic
  };

  const register = (): void => {
    navigate('/signup');
  };

  // Validate Email Field
  const validateEmail = (value: string = email): boolean => {
    if (value.trim() === '') {
      setEmailError('Email is required');
      return false;
    }
    // Basic email regex: adjust as needed for your validation requirements
    const emailRegex = /^[A-Za-z\._\-\d]+@[A-Za-z]+\.[a-z]{2,}$/;
    if (!emailRegex.test(value.trim())) {
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Validate Password Field
  const validatePassword = (value: string = password): boolean => {
    if (value.trim() === '') {
      setPasswordError('Password is required');
      return false;
    }
    // Optionally enforce additional password requirements (e.g., minimum length)
    setPasswordError('');
    return true;
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Validate fields using current state values
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    // If any field is invalid, display a submit error message and prevent submission
    if (!isEmailValid || !isPasswordValid) {
      setSubmitError('Please fix the errors above');
      setTimeout(() => setSubmitError(''), 3000);
      return;
    }

    // If all validations pass, proceed with login logic
    console.log('Form submitted', { email, password });
    // Replace the following with your login logic
  };

  // Toggle password visibility state
  const togglePasswordVisibility = (): void => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="login-container">
      <h1>User Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              const val = e.currentTarget.value;
              setEmail(val);
              validateEmail(val);
            }}
            required
          />
          {emailError && <span className="error">{emailError}</span>}
        </div>
        <div className="form-group">
          {/* Wrap the password input and eye icon in a relative container */}
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                const val = e.currentTarget.value;
                setPassword(val);
                validatePassword(val);
              }}
              required
              style={{ paddingRight: '40px' }} // extra space for the icon
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {passwordError && <span className="error">{passwordError}</span>}
        </div>
        {submitError && <div className="error submit-error">{submitError}</div>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <button onClick={handleGoogleLogin} className="google-login-button">
        <img src={google_icon} alt="Google" />
        Google Login
      </button>
      <p>
        Don't have an account? <a href="#" onClick={register}>Sign up</a>
      </p>
    </div>
  );
};

export default Login;
