import React from 'react'


const UserCard = (user) => { 
    const {firstName, lastName, photoUrl, age, gender, about} = user?.user;   
    return (
        <div className="card bg-base-100 w-100 shadow-amber-100">
            <figure className="">
                <img
                    src={user?.user?.photoUrl}
                    alt="user photo"
                    className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center bg-blue-50 rounded-xl">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender }</p>}
                <p>{about}</p>
                <div className="card-actions">
                    <button className="btn btn-error">Ignore</button>
                    <button className="btn btn-success">Intrested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard