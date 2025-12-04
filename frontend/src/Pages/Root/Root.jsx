import React from "react";
import SideBar from "../../components/sideBar/SideBar";
import Dashboard from "../Dashboard/Dashboard";
import Chats from "../Chats/Chats";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Root = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar*/}
        <div
          className="col-3 col-md-2 p-0 vh-100"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <SideBar />
        </div>

        {/* Dashboard or Chats Section */}
        <div
          className="col-9 col-md-10 p-4"
          style={{ backgroundColor: "#6c98e0" }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chats" element={<Chats />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Root;
