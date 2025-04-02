import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addfeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {

    if (feed) return;
    try {
      const res = await axios.get(`${BASE_URL}/feed?page=1&limit=10`, {
        headers:{
          "Content-Type": "application/json" ,
        }, 
         withCredentials: true });
      dispatch(addfeed(res.data));

    } catch (error) {
      console.error("Error Fetching Feed:", error);
    }
  }

  useEffect(() => {
    getFeed();
  }, [])
  // 🛑 No Users Found UI
  if (feed.length <= 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 mt-20 animate-fadeIn">
          No New Users Found
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Try updating your search preferences or check back later.
        </p>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen pt-20">
      <UserCard user={feed[0]} />
    </div>
  )
}

export default Feed