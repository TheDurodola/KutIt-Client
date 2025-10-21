import "./App.css";

import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
// import ErrorPage from "./pages/ErrorPage"
// import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* <Route path="/error" element={<ErrorPage />}/> */}
        {/* <Route path="/dashaboard" element={<Dashboard />}/> */}
      </Routes>
    </>
  );
}

export default App;
