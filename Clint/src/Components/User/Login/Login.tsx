import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { login } from "../../../Redux/authSlice";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // 🔹 Redirect if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home"); 
    }
  }, [navigate]);

  // 🔹 Set Axios Authorization Header
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const register = (): void => {
    navigate("/signup");
  };

  const validateEmail = (value: string = email): boolean => {
    if (value.trim() === "") {
      setEmailError("Email is required");
      return false;
    }
    const emailRegex = /^[A-Za-z\._\-\d]+@[A-Za-z]+\.[a-z]{2,}$/;
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
      return; 
    }

    try {
      const response = await axios.post("http://localhost:3000/user/login", { email, password });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        dispatch(login(response.data.data)); 
        const user = response.data.data;
        // console.log('isProfile--- :',response.data);
  
        if (!user.isProfileComplete) {
          navigate('/complete-profile'); // ✅ Redirect to profile completion
        } else {
          navigate('/home'); // ✅ Redirect to home if already complete
        }
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error logging in. Please try again.");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="bg-[#1e1e1ec7] rounded-md p-5 w-[300px] text-center shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
  <h1 className="text-[22px] mb-4 text-white">User Login</h1>
  <form onSubmit={handleSubmit}>
    <div className="mb-2">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          validateEmail(e.target.value);
        }}
        required
        className="w-full p-2.5 bg-[#2a2a2a] text-white text-sm rounded placeholder:text-[#b0b0b0] focus:outline-none focus:ring-1 focus:ring-[#6a11cb] focus:shadow-[0_0_5px_#6a11cb] mb-1"
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
        className="w-full p-2.5 pr-10 bg-[#2a2a2a] text-white text-sm rounded placeholder:text-[#b0b0b0] focus:outline-none focus:ring-1 focus:ring-[#6a11cb] focus:shadow-[0_0_5px_#6a11cb] mb-1"
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
      className="w-full p-2.5 mt-2 font-bold text-sm text-white rounded bg-gradient-to-r from-[#6a11cb] to-[#2575fc] hover:from-[#2575fc] hover:to-[#6a11cb]"
    >
      Login
    </button>
  </form>
  <div className="my-2">
    <GoogleAuth />
  </div>
  <p className="mt-2 text-xs text-[#b0b0b0]">
    Don't have an account?{" "}
    <a
      href="#"
      onClick={register}
      className="text-white hover:text-[#25d5fc] transition"
    >
      Sign up
    </a>
  </p>
  <ToastContainer autoClose={5000} pauseOnHover />
</div>

  );
};

export default Login;
