import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Home } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
