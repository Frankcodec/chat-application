import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Swap = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser();
        console.log({email, password});
        setEmail("");
        setPassword("");
    };
    const loginUser = () => {
        fetch('http://localhost:4000/api/login', {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
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
                alert(data.message);
                Swap("/dashboard");
                localStorage.setItem("_userid", data.id);
                sessionStorage.setItem("name", data.email);
                sessionStorage.setItem("firstname", data.firstname);
                sessionStorage.setItem("lastname", data.lastname);
            }
        })
        .catch((err) => console.error(err));
    }

  return (
   
    <main className='main'>
        <h1 className='loginTitle'>Log into your account</h1>
        <form className='box' onSubmit={handleSubmit}>
            <div className='loginForm'>
            <label htmlFor='email' id='first'>Email Address</label><br />
            <input 
                type='email' 
                name='email'
                id='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button className='loginBtn'>SIGN IN</button>
            <p>
                Don't have an account? <Link to='/register'>Create one</Link>
            </p>
            </div>  
        </form>
    </main>

  )
}


export default Login