import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';


function Messages() {
    const [createMessage, setCreateMessage] = useState("");
    const [messagesList, setMessagesList] = useState([]);
    const [headInfo, setHeadInfo] = useState("");
    const img = "../images/avatar.png";
    const location = useLocation();
    const person = location.state.id.email;
    const personName = location.state.id.firstname;
    let myEmail = sessionStorage.getItem("name");
    let myName = sessionStorage.getItem("firstname");
    let output = '';

    useEffect(() => {
        const interval = setInterval(() => {
            fetchMessages();
        }, 2000);
        
        return () => clearInterval(interval);
    }, [person])

    const scrollToBottom = (id) => {
        const elem = document.getElementById("me");
        elem.scrollTop = elem.scrollHeight;
    }
    
    const fetchMessages = async () => {
            
        if (person !== null) {
           await fetch("http://localhost:4000/api/chat", {
               method: "POST",
               body: JSON.stringify({
                   senderemail: person,
                   receiveremail: myEmail,
               }),
               headers: {
                   "Content-Type": "application/json",
               },
           })
           .then((res) => res.json())
           .then((data) => {
               setMessagesList(data.chats);
               setHeadInfo(person); 
               
           })
           .catch((err) => console.error(err));
           
       } else {
           
       }   
     }
 

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage();
        setCreateMessage("");
    };

    const sendMessage = () => {
        fetch("http://localhost:4000/api/send/message", {
            method: "POST",
            body: JSON.stringify({
                senderemail: myEmail,
                receiveremail: person,
                sendername: myName,
                receivername: personName,
                messageBody: createMessage,
            }),
            headers: {
                "content-type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {

        })
        .catch((err) => console.error(err))
        scrollToBottom();
    }

    

  return (
    <div className='messagesContainer'>
        <div className='headPerson'>
            
            <div className='importantContent'>
                <img src={process.env.PUBLIC_URL+img} alt='userpic' className='userPic' />
                <div className='textPart'>
                    <h2 className='names'>{personName}</h2>
                    <p className='times'>1st september</p>
                </div>
            </div><hr />
        </div>
        <div id='me' className='chatBox' onClick={() => scrollToBottom('me')}>
        {messagesList.map((message, index) => {
            if (message.receiveremail !== myEmail) {
                   
                 return(
                    <div className='chatBoxb' key={index}>
                        
                        <div className='senderChat'>
                            <h4>{message.messages}</h4>
                        </div>
                    </div>
                )               
             } else {
                 
                 return(
                    <div className='chatBoxb' key={index}>
                        <div className='receiverChat'>
                            <h4>{message.messages}</h4>
                        </div>
                        
                    </div>
                )
             }
            
        })}
        </div>
        <div className='formDiv'>
            <form className='messageForm' onSubmit={handleSubmit}>
                <input type='text' className='message' placeholder='Type a message' value={createMessage} onChange={(e) => setCreateMessage(e.target.value)} />
                <button className='messageBtn'><FaPaperPlane style={{transform: "scale(1.8)", color: "blue"}} /></button>
            </form>
        </div>
    </div>
  )
}

export default Messages