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
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("") // clear error
    setSuccess(false);
    const requestData = {
      photoUrl,
      age: Number(age),
      gender,
      about,
      skills: user.skills || []
    };
    try {
      const res = await axios.patch(`${BASE_URL}/profile/edit`, requestData,
        { withCredentials: true });
      dispatch(addUser(res?.data?.data))
      setSuccess(true); // Show success toast
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Edit Profile</h2>

        <div className="flex flex-col items-center mb-6">
          <img
            src={photoUrl || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-gray-300 object-cover"
          />
          <input
            type="text"
            value={photoUrl}
            className="mt-3 input input-bordered w-full text-center"
            placeholder="Enter Photo URL"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={firstName}
            className="input input-bordered w-full"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            value={lastName}
            className="input input-bordered w-full"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="number"
            value={age}
            className="input input-bordered w-full"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          />
          <select
            value={gender}
            className="input input-bordered w-full"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>

        <div className="mt-4">
          <textarea
            value={about}
            className="textarea textarea-bordered w-full"
            placeholder="Write something about yourself..."
            rows={3}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        {error && <div className="text-red-500 text-center mt-2">ERROR: {error}</div>}

        <div className="flex justify-center mt-6">
          <button className="btn btn-primary w-full max-w-xs" onClick={saveProfile}>
            Update Profile
          </button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="mt-10">
        <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      </div>

      {/* Success Toast */}
      {success && (
        <div className="fixed top-5 right-5 z-50">
          <div className="toast toast-top toast-end">
            <div className="alert alert-success">
              <span>Profile Updated Successfully!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditProfile