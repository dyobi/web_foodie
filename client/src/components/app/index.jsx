import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Core from '../core';

const Component = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate replace to='/home' />} />
        <Route path='/home' element={<Core page='0' />} />
        <Route path='/food' element={<Core page='1' />} />
        <Route path='/book' element={<Core page='2' />} />
        <Route path='/login' element={<Core page='3' />} />
        <Route path='/signup' element={<Core page='4' />} />
        <Route path='/mypage' element={<Core page='5' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Component;
