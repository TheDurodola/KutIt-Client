import "./App.css";

import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LogInPage from "./pages/LogInPage";
import Unauthorized from "./pages/UnauthorizedS"
import SignUpPage from "./pages/SignUpPage";
import RedirectPage from "./pages/RedirectPage";
import ErrorPage from "./pages/ErrorPage"
import Dashboard from "./pages/Dashboard"


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/error" element={<ErrorPage />}/>
        <Route path="/unauthorized" element={<Unauthorized />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/:shortCode" element={<RedirectPage />} />
      </Routes>
    </>
  );
}

export default App;
