import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'

const Connection = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections)

    const fetchConnection = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true })
            dispatch(addConnections(res?.data?.data))
        } catch (err) {
        }
    }
    useEffect(() => {
        fetchConnection();
    }, []);

    if (!connections) return;
    if (connections.length === 0) return <h1>NO Connection Found</h1>

    return (
        <div className="mt-20 flex flex-col items-center">
            <h1 className='font-bold text-3xl mb-6'>Connections</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
                {connections.map((connection, index) => {
                    const { firstName, lastName, photoUrl, age, gender, about } = connection;

                    return (
                        <div key={index} className="bg-white shadow-md rounded-lg p-3 flex flex-col items-center w-[250px]">

                            <img
                                alt='photo' src={photoUrl}
                                className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center space-y-3"
                            />
                            <h2 className="font-semibold text-center text-lg">{firstName} {lastName}</h2>
                            <p className="text-gray-500 text-center">{age} years old, {gender}</p>
                            <p className='text-sm text-gray-700 text-center py-2'>{about}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Connection