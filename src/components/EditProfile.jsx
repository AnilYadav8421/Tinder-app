import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("") // clear error
    const requestData = {
      photoUrl,
      age: Number(age),
      gender,
      about,
      skills: user.skills || []
    };
    try {
      const res = await axios.patch(`${BASE_URL}/profile/edit`, requestData,
        // {
        //   firstName, 
        //   lastName, 
        //   photoUrl, 
        //   age: Number(age), 
        //   gender, about,
        //   skills: user.skills || []
        //  },
        { withCredentials: true });
      dispatch(addUser(res?.data?.data))
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  }
  return (
    <div className='flex justify-center my-10'>
      
      <div className='flex justify-center items-center min-h-screen px-4 mx-10'>
        <div className="card card-side bg-base-100 shadow-2xl w-[90%] md:w-[500px] lg:w-[600px] h-auto p-6">
          <div className="card-body ">
            <h2 className="card-title text-3xl flex  justify-center">Edit Profile</h2>
            <div className='flex  justify-center'>
              <fieldset className="fieldset ">
                <legend className="fieldset-legend">First Name</legend>
                <input type="text" value={firstName} className="input w-[90%] md:w-[500px]" placeholder="Type here" onChange={(e) => setFirstName(e.target.value)} />
              </fieldset>
            </div>
            <div className='flex  justify-center'>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input type="text" value={lastName} className="input w-[90%] md:w-[500px]" placeholder="Type here" onChange={(e) => setLastName(e.target.value)} />
              </fieldset>
            </div>
            <div className='flex  justify-center'>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo Url</legend>
                <input type="text" value={photoUrl} className="input w-[90%] md:w-[500px]" placeholder="Type here" onChange={(e) => setPhotoUrl(e.target.value)} />
              </fieldset>
            </div>
            <div className='flex  justify-center'>
              <fieldset className="fieldset ">
                <legend className="fieldset-legend">Age</legend>
                <input type='number' value={age} className="input w-[90%] md:w-[500px]" placeholder="Type here" onChange={(e) => setAge(e.target.value)} />
              </fieldset>
            </div>
            <div className='flex  justify-center'>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input type="text" value={gender} className="input w-[90%] md:w-[500px]" placeholder="Type here" onChange={(e) => setGender(e.target.value)} />
              </fieldset>
            </div>
            <div className='flex  justify-center'>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input type="text" value={about} className="input w-[90%] md:w-[500px]" placeholder="Type here" onChange={(e) => setAbout(e.target.value)} />
              </fieldset>
            </div>
            {error && <div className="text-red-500">ERROR : {error}
            </div>}
            <div className="card-actions justify-center py-2">
              <button className="btn bg-black text-white w-64 h-[38px]" onClick={saveProfile}>Update</button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
    </div>
  )
}

export default EditProfile