import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Home, Licenses } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/licenses" element={<Licenses />} />
    </Routes>
  );
};

export default App;
