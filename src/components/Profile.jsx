import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {
  // getting user data from store
  const user = useSelector((store) => store.user);
  return (
    user &&
    <div className='pt-20'>
      <EditProfile user={user} />
    </div>
  )
}

export default Profile