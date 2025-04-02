import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import bgImage from '../assets/tinder-bg.jpg';


const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, { emailId, password }, { withCredentials: true });
  
      console.log("✅ Login Successful:", res.data); // Debugging log
  
      // ✅ Store token in localStorage
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      } else {
        console.warn("⚠️ No token received from backend!");
      }
  
      // ✅ Store user in Redux
      dispatch(addUser(res.data.user));
  
      // ✅ Redirect to Feed page
      if (res.status === 200) {
        navigate("/feed");
      }
  
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error("❌ Login Error:", err);
    }
  };
  
  const handleSignUp = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/signup`, { firstName, lastName, emailId, password }, { withCredentials: true });
  
      console.log("✅ Signup Successful:", res.data); // Debugging log
  
      // ✅ Store token in localStorage
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      } else {
        console.warn("⚠️ No token received from backend!");
      }
  
      // ✅ Store user in Redux
      dispatch(addUser(res.data.user));
  
      // ✅ Redirect to profile page
      navigate("/profile");
  
    } catch (err) {
      console.error("❌ Signup Error:", err);
      setError("Signup failed. Please try again.");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center px-4 md:px-0"
      style={{ backgroundImage: `url(${bgImage})` }}>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040404] to-[#d2d2d1] opacity-40"></div>

      {/* Card Container */}
      <div className="relative z-10 bg-white shadow-2xl rounded-lg p-6 md:p-8 w-full max-w-sm md:max-w-md lg:max-w-lg">

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">{isLoginForm ? "Log in to Tinder" : "Create a new account"}</h1>
          <p className="text-gray-500 text-sm mt-1">It's quick and easy.</p>
        </div>

        {/* Form Fields */}
        <div className="mt-6 flex flex-col gap-4">
          {!isLoginForm && (
            <>
              <input type="text" value={firstName} placeholder="First Name"
                className="input w-full p-2 border border-gray-300 rounded-lg"
                onChange={(e) => setFirstName(e.target.value)} />
              <input type="text" value={lastName} placeholder="Last Name"
                className="input w-full p-2 border border-gray-300 rounded-lg"
                onChange={(e) => setLastName(e.target.value)} />
            </>
          )}

          <input type="email" value={emailId} placeholder="Email ID"
            className="input w-full p-2 border border-gray-300 rounded-lg"
            onChange={(e) => setEmailId(e.target.value)} />

          <input type="password" value={password} placeholder="Password"
            className="input w-full p-2 border border-gray-300 rounded-lg"
            onChange={(e) => setPassword(e.target.value)} />

          {/* Remember Me Checkbox */}
          <label className="flex items-center space-x-2 text-sm text-gray-600">
            <input type="checkbox" defaultChecked className="checkbox" />
            <span>Remember me</span>
          </label>

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Button */}
          <button className="w-full py-2 text-white text-sm 
        bg-gradient-to-r from-[#fd5564] to-[#ef4a75] 
        rounded-full shadow-lg hover:opacity-80 transition"
            onClick={isLoginForm ? handleLogin : handleSignUp}>
            {isLoginForm ? "Login" : "Sign Up"}
          </button>

          {/* Toggle Form Link */}
          <p className="text-center text-md text-blue-700 mt-2 cursor-pointer"
            onClick={() => setIsLoginForm((value) => !value)}>
            {isLoginForm ? "Sign up for Tinder" : "Already have an account?"}
          </p>
        </div>
      </div>
    </div>


  );
};

export default Login;