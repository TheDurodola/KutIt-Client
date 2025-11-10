import React from "react";
import styles from "./Sidebar.module.css";
import logo from "../assets/KutitLogo.png";
import { useNavigate } from "react-router";
import { Link } from "react-router";
function Sidebar() {
  const BASE_URL = import.meta.env.VITE_BASE_URL_FOR_BACKEND;
  const navigate = useNavigate()

  const handleLogOut = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/home");
      } else {
        const data = await response.json();
        triggerError(data.message || "Unable to log out");
      }
    } catch (err) {
      triggerError("Unable to log out — check your connection.");
    }
  };

  return (
    
      <div className={styles.sidebar}>
        <img src={logo} alt="Logo" />
        <ul className={styles.menu}>
          
         <Link to={"/dashboard"}>
          <li >Dashboard</li>
          </Link>
          <Link to={"/profile"}>
          <li>Account</li>
          </Link>
          <li
            className={styles.logout}
            onClick={() => {
              handleLogOut();
            }}
          >
            Log Out
          </li>
        </ul>
      </div>
   
  );
}

export default Sidebar;
