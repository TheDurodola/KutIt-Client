import React from "react";
import styles from "./Unauthorized.module.css";
import { Link } from "react-router";

function Unauthorized() {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.statuscode}>401</div>
        <div className={styles.desc}>
          Opps, you are not logged in
        </div>
        <div className={styles.desc}>
          Kindly log in
        </div>
        <Link to={"/login"} className={styles.return}>Go to Login</Link>
      </div>
    </>
  );
}

export default Unauthorized;
