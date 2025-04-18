import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Register from './pages/Register'
import Login from './pages/Login'
import viteLogo from '/vite.svg'
import GadgetDetails from './pages/GadgetDetails';
import Home from './pages/Home'; // Adjust path as needed

import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/gadget/:id" element={<GadgetDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
