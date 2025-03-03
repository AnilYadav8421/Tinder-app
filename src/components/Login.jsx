import React, { useState } from 'react'
import loginImg from "../assets/t-login_img.jpg"
import axios from 'axios';

const Login = () => {
  const [emailId, setEmailId] = useState("dhoni@gmail.com");
  const [password, setPassword] = useState("Dhoni@123");

  const handleLogin = async () => {
    // call Api
    try {
      await axios.post("http://localhost:3000/login", {
        emailId, password,
      }, {withCredentials: true});
    } catch (err) {
      console.error(err);
      
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
          <h2 className="card-title text-3xl ">Login</h2>
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
          <div className="card-actions justify-center py-2">
            <button className="btn bg-black text-white w-64 h-[38px]" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login