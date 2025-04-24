import React from "react";
import Login from "./pages/Login";
import Register from "./pages/register";
import Home from "./pages/home";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import PrivetRouts from "./utils/PrivetRouts";
import Notes from "./Notes";
import { useAuth } from "./contexts/auth";
import { Navigate } from "react-router-dom";

function App() {
  const {user} = useAuth()
  return (
    <>
      <NavBar />
      <Routes>
        <Route element={<PrivetRouts />}>
          <Route path="/notes" element={<Notes />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </>
  );
}

export default App;
