import React, { useState } from "react";
import styles from "./Card.module.css";
import Modal from "../Modal";
import Button from "../Button";
import { useClipboard } from "../../../hooks/useClipboard";
import { getFullShortUrl } from "../../../config/env";
import {
  Copy,
  Check,
  ExternalLink,
  Trash2,
  BarChart3,
  Calendar,
  Link2,
} from "lucide-react";

/**
 * Single Responsibility: Presentational URL Telemetry Card with details inspection and copy pipeline.
 */
export default function Card({
  id,
  originalLink,
  shortenedLink,
  createdAt,
  click = 0,
  onDelete,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { copied, copy } = useClipboard(2000);

  const fullShortUrl = getFullShortUrl(shortenedLink);

  const handleCopy = (e) => {
    e.stopPropagation();
    copy(fullShortUrl);
  };

  const handleDelete = () => {
    onDelete?.(id);
    setIsOpen(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "UNKNOWN";
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <>
      <div
        className={styles.card}
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsOpen(true);
          }
        }}
      >
        <div className={styles.cardHeader}>
          <div className={styles.tag}>
            <Link2 size={13} className={styles.tagIcon} />
            <span className={styles.tagText}>CODE: {shortenedLink || "N/A"}</span>
          </div>
          <div className={styles.clicksBadge}>
            <BarChart3 size={12} />
            <span>{click} HITS</span>
          </div>
        </div>

        <div className={styles.cardBody}>
          <div className={styles.urlSection}>
            <span className={styles.label}>SHORT LINK</span>
            <div className={styles.shortUrlRow}>
              <span className={styles.shortUrlText}>{fullShortUrl}</span>
              <button
                type="button"
                className={`${styles.iconBtn} ${copied ? styles.copiedBtn : ""}`}
                onClick={handleCopy}
                title="Copy to clipboard"
                aria-label="Copy short link"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          <div className={styles.targetSection}>
            <span className={styles.label}>TARGET DESTINATION</span>
            <p className={styles.originalUrlText} title={originalLink}>
              {originalLink}
            </p>
          </div>
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.dateMeta}>
            <Calendar size={12} />
            <span>{formatDate(createdAt)}</span>
          </div>
          <span className={styles.inspectHint}>[INSPECT]</span>
        </div>
      </div>

      {isOpen && (
        <Modal title="LINK_INSPECTOR" onClose={() => setIsOpen(false)}>
          <div className={styles.modalBody}>
            <div className={styles.modalRow}>
              <span className={styles.modalLabel}>TARGET DESTINATION:</span>
              <div className={styles.modalValueBox}>
                <a
                  href={originalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalLink}
                >
                  {originalLink}
                  <ExternalLink size={13} className={styles.extIcon} />
                </a>
              </div>
            </div>

            <div className={styles.modalRow}>
              <span className={styles.modalLabel}>SHORTENED URL:</span>
              <div className={styles.modalShortUrlRow}>
                <span className={styles.modalShortUrl}>{fullShortUrl}</span>
                <button
                  type="button"
                  className={styles.modalCopyBtn}
                  onClick={handleCopy}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? "COPIED" : "COPY"}</span>
                </button>
              </div>
            </div>

            <div className={styles.modalGrid}>
              <div className={styles.gridStat}>
                <span className={styles.statLabel}>TOTAL TELEMETRY</span>
                <span className={styles.statNumber}>{click} CLICKS</span>
              </div>
              <div className={styles.gridStat}>
                <span className={styles.statLabel}>TIMESTAMP</span>
                <span className={styles.statDate}>{formatDate(createdAt)}</span>
              </div>
            </div>

            <div className={styles.modalActions}>
              <Button
                variant="danger"
                size="sm"
                icon={<Trash2 size={14} />}
                onClick={handleDelete}
              >
                DELETE LINK
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                CLOSE TERMINAL
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
