import "./App.css";
import { useState } from "react";
import Landing from "./components/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignupProfessional from "./components/SignupProfessional";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupProfessional />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
