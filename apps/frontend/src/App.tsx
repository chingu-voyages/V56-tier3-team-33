import "./App.css";
import { useState } from "react";
import Landing from "./components/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignupProfessional from "./components/SignupProfessional";
import Expertlist from "./components/Expertlist";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupProfessional />} />
          <Route path="/result" element={<Expertlist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
