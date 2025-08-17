import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Landing from "./components/Landing";
import LoginPage from "./components/LoginPage";
import SignupProfessional from "./components/SignupProfessional";
import MedicalExpertCards from "./components/MedicalExpertCards";
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
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupProfessional />} />
            </Route>
            <Route path="/experts" element={<MedicalExpertCards />} />
            <Route path="experts/:id" element={<ExpertDetails />} />
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
