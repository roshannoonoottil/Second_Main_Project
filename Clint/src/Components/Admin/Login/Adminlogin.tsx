import React, { useState } from 'react';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../../Redux/authSlice';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitError, setSubmitError] = useState('');

  axios.defaults.withCredentials = true;

  const validateEmail = (value: string = email): boolean => {
    if (value.trim() === '') {
      setEmailError('Email is required');
      return false;
    }
    const emailRegex = /^[A-Za-z._\-\d]+@[A-Za-z]+\.[a-z]{2,}$/;
    if (!emailRegex.test(value.trim())) {
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (value: string = password): boolean => {
    if (value.trim() === '') {
      setPasswordError('Password is required');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      setSubmitError('Please fix the errors above');
      setTimeout(() => setSubmitError(''), 3000);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/admin/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        dispatch(login(response.data.data));
        navigate('/dashboard');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error logging in. Please try again.');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="admin-login-container">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            required
          />
          {emailError && <span className="error">{emailError}</span>}
        </div>
        <div className="form-group" style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            required
            style={{ paddingRight: '40px' }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
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
          {passwordError && <span className="error">{passwordError}</span>}
        </div>
        {submitError && <div className="error submit-error">{submitError}</div>}
        <button type="submit" className="admin-login-button">Login</button>
      </form>
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
};

export default AdminLogin;