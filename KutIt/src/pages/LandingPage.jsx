import styles from "./LandingPage.module.css";
import Button from "../button/LogButton";
import logo from "../assets/KutItLogo.png";
import { Link } from "react-router";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL_FOR_BACKEND;

export default function LandingPage() {
  const [form, setForm] = useState({ originalLink: "" });
  const [message, setMessage] = useState("Shorten");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const isDisabled = !form.originalLink;

  const triggerError = (msg) => {
    setError(msg);
    setShowError(true);
    setTimeout(() => setShowError(false), 5000);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/entry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        triggerError(data.message);
      } else {
        setMessage("Copied")
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

        <div className={styles.navbar}>
          <Link to={"/home"}>
            <img src={logo} alt="KutIt Logo" className={styles.logo} />
          </Link>
          <div className={styles.btnArea}>
            <Button buttonTitle="Log In" link="/login"></Button>
            <Button buttonTitle="Sign Up" link="/signup"></Button>
          </div>
        </div>
        <div className={styles.hero}>
          <h3 className={styles.header}>Shorten your long link</h3>
          <form className={styles.urlform} onSubmit={handleSubmission}>
            <input
              className={styles.input}
              type="text"
              name="originalLink"
              value={form.originalLink}
              placeholder="Enter your URL"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            />
            <input
              className={`${styles.submit} ${
                isDisabled ? styles.enabled : styles.disabled
              }`}
              type="submit"
              value={message}
            />
          </form>
          <div className={styles.adArea}>
            <p>Want to keep track of your shorten links?</p>
            <p>
              Create an account with us today&nbsp;
              <Link to="/signup" className={styles.signuptext}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
