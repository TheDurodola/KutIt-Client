import styles from "./SignUpPage.module.css";

import sidepicture from "../assets/Lagos1.jpg";
import { Link } from "react-router";
import { useState } from "react";
import logo from "../assets/KutItLogo.png";

const BASE_URL = import.meta.env.VITE_BASE_URL_FOR_BACKEND;

export default function SignUpPage() {
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("Sign Up");
  const [confirmPassword, setConfirmPassword] = useState();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const isDisabled =
    !form.firstName ||
    !form.lastName ||
    !form.username ||
    !form.email ||
    !form.password;

  const triggerError = (msg) => {
    setError(msg);
    setShowError(true);
    setTimeout(() => setShowError(false), 5000);
  };

  const handleSignUp = async (e) => {
    e.preventDefault(e);

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        triggerError(data.message);
      }
    } catch (err) {
      triggerError(
        "Oops! Looks like we can’t reach the server right now. Check your connection and try again."
      );
    }
  };

  return (
    <>
      <div className={styles.page}>
        <div className={`${styles.toast} ${showError ? styles.show : ""}`}>
          {error}
        </div>
        <div className={styles.body}>
          <h3 className={styles.header}>Register</h3>
          <Link to={"/home"}>
            <img src={logo} alt="KutIt Logo" className={styles.logo} />
          </Link>
          <form className={styles.urlform} onSubmit={handleSignUp}>
            <input
              className={styles.input}
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Firstname"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            />
            <input
              className={styles.input}
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Lastname"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            />
            <input
              className={styles.input}
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            />
            <input
              className={styles.input}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            />
            <input
              className={styles.input}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            />
            
            <input
              className={`${styles.submit} ${
                isDisabled ? styles.disabled : styles.enabled
              }`}
              type="submit"
              disabled={isDisabled}
              value={message}
            />
            <p>
              Already have an account,&nbsp;
              <Link to={"/login"} className={styles.logintext}>
                Log In
              </Link>
            </p>
          </form>
        </div>
        <img src={sidepicture} alt="" className={styles.sidepicture} />
      </div>
    </>
  );
}
