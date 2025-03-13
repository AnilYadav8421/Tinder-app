import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'

const Connection = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections || []);

    const fetchConnection = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true })
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.error("Error fetching connections:", err);
        }
    }
    useEffect(() => {
        fetchConnection();
    }, []);

    // if (!connections) return;
    // if (connections.length === 0) return <h1>NO Connection Found</h1>

    if (!connections) return null;
    if (connections.length === 0) return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">No Connections Found</h1>
            <p className="text-gray-500 mt-2">Start swiping to connect with people!</p>
        </div>
    );
    return (
        // <div className="mt-20 flex flex-col items-center">
        //     <h1 className='font-bold text-3xl mb-6'>Connections</h1>
        //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        //         {connections
        //             .filter((connection) => connection !== null)
        //             .map((connection, index) => {
        //                 const { firstName, lastName, photoUrl, age, gender, about } = connection;
        //                 if (!connection) return null;

        //                 return (
        //                     <div key={index} className="bg-white shadow-md rounded-lg p-3 flex flex-col items-center w-[250px]">
        //                         <img
        //                             alt='photo' src={photoUrl}
        //                             className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center space-y-3"
        //                         />
        //                         <h2 className="font-semibold text-center text-lg">{firstName} {lastName}</h2>
        //                         <p className="text-gray-500 text-center">{age} years old, {gender}</p>
        //                         <p className='text-sm text-gray-700 text-center py-2'>{about}</p>
        //                     </div>
        //                 )
        //             })}
        //     </div>
        // </div>

        <div className="mt-24 flex flex-col items-center px-4">
    <h1 className="text-3xl font-bold mb-6">Your Connections</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl justify-center">
        {connections
            .filter((connection) => connection !== null)
            .map((connection, index) => {
                const { firstName, lastName, photoUrl, age, gender, about } = connection;
                if (!connection) return null;

                return (
                    <div key={index} className="relative w-full max-w-[250px] sm:max-w-[270px] rounded-lg overflow-hidden shadow-lg bg-white mx-auto">
                        {/* User Image */}
                        <img
                            src={photoUrl || "https://via.placeholder.com/150"}
                            alt="User Photo"
                            className="w-full h-[250px] object-cover"
                        />

                        {/* Gradient & User Info */}
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                            <h2 className="text-lg font-bold">{firstName} {lastName}</h2>
                            <p className="text-sm opacity-80">{age} years old, {gender}</p>
                            <p className="text-sm line-clamp-2 mt-2">{about}</p>
                        </div>
                    </div>
                );
            })}
    </div>
</div>

    )
}

export default Connection
