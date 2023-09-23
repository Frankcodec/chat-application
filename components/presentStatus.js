import React from 'react'
import {useLocation} from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';

const PresentStatus = () => {
    const location = useLocation();
    const person = location.state.id.email;
    const personName = location.state.id.firstname;
    const [userStatus, setUserStatus] = useState([]);
    const img = "../images/avatar.png";

    useEffect(() => {
        fetchStatus();
    }, [person])
    
    const fetchStatus = async () => {
        await fetch("http://localhost:4000/api/status", {
            method: "POST",
            body: JSON.stringify({
                person
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setUserStatus(data.status);
        })
        .catch((err) => console.error(err))
    }

  return (
    <div>
        {userStatus.map((specific, index) => {
            return(
                <div key={index}>
                   {specific.email} 
                </div>
            )
        })}
    </div>
  )
}

export default PresentStatus