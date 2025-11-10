import styles from "./Dashboard.module.css";
import logo from "../assets/KutitLogo.png";
import Sidebar from "../components/Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Card from "../card/Card.jsx";
import { useState } from "react";

const Dashboard = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_FOR_BACKEND;
  const navigate = useNavigate();
  const [form, setForm] = useState({ originalLink: "" });
  const [message, setMessage] = useState("Shorten");
  const [links, setLinks] = useState([]);
  const [color, setColor] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const fetchLinks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user/entries`, {
          credentials: "include",
        });
        const data = await response.json();

        if(response.status==401){
          navigate("/unauthorized")
        }
        if (!response.ok) {
          
          triggerError(data.message || "Failed to load links");
        } else {
          console.log(data)
          setLinks(data.response.entries || []);
        }
      } catch (err) {
        triggerError("Unable to connect to server.");
        navigate("/home")
      }
    };

   useEffect(() => {
    fetchLinks();
  }, [BASE_URL]);

  const isDisabled = !form.originalLink;

  const triggerError = (msg) => {
    setError(msg);
    setShowError(true);
    setTimeout(() => setShowError(false), 5000);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/user/entry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        triggerError(data.message);
      } else {
        navigator.clipboard.writeText(
          "http://localhost:5173/" + data.response.shortenedLink
        );
       fetchLinks()
        setMessage("Copied");
        setColor("#4bf63b");
        setTimeout(() => {
          setColor(""), setMessage("Shorten");
        }, 3000);
      }
    } catch (err) {
      triggerError(
        "Oops! Looks like we can’t reach the server right now. Check your connection and try again."
      );
    }
  };

   const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/user/entry/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setLinks((prev) => prev.filter((link) => link.id !== id));
      } else {
        const data = await response.json();
        triggerError(data.message || "Failed to delete link");
      }
    } catch (err) {
      triggerError("Unable to delete link — check your connection.");
    }
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
        {/* <div className={styles.sidebar}>
          <img src={logo} alt="Logo" />
          <ul className={styles.menu}>
            <li>Dashboard</li>
            <li>Account</li>
            <li
              className={styles.logout}
              onClick={() => {
                handleLogOut()
              }}
            >
              Log Out
            </li>
          </ul>
        </div>
       */}
       <Sidebar></Sidebar>
        <div className={styles.body}>
          <div className={styles.header}>KutIt</div>
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
            <input className={styles.submit} type="submit" value={message} />
          </form>
          <div className={styles.cards}>
             <div className={styles.cards}>
            {links.length === 0 ? (
              <p>No links yet. Shorten a URL to get started!</p>
            ) : (
              links.map((link) => (
                <Card
                  key={link.id}
                  {...link}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
