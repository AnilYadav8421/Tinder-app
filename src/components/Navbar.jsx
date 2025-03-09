import React from "react";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  
  
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async()=>{
    try {
     await axios.post(BASE_URL + "/logout", {}, {withCredentials: true});
     dispatch(removeUser());
     return navigate("/login")
    } catch (err) {
      // 
    }
  }
  return (
    <div className="navbar bg-base-300 fixed top-0 left-0 w-full shadow-md z-50 p-4">
      {/* Left Side: Logo */}
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl mx-4">
          <img src={logo} alt="logo" className="h-16 w-auto" />
        </Link>
      </div>

      {/* Right Side: User Info & Dropdown */}
      {user && (
        <div className="flex items-center gap-4 mx-9">
          {/* Welcome Text */}
          <p className="text-black">Welcome, {user.firstName}</p>

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end" tabIndex={0}>
            <div role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User Photo" src={user.photoUrl} />
              </div>
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><a>Settings</a></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
