import React, { useEffect } from 'react';
import Nav from './nav';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Settings from './settings';
import Status from './status';
import Compressed from './compressed';
import './css/login.css';


function Home() {
  const Swap = useNavigate();

  useEffect(() => {
    const validateUser = () => {
      if (!sessionStorage.getItem("name")) {
        Swap('/');
      } else {
        
      }
    }
    validateUser();
  }, [Swap])

  return (
    <div className='mainDiv'>
        <Nav />
        <div className='info'>
            <Routes>
                <Route path='/*' element={<Compressed />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/status/*' element={<Status />} />
            </Routes>    
        </div>
    </div>
  )
}

export default Home