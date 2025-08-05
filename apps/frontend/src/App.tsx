import "./App.css";
import { useState } from "react";
import Landing from "./components/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Signupclient from "./components/Signupclient";
import SignupProfessional from "./components/SignupProfessional";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/client" element={<Signupclient />} />
          <Route path="/signup/professional" element={<SignupProfessional />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
