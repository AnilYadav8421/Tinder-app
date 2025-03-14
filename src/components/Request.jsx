import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'
import { removeRequest } from '../utils/requestSlice'

const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error("Error reviewing request:", error);
    }
  }

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recevied", { withCredentials: true });
      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  }
  useEffect(() => {
    fetchRequest();
  }, [])

  if (!requests || requests.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-center">
        <div className="bg-gray-100 px-6 py-4 rounded-lg shadow-md">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-700">No Requests Found</h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Check back later for new connection requests.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 px-4">
      <div className="mt-20 flex flex-col items-center">
        <h1 className="font-bold text-3xl mb-6">Requests</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl justify-center">
          {requests.map((request, index) => {
            if (!request.fromUserId) return null;
            const { firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

            return (
              <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center w-full max-w-[250px] mx-auto">
                <img
                  alt="photo"
                  src={photoUrl}
                  className="w-full h-[200px] object-cover rounded-md shadow-md"
                />
                <h2 className="font-semibold text-center text-lg mt-3">{firstName} {lastName}</h2>
                <p className="text-gray-500 text-center text-sm">{age} years old, {gender}</p>
                <p className="text-sm text-gray-700 text-center py-2 line-clamp-2">{about}</p>
                <div className="flex space-x-3 mt-3">
                  <button
                    className="px-4 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="px-4 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Request