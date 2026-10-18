import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import RedirectPage from "./pages/RedirectPage";

/**
 * Single Responsibility: Application Route Configuration.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/:shortCode" element={<RedirectPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
