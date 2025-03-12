import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'
import { removeRequest } from '../utils/requestSlice'

const Request = () => {
  const requests = useSelector((store)=> store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
      try {
        const res = axios.post(BASE_URL+ "/request/review/"+status+ "/"+_id, {}, {withCredentials: true});
        dispatch(removeRequest(_id));
      } catch (error) {
        console.error("Error reviewing request:", error);
      }
    }

    const fetchRequest = async () => {
        try {
            const res = await axios.get(BASE_URL+ "/user/requests/recevied", {withCredentials: true});
            dispatch(addRequest(res.data.data));
        } catch (error) {
          console.error("Error fetching requests:", error);
        }
    }
    useEffect(()=> { 
        fetchRequest();
    }, [])
    
    if (!requests || requests.length === 0 ){
      return <h1 className="text-center mt-20 text-xl">No Requests Found</h1>;
    }

  return (
    <div className='mt-20'>
       <div className="mt-20 flex flex-col items-center">
            <h1 className='font-bold text-3xl mb-6'>Requests</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
                {requests.map((request, index) => {
                  if (!request.fromUserId) return null;
                    const { firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;;

                    return (
                        <div key={index} className="bg-white shadow-md rounded-lg p-3 flex flex-col items-center w-[250px]">
                            <img
                                alt='photo'
                                 src={photoUrl}
                                className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center space-y-3"
                            />
                            <h2 className="font-semibold text-center text-lg">{firstName} {lastName}</h2>
                            <p className="text-gray-500 text-center">{age} years old, {gender}</p>
                            <p className='text-sm text-gray-700 text-center py-2'>{about}</p>
                            <div className="flex space-x-2 mt-2">
                                <button className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg"onClick={()=> reviewRequest("rejected", request._id)}>Reject</button>
                                <button className="px-3 py-1 text-xs bg-green-500 text-white rounded-lg" onClick={()=> reviewRequest("accepted", request._id)}>Accept</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Request