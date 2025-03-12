import React, { useState } from 'react'
import loginImg from "../assets/t-login_img.jpg"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const dispatch = useDispatch();
  const navigate  = useNavigate();


  const handleLogin = async () => {
    // call Api
    try {
      const res  = await axios.post(BASE_URL + "/login", {
        emailId, password,
      }, {withCredentials: true}
    );
    if (res.status === 200) {
      navigate("/feed"); // Redirect to the Feed page on successful login
    }
    dispatch(addUser(res.data));
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error();
      
    }
  }
  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {firstName, lastName, emailId, password}, {withCredentials: true});
      dispatch(addUser(res.data.data));
      return navigate("/profile")
    } catch (err) {
      console.error("Error" + err)
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-[#FD267A] to-[#FF7854]'>
      <div className="card card-side bg-base-100 shadow-2xl w-[750px] h-[500px]">
        <figure>
          <img
            src={loginImg} alt="loginImg" className='w-80 h-auto object-cover ' />
        </figure>
        <div className="card-body">
        <h2 className="card-title text-2.5xl ">{isLoginForm ? "Login" : "Signup"}</h2>
          {!isLoginForm && <><div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input type="text"
               value={firstName} className="input" placeholder="Type here" onChange={(e)=> setFirstName(e.target.value)} />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input type="text"
               value={lastName} className="input" placeholder="Type here" onChange={(e)=> setLastName(e.target.value)} />
            </fieldset>
          </div></>}
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input type="text"
               value={emailId} className="input" placeholder="Type here" onChange={(e)=> setEmailId(e.target.value)} />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input type="password" value={password} className="input" placeholder="Type here" onChange={(e)=> setPassword(e.target.value)} />
            </fieldset>
          </div>
          <div>
          <fieldset className="fieldset bg-base-100 border border-base-300 rounded-box w-64">
              <label className="fieldset-label">
                <input type="checkbox" defaultChecked className="checkbox" />
                Remember me
              </label>
            </fieldset>
          </div>
          <p className='text-red-700 text-1xl'>{error}</p>
          <div className="card-actions justify-center py-2">
            <button className="btn bg-black text-white w-64 h-[38px]" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
            <p className='cursor-pointer' onClick={()=>setIsLoginForm((value)=> !value)}>{isLoginForm? "New User? SignUp here" : "Already account? Login here"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login