import React from "react";
import styles from "./ErrorPage.module.css";
import { Link } from "react-router";

function ErrorPage() {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.statuscode}>404</div>
        <div className={styles.desc}>
          Opps, the Page you are 
        </div>
        <div className={styles.desc}>
          looking for doesn't exist
        </div>
        <Link to={"/home"} className={styles.return}>Return to Homepage</Link>
      </div>
    </>
  );
}

export default ErrorPage;
