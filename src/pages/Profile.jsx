import styles from "./Profile.module.css";
import logo from "../assets/KutitLogo.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Card from "../card/Card.jsx";
import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

const Profile = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_FOR_BACKEND;
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  



  const triggerError = (msg) => {
    setError(msg);
    setShowError(true);
    setTimeout(() => setShowError(false), 5000);
  };

 
   
  


  const handleLogOut = async () =>{
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/home")
      } else {
        const data = await response.json();
        triggerError(data.message || "Unable to log out");
      }
    } catch (err) {
      triggerError("Unable to log out — check your connection.");
    }
  }

  return (
    <>
      <div className={styles.page}>
        <div className={`${styles.toast} ${showError ? styles.show : ""}`}>
          {error}
        </div>
        <Sidebar></Sidebar>
        <div className={styles.body}>
          <div className={styles.header}>Profile</div>
        
         
        </div>
      </div>
    </>
  );
};

export default Profile;
