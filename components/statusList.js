import React from 'react'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StatusList = () => {
    
    const [statusList, setStatusList] = useState([]);
    const [open, setOpen] = useState(null);
    const img = "../../images/avatar.png";

    
    useEffect(() => {
        getUsersStatus();
    }, [img]);


    const getUsersStatus = async() => {
        await fetch("http://localhost:4000/api/all/status")
        .then((res) => res.json())
        .then((data) => {
            setStatusList(data.status);
        //    setImage("../images/avatar.png");
        //    alert("red");
        })
        .catch((err) => console.error(err));
    }


  return (
    <div>
        {statusList.map((stats, index) => {
            return(
                <Link to="p" state={{
                    id: stats
                }} key={index}>
                <div className={`usersList ${open === stats && "active"}`} onClick={() => setOpen(stats)} data-remove={index}>
                    <div className='importantContent'>
                        <img src={process.env.PUBLIC_URL+img} alt='userpic' className='userPic' />                    
                        <div className='textPart'>
                            <h3 className='names'>{stats.firstname}</h3>
                            <p className='times'>{stats.date}</p>
                        </div>
                    </div>
                </div>
                </Link>
            )
        })}
    </div>
  )
}

export default StatusList