import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Landing from "./components/Landing";
import Login from "./components/Login";
import SignupProfessional from "./components/SignupProfessional";
import MedicalExpertCards, { experts } from "./components/MedicalExpertCards";
import ExpertDetails from "./components/ExpertDetails";

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
            <Route path="/result" element={<MedicalExpertCards />} />
            <Route
              path="expert/:id"
              element={<ExpertDetails experts={experts} />}
            />
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
