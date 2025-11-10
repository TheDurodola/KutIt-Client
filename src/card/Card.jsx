import { useState } from "react";
import styles from "./Card.module.css";
import Modal from "../modal/Modal";

export default function Card({
  id,
  originalLink,
  shortenedLink,
  createdAt,
  updatedAt,
  click,
  onDelete,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    onDelete(id);
    setIsOpen(false);
  };
  

  const BASE_URL = import.meta.env.VITE_BASE_URL_FOR_FRONTEND;
  return (
    <>
      <div className={styles.card} onClick={() => setIsOpen(true)}>
        <div className={styles.carddetails}>
          <h3 className={styles.textbody}>Shortened Link: </h3>
          <p>
            {BASE_URL}{shortenedLink}
          </p>
        </div>
      </div>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <h2>Link Details</h2>
          <p>
            <strong>Original Link:</strong> {originalLink}
          </p>
          <p>
            <strong>Shortened Link:</strong>
            {BASE_URL}{shortenedLink}
          </p>
          <p>
            <strong>Created At:</strong> {createdAt}
          </p>
         
          <p>
            <strong>Total Clicks:</strong> {click}
          </p>

          <div className={styles.actions}>
            <button className={styles.deleteBtn} onClick={handleDelete}>
              Delete
            </button>
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
