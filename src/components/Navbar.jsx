import React, { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="navbar bg-base-300 fixed top-0 left-0 w-full shadow-md z-50 p-4">
      {/* Left Side: Logo */}
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          <img src={logo} alt="logo" className="h-8 w-auto" />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden btn btn-ghost text-xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Right Side: User Info & Dropdown */}
      <div
        className={`lg:flex items-center gap-4 ${menuOpen ? "flex flex-col absolute top-16 left-0 w-full bg-base-300 p-4 shadow-lg" : "hidden lg:flex"
          }`}
      >
        {user && (
          <>
            {/* Welcome Text */}
            <p className="text-black">Welcome, {user.firstName}</p>

            {/* Profile Dropdown */}
            <div
              className="dropdown dropdown-end relative"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <button className="btn btn-ghost btn-circle avatar focus:outline-none">
                <div className="w-10 rounded-full">
                  <img alt="User Photo" src={user.photoUrl} />
                </div>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <ul
                  className="menu menu-sm absolute right-0 bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow py-2"
                >
                  <li>
                    <Link to={"/profile"} className="justify-between">
                      Profile <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/connection"}>Connections</Link>
                  </li>
                  <li>
                    <Link to={"/request"}>Requests</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="btn btn-ghost">
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
