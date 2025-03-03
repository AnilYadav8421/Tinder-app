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
      });
    } catch (err) {
      console.error(err);
      
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className="card card-side bg-base-100 shadow-2xl w-[750px] h-[500px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
            <button className="btn btn-primary w-full h-[35px]" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login