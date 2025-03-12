import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux';


const UserCard = ({user}) => { 
    const {_id, firstName, lastName, photoUrl, age, gender, about} = user || {};
    const dispatch = useDispatch();
    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {withCredentials:true});
            dispatch(removeUserFromFeed);
        } catch (err) {
            console.error("Error : " +err)
        }
    }
       
    return (
        <div className="card bg-base-100 w-100 shadow-amber-100">
            <figure className="">
                <img
                    src={photoUrl}
                    alt="user photo"
                    className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center bg-blue-50 rounded-xl">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender }</p>}
                <p>{about}</p>
                <div className="card-actions">
                    <button className="btn btn-error" onClick={()=>handleSendRequest("ignored", _id)}>Ignore</button>
                    <button className="btn btn-success" onClick={()=>handleSendRequest("interested", _id)}>Intrested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard