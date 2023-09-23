import React from 'react';
import Messages from './messages';
import ChatList from './chatList';
import { Link, Route, Routes } from 'react-router-dom';
import Template from './template';

function Compressed() {
 // alert(window.innerWidth);
  let me = window.innerWidth;
  if (me <= 700) {
    return (
      
      <div className='info3'>
          <Routes>
                <Route path='/' element={
                <div className='chatList'>
                  <ChatList />
                </div>
                } />
                <Route path='/:person' element={
                  <div className='messages'>
                    <Link to='../' className='backo'>&#8592;</Link>
                    <Messages />
                  </div>
                  } />
          </Routes>
      </div>
      
    )
  } else {
    return (
      <div>
      <div className='info2'>
          <div className='chatList'>
            <ChatList />
          </div>
          <div className='messages'>
            <Routes>
                <Route path='/' element={<Template />} />
                <Route path='/:person' element={<Messages />} />
            </Routes>
          </div>
      </div>
      </div>
    )
  }
  
}

export default Compressed;