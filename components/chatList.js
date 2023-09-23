import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { FaSearch } from "react-icons/fa";
import { GiCancel } from "react-icons/gi"




function ChatList() {
    const img = "../images/avatar.png";
    const [customers, setCustomers] = useState("");
    const [usersList, setUsersList] = useState([]);
    const [open, setOpen] = useState(null);
    const me = sessionStorage.getItem("name");

    
    useEffect(() => {
        getUsersList();
    }, []);

    const handleSubmit= (e) => {
        e.preventDefault();
        searchUsersList();
    }

    const getUsersList = async() => {
        await fetch("http://localhost:4000/api/all/users", {
            method: "POST",
            body: JSON.stringify({
                me,
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((res) => res.json())
        .then((data) => setUsersList(data.users))
        .catch((err) => console.error(err));
    }

    const searchUsersList = async() => {
        await fetch("http://localhost:4000/api/filter/users", {
            method: "POST",
            body: JSON.stringify({
                customers,
                me,
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((res) => res.json())
        .then((data) => {
           setUsersList(data.customersList);
           //setCustomers("");
        })
        .catch((err) => console.error(err));
    }

    const dope = (e) => {
        setCustomers(e.target.value);
        searchUsersList();
    }
    const cle = (e) => {
        e.preventDefault();
        getUsersList();
        setCustomers("");
    }

  return (
    <div>
        <h1 className='header'>Chats</h1>
        <form onSubmit={handleSubmit} className='farm'>
            <input 
                type='text' 
                className='search' 
                placeholder='Search'
                value={customers}
                onChange={dope} 
            />
            <button onClick={cle} className='clearing'><GiCancel className='gi' /></button>
        </form>
        
        {usersList.map((user, index) => {
                return(
                    <Link to="/dashboard/pa" state={{
                        id: user
                    }} key={index}>
                    <div className={`usersList ${open === user && "active"}`} onClick={() => setOpen(user)} data-remove={index}>
                        <div className='importantContent'>
                            <img src={process.env.PUBLIC_URL+img} alt='userpic' className='userPic' />                    
                            <div className='textPart'>
                                <h3 className='names'>{user.firstname}</h3>
                                <h4 className='lastMessage'>{user.lastmessage}</h4>
                                <p className='times'>{user.date}</p>
                            </div>
                            <div className='activeStatus'></div>
                        </div>
                    </div>
                    </Link>
                )
         })}
        
    </div>
  )
}

export default ChatList;