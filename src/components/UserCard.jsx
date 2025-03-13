import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } = user || {};
    const dispatch = useDispatch();
    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(userId));
        } catch (err) {
            console.error("Error : " + err)
        }
    }

    return (
        <div className="relative w-[80%] max-w-[320px] sm:max-w-[380px] h-[460px] sm:h-[520px] rounded-2xl overflow-hidden shadow-lg">
    {/* User Image */}
    <img
        src={photoUrl}
        alt="User photo"
        className="w-full h-full object-cover"
    />

    {/* Gradient & User Info */}
    <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-5 flex flex-col justify-end text-white">
        <h2 className="text-xl sm:text-2xl font-bold">{firstName} {lastName}</h2>
        {age && gender && <p className="text-xs sm:text-sm opacity-80">{age}, {gender}</p>}
        <p className="text-xs sm:text-sm line-clamp-2 mb-14 sm:mb-16">{about}</p>
    </div>

    {/* Action Buttons */}
    <div className="absolute bottom-5 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-5 sm:gap-6">
        <button className="bg-white w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg flex items-center justify-center text-xl sm:text-2xl text-red-500"
            onClick={() => handleSendRequest("ignored", _id)}>
            ❌
        </button>
        <button className="bg-white w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg flex items-center justify-center text-xl sm:text-2xl text-green-500"
            onClick={() => handleSendRequest("interested", _id)}>
            ❤️
        </button>
    </div>
</div>

    )
}

export default UserCard