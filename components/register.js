import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";


function Register() {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
       // console.log({ username, email, password });
        signUp();
        setEmail("");
        setfirstname("");
        setlastname("");
        setPassword("");
    }
    const Swap = useNavigate();

    const signUp = () => {
        fetch("http://localhost:4000/api/register", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                firstname,
                lastname,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.error_message) {
                alert(data.error_message);
            } else {
                alert(data.message)
                Swap("/");
            }
        })
        .catch((err) => console.error(err));
    };

  return (
    <main className='main'>
        <h1 className='loginTitle'>Log into your account</h1>
        <form className='box' onSubmit={handleSubmit}>
            <div className='loginForm'>
            <label htmlFor='email'>Email Address</label><br />
            <input 
                type='email' 
                name='email'
                id='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                /><br /><br /><br />
            <label htmlFor='firstname'>first name</label><br />
            <input 
                type='text' 
                name='firstname'
                id='firstname'
                required
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                /><br /><br /><br />
            <label htmlFor='lastname'>last name</label><br />
            <input 
                type='text' 
                name='lastname'
                id='lastname'
                required
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
                /><br /><br /><br />
            <label htmlFor='password'>Password</label><br />
            <input 
                type='password' 
                name='password'
                id='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /><br /><br />
            <button className='loginBtn'>Register</button>
            <p>
                Don't have an account? <Link to='/'>Sign in</Link>
            </p>
            </div>  
        </form>
    </main>
  )
}

export default Register