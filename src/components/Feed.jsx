import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addfeed } from '../utils/feedSlice'

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if(feed) return;

    try {
    const res = await axios.get(`${BASE_URL}/feed?page=1&limit=10`, {withCredentials: true});
    dispatch(addfeed(res.data));
    } catch (error) {
      // 
    }
  }

  useEffect(()=>{
    getFeed();
  }, [])

  return (
    <div>
      <h1 className='pt-20'>FEED PAGE</h1>
    </div>

  )
}

export default Feed