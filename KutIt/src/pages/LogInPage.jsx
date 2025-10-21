import styles from "./LoginPage.module.css";
import sidepicture from "../assets/Abuja1.jpg";
import { Link } from "react-router";
import { useState } from "react";
import logo from "../assets/KutItLogo.png";

const BASE_URL = import.meta.env.VITE_BASE_URL_FOR_BACKEND;

export default function LoginPage() {
  const [error, setError] = useState(""); 
  const [showError, setShowError] = useState(false); 
  const [form, setForm] = useState({ identifier: "", password: "" });
  const isDisabled = !form.identifier || !form.password;


   const triggerError = (msg) => {
    setError(msg);
    setShowError(true);
    setTimeout(() => setShowError(false), 5000); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data)
        triggerError(data.message)        
      }
    } catch (err) {
      triggerError("Didn't get to the backend");
    }
  };

  return (
    <>
      <div className={styles.page}>
        <div className={`${styles.toast} ${showError ? styles.show : ""}`}>
        {error}
      </div>
        <img src={sidepicture} alt="" className={styles.sidepicture} />

        <div className={styles.body}>
          
          <Link to={"/home"}>
            <img src={logo} alt="KutIt Logo" className={styles.logo} />
          </Link>
          <div className={styles.header}>
            <h3 className={styles.header}>Login</h3>
          </div>
          <form className={styles.urlform} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              name="identifier"
              id="identifier"
              type="text"
              placeholder="Username or Email"
              value={form.identifier}
              onChange={(e) => {
                setForm({ ...form, [e.target.name]: e.target.value });
              }}
            />
            <input
              className={styles.input}
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, [e.target.name]: e.target.value });
              }}
            />
            <input
              className={`${styles.loginbtn} ${
                isDisabled ? styles.disabled : styles.enabled
              }`}
              type="submit"
              disabled={isDisabled}
            />
            <p>
              Don't have an account,&nbsp;
              <Link to={"/signup"} className={styles.signuptext}>
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
