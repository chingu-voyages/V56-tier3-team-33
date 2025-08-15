import "./App.css";
import Landing from "./components/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignupProfessional from "./components/SignupProfessional";
import Expertlist from "./components/Expertlist";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupProfessional />} />
            <Route path="/result" element={<Expertlist />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
