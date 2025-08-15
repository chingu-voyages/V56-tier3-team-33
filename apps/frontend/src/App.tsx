import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import SignupProfessional from "./components/SignupProfessional";
import Expertlist from "./components/Expertlist";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import "./App.css";

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route element={<GuestRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignupProfessional />} />
            </Route>
            <Route path="/result" element={<Expertlist />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

function GuestRoutes() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
