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
    // if (feed) return;
    try {
      const res = await axios.get(`${BASE_URL}/feed?page=1&limit=10`, { withCredentials: true });
      dispatch(addfeed(res.data));

    } catch (error) {
      console.error("Error Fetching Feed:", error);
    }
  }

  useEffect(() => {
    getFeed();
  }, [])

  return (
    Array.isArray(feed) && feed.length > 0 ? (
      <div className='pt-30 flex justify-center items-center'>
        <UserCard user={feed[0]} />
      </div>
    ) : (
      <div className="pt-40 text-center">No Users Found</div>
    )
  )
}

export default Feed