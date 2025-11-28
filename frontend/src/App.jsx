import { useState } from 'react'
import { ThreeDCardDemo } from './components/ThreeDCardDemo'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import Chats from "./Pages/Chats";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </BrowserRouter>
    // <>
    //   <h1>hello</h1>
    // </>
   
  );
}

export default App;

