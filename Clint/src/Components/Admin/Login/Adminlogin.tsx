import React, { useState, useEffect } from "react";
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
    <div className="bg-[#1e1e1ec7] rounded-md p-6 w-[320px] text-center shadow-[0_5px_15px_rgba(0,0,0,0.6)]">
  <h1 className="text-[22px] mb-4 text-white">Admin Login</h1>
  <form onSubmit={handleSubmit}>
    <div className="mb-2">
      <input
        type="email"
        placeholder="Admin Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          validateEmail(e.target.value);
        }}
        required
        className="w-full p-3 bg-[#2a2a2a] text-white text-sm rounded placeholder:text-[#b0b0b0] focus:outline-none focus:ring-1 focus:ring-[#00bcd4] focus:shadow-[0_0_5px_#00bcd4] mb-1"
      />
      {emailError && (
        <span className="text-[rgb(246,87,87)] font-mono text-sm">{emailError}</span>
      )}
    </div>
    <div className="mb-2 relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          validatePassword(e.target.value);
        }}
        required
        className="w-full p-3 pr-10 bg-[#2a2a2a] text-white text-sm rounded placeholder:text-[#b0b0b0] focus:outline-none focus:ring-1 focus:ring-[#00bcd4] focus:shadow-[0_0_5px_#00bcd4] mb-1"
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-white"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
      {passwordError && (
        <span className="text-[rgb(246,87,87)] font-mono text-sm">{passwordError}</span>
      )}
    </div>
    <button
      type="submit"
      className="w-full p-3 mt-2 text-[15px] font-bold text-white rounded bg-gradient-to-r from-[#00bcd4] to-[#006064] transition hover:from-[#006064] hover:to-[#00bcd4]"
    >
      Login
    </button>
  </form>
  <ToastContainer autoClose={5000} pauseOnHover />
</div>

  );
};

export default AdminLogin;
