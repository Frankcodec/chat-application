import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { AiFillMessage, AiFillSetting, AiOutlineVideoCameraAdd } from 'react-icons/ai';



function Nav() {


  return (
    <nav className='nav'>
        <FaHeart className='mainNavIcon' />
        <div className='navbarRight'>
        <Link to="/dashboard/status" >
          <div className='navItems'>
            
            <AiOutlineVideoCameraAdd className='navIcon' />
            <p>Status</p>
            
          </div>
          </Link>
          <Link to="/dashboard" >
          <div className='navItems'>
          
            <AiFillMessage className='navIcon' />
            <p>Messages</p>
          
          </div>
          </Link>
          <Link to="/dashboard/settings" >
          <div className='navItems'>
          
            <AiFillSetting className='navIcon' />
            <p>Settings</p>
            
          </div>
          </Link>
        </div>
        <div className='profilePic'>
          <div className='navItems'>
              <FaHeart className='navIco' />
          </div>
        </div>
    </nav>
  )
}

export default Nav;