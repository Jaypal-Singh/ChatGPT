import { useState } from "react";
// import { ThreeDCardDemo } from "./components/ThreeDCardDemo";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Root from "./Pages/Root/Root";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

export default App;
