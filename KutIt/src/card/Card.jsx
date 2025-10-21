import styles from "./Card.module.css";

export default function Card({originalLink, shortenLink, created_at, updated_at, clicks}) {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.carddetails}>
          {/* <p className={styles.texttitle}>Facebook</p> */}
          <p className={styles.textbody}>Original Link: {originalLink}</p>
          <p className={styles.textbody}>Shortened Link: {shortenLink}</p>
          <p className={styles.textbody}>Created On: {created_at}</p>
          <p className={styles.textbody}>Clicks: {clicks}</p>
        </div>
      </div>
    </>
  );
}
