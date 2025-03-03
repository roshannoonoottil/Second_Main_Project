import React, { useState, useEffect } from "react";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../../Redux/authSlice";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    if (token) {
      navigate("/dashboard"); // ✅ Redirect if already logged in
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const validateEmail = (value: string = email): boolean => {
    if (value.trim() === "") {
      setEmailError("Email is required");
      return false;
    }
    const emailRegex = /^[A-Za-z._\-\d]+@[A-Za-z]+\.[a-z]{2,}$/;
    if (!emailRegex.test(value.trim())) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (value: string = password): boolean => {
    if (value.trim() === "") {
      setPasswordError("Password is required");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      return; // ✅ No need for `setSubmitError`, errors are already displayed
    }

    try {
      const response = await axios.post("http://localhost:3000/admin/login", { email, password });

      if (response.data.success) {
        localStorage.setItem("admintoken", response.data.token);
        dispatch(adminLogin(response.data.data)); // ✅ Ensure this updates Redux state correctly
        navigate("/dashboard");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error logging in. Please try again.");
      console.error("Login Error:", error);
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
        <div className="form-group" style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            required
            style={{ paddingRight: "40px" }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {passwordError && <span className="error">{passwordError}</span>}
        </div>
        <button type="submit" className="admin-login-button">Login</button>
      </form>
      <ToastContainer autoClose={5000} pauseOnHover />
    </div>
  );
};

export default AdminLogin;
