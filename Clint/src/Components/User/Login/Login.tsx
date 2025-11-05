import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { login } from "../../../Redux/authSlice";
import Header from "../Home/Header/Header";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // 🔹 Redirect if user is already logged in
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/home"); 
  //   }
  // }, [navigate]);

  // 🔹 Set Axios Authorization Header
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //   }
  // }, []);

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
  <>
    <Header/>
<div className="rounded-md p-5 m-10 w-[320px] bg-[#f8f3e8] text-center shadow-lg border border-[#222] font-serif text-black">
  <h1 className="text-[22px] mb-4 underline decoration-[2px] underline-offset-4">User Login</h1>
  <form onSubmit={handleSubmit}>
    <div className="mb-2 text-left">
      <label className="block mb-1 text-sm font-semibold">Email</label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          validateEmail(e.target.value);
        }}
        required
        className="w-full p-2 bg-[#fffef8] border border-[#444] text-sm text-black rounded placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
      />
      {emailError && (
        <span className="text-red-600 font-mono text-sm">{emailError}</span>
      )}
    </div>

    <div className="mb-2 relative text-left">
      <label className="block mb-1 text-sm font-semibold">Password</label>
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          validatePassword(e.target.value);
        }}
        required
        className="w-full p-2 pr-10 bg-[#fffef8] border border-[#444] text-sm text-black rounded placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-9 cursor-pointer text-black"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
      {passwordError && (
        <span className="text-red-600 font-mono text-sm">{passwordError}</span>
      )}
    </div>

    <button
      type="submit"
      className="w-full p-2 mt-3 font-bold text-sm bg-black text-white rounded hover:bg-gray-800 transition"
    >
      Login
    </button>
  </form>

  <div className="my-3">
    <GoogleAuth />
  </div>

  <p className="mt-2 text-xs text-gray-700">
    Don't have an account?{" "}
    <a
      href="#"
      onClick={register}
      className="text-black underline hover:text-gray-900"
    >
      Sign up
    </a>
  </p>

  <ToastContainer autoClose={5000} pauseOnHover />
</div>

</>
  );
};

export default Login;
