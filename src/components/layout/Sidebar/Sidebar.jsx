import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import logo from "../../../assets/KutItLogo.png";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { authService } from "../../../services/authService";
import { Terminal, User, LogOut, Home, Menu, X, Cpu } from "lucide-react";

/**
 * Single Responsibility: Layout navigation sidebar and responsive mobile drawer.
 */
export default function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogOut = async () => {
    try {
      if (onLogout) {
        await onLogout();
      } else {
        await authService.logout();
        navigate("/home");
      }
    } catch {
      navigate("/home");
    }
  };

  const navItems = [
    { label: "DASHBOARD", path: "/dashboard", icon: <Terminal size={16} /> },
    { label: "ACCOUNT", path: "/profile", icon: <User size={16} /> },
    { label: "HOMEPAGE", path: "/home", icon: <Home size={16} /> },
  ];

  return (
    <>
      {/* Mobile Hamburger Header */}
      <div className={styles.mobileBar}>
        <Link to="/home" className={styles.mobileLogoLink}>
          <img src={logo} alt="KutIt Logo" className={styles.mobileLogo} />
          <span className={styles.brandTitle}>KUT_IT</span>
        </Link>
        <button
          className={styles.hamburgerBtn}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          type="button"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          className={styles.mobileBackdrop}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`${styles.sidebar} ${mobileOpen ? styles.mobileOpen : ""}`}
      >
        <div className={styles.brandContainer}>
          <Link to="/home" className={styles.brandLink}>
            <div className={styles.logoFrame}>
              <img src={logo} alt="KutIt Logo" className={styles.logo} />
            </div>
            <div className={styles.brandInfo}>
              <span className={styles.brandName}>KUT_IT</span>
              <span className={styles.brandSub}>SYS.TERMINAL</span>
            </div>
          </Link>
        </div>

        <div className={styles.systemStatus}>
          <div className={styles.statusRow}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>SYS_ONLINE</span>
          </div>
          <div className={styles.specBadge}>
            <Cpu size={12} />
            <span>8-BIT V1.0</span>
          </div>
        </div>

        <nav className={styles.navMenu}>
          <div className={styles.menuLabel}>// NAVIGATION</div>
          <ul className={styles.menuList}>
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <li key={item.path} className={styles.menuItem}>
                  <Link
                    to={item.path}
                    className={`${styles.navLink} ${
                      active ? styles.activeNavLink : ""
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className={styles.indicator}>
                      {active ? ">" : " "}
                    </span>
                    <span className={styles.icon}>{item.icon}</span>
                    <span className={styles.linkText}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.sidebarFooter}>
          <button
            className={styles.logoutBtn}
            onClick={handleLogOut}
            type="button"
          >
            <LogOut size={16} />
            <span>LOGOUT</span>
          </button>

          <div className={styles.arcadeCredits}>
            <span>CREDITS: 99</span>
            <span className={styles.insertCoin}>INSERT COIN</span>
          </div>
        </div>
      </aside>
    </>
  );
}
