import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../../assets/KutItLogo.png";
import { Link } from "react-router-dom";
import Button from "../../common/Button";

/**
 * Single Responsibility: Presentational public navigation header.
 */
export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/home" className={styles.logoGroup}>
          <div className={styles.logoFrame}>
            <img src={logo} alt="KutIt Logo" className={styles.logo} />
          </div>
          <div className={styles.logoMeta}>
            <span className={styles.brandTitle}>KUT_IT</span>
            <span className={styles.brandTag}>[TERMINAL_V1.0]</span>
          </div>
        </Link>

        <div className={styles.arcadeTicker}>
          <span className={styles.tickerItem}>
            <span className={styles.tickerDot} />
            SYSTEM: ONLINE
          </span>
          <span className={styles.tickerDivider}>|</span>
          <span className={styles.tickerItem}>ARCADE: READY</span>
          <span className={styles.tickerDivider}>|</span>
          <span className={styles.tickerCoin}>CREDITS: 01</span>
        </div>

        <div className={styles.btnArea}>
          <Button buttonTitle="LOG IN" link="/login" variant="ghost" size="sm" />
          <Button buttonTitle="SIGN UP" link="/signup" variant="primary" size="sm" />
        </div>
      </div>
    </header>
  );
}
