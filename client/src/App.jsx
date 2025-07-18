import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard"; 


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} /> 
      </Routes>
    </>
  );
};

export default App;
