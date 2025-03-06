import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((store) => store.user) // this prevent from requesting api again and again for just changing page.
    // prevent profile after refresh
    const fetchUser = async () => {
        try {
            const res = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });
            dispatch(addUser(res.data));

        } catch (err) {
            if (err.status === 401) {
                navigate("/login");
            }
            console.error(err);
        }
    }

    useEffect(() => {
        if (!userData) {
            fetchUser();
        }
    }, [])
    return (
        <div>
            <Navbar />
            <Outlet />
            {/* <Footer/> */}
        </div>
    )
}

export default Body