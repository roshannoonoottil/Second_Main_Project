import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import GoogleAuth from '../GoogleAuth/GoogleAuth';

function SignUp() {
  const navigate = useNavigate();

  // Form field states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Toggle password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error message states
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const login = () => {
    navigate('/');
  };

  // Validation functions:
  const validateFullName = () => {
    if (fullName.trim() === '') {
      setFullNameError('Full Name is required');
      return false;
    }
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

  const validateMobile = () => {
    if (mobile.trim() === '') {
      setMobileError('Mobile number is required');
      return false;
    }
    const mobileRegex = /^[6-9]\d{9}$/; // Ensures a valid 10-digit number starting with 6-9
    if (!mobileRegex.test(mobile.trim())) {
      setMobileError('Enter a valid 10-digit mobile number');
      return false;
    }
    setMobileError('');
    return true;
  };

  const validatePassword = () => {
    if (password.trim() === '') {
      setPasswordError('Password is required');
      return false;
    }
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setPasswordError('Password must be 8+ chars with upper, lower, number & special char');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = () => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isMobileValid = validateMobile();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (!isFullNameValid || !isEmailValid || !isMobileValid || !isPasswordValid || !isConfirmPasswordValid) {
      setSubmitError('Please fix the errors above');
      setTimeout(() => setSubmitError(''), 3000);
      return;
    }

    console.log('Form submitted successfully', { fullName, email, mobile, password });

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('password', password);

    
    try{
      const response = await axios.post('http://localhost:3000/user/signup', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(response.status === 200){
        toast.success("Registration successful!");
        navigate('/')
      }else{
        toast.error(response.data.message);
        
      }
    }catch (err: unknown) {
      // Type assertion to AxiosError
      const error = err as AxiosError;
    
      if (error.response) {
        toast.error('Error uploading file: ' + (error.response.data as string)); // Ensure correct type
      } else if (error.request) {
        toast.error('No response from server. Please try again later.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    
      console.error('Upload Error:', error);
    }
    
  };

  return (
<div className="bg-[#f9f6ee] rounded-md p-6 w-[300px] text-left shadow-lg text-black border border-[#d8d1c3] font-serif"
     style={{ backgroundImage: "url('/paper-texture.png')", backgroundSize: "cover", backgroundBlendMode: "multiply" }}>
  <h1 className="text-xl mb-4 font-bold underline decoration-2 decoration-black text-center">Sign Up</h1>

  <form onSubmit={handleSubmit}>
    {/* Full Name */}
    <div className="mb-3">
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        onBlur={validateFullName}
        className="w-full px-3 py-2 bg-[#fffdf7] text-black text-sm border border-[#ccc] rounded placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-black"
      />
      {fullNameError && <span className="text-red-700 text-xs font-mono">{fullNameError}</span>}
    </div>

    {/* Email */}
    <div className="mb-3">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={validateEmail}
        className="w-full px-3 py-2 bg-[#fffdf7] text-black text-sm border border-[#ccc] rounded placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-black"
      />
      {emailError && <span className="text-red-700 text-xs font-mono">{emailError}</span>}
    </div>

    {/* Mobile Number */}
    <div className="mb-3">
      <input
        type="tel"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        onBlur={validateMobile}
        className="w-full px-3 py-2 bg-[#fffdf7] text-black text-sm border border-[#ccc] rounded placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-black"
      />
      {mobileError && <span className="text-red-700 text-xs font-mono">{mobileError}</span>}
    </div>

    {/* Password */}
    <div className="mb-3 relative">
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={validatePassword}
        required
        className="w-full px-3 py-2 pr-10 bg-[#fffdf7] text-black text-sm border border-[#ccc] rounded placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-black"
      />
      <span
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
      {passwordError && <span className="text-red-700 text-xs font-mono">{passwordError}</span>}
    </div>

    {/* Confirm Password */}
    <div className="mb-3 relative">
      <input
        type={showConfirmPassword ? 'text' : 'password'}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onBlur={validateConfirmPassword}
        required
        className="w-full px-3 py-2 pr-10 bg-[#fffdf7] text-black text-sm border border-[#ccc] rounded placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-black"
      />
      <span
        onClick={() => setShowConfirmPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
      >
        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
      {confirmPasswordError && <span className="text-red-700 text-xs font-mono">{confirmPasswordError}</span>}
    </div>

    {submitError && <div className="text-red-700 text-xs font-mono mb-2">{submitError}</div>}

    <button
      type="submit"
      className="w-full bg-black text-white font-semibold py-2 rounded hover:bg-gray-800 transition"
    >
      Register
    </button>
  </form>

  <GoogleAuth />

  <p className="mt-3 text-xs text-gray-700 text-center">
    Already have an account?{' '}
    <a href="#" onClick={login} className="text-black underline hover:text-gray-800">
      Login
    </a>
  </p>

  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
</div>

);

}

export default SignUp;
