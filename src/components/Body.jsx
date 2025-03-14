import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import Footer from './Footer';

const Body = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get current route
    const dispatch = useDispatch();
    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {
        if (window.location.pathname === "/login") return;
        
        try {
            const res = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });
            dispatch(addUser(res.data));
        } catch (err) {
            console.error("Error fetching user:", err);
            if (err.response?.status === 401) {
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        // Fetch user data only if not on the home page and user data is missing
        if (!userData && location.pathname !== "/") {
            fetchUser();
        }
    }, []);

    return (
        <div>
            {location.pathname !== "/" && <Navbar />} {/* Hide Navbar on Home */}
            <Outlet />
            <Footer/>
        </div>
    );
};

export default Body;
