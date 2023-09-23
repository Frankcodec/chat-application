import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PresentStatus from './presentStatus';
import StatusList from './statusList';
import Template from './template';

function Status() {
    return (
        <div className='info2'>
            <div className='chatList'>
                <StatusList />
            </div>
            <div className='messages'>
            <Routes>
                <Route path='/' element={<Template />} />
                <Route path='/:status' element={<PresentStatus />} />
            </Routes>
            </div>
        </div>
      )
}

export default Status