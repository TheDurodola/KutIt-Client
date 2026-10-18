import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./RedirectPage.module.css";
import { urlService } from "../../services/urlService";
import { Radio } from "lucide-react";

/**
 * Single Responsibility: Resolving incoming short code packet and redirecting to destination.
 */
export default function RedirectPage() {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [statusText, setStatusText] = useState("RESOLVING PACKET ROUTE...");

  useEffect(() => {
    let isMounted = true;

    async function fetchAndRedirect() {
      try {
        const data = await urlService.resolveShortCode(shortCode);
        if (data.response?.originalLink) {
          if (isMounted) {
            setStatusText("ROUTE RESOLVED: DISPATCHING TO ORIGIN...");
          }
          setTimeout(() => {
            window.location.href = data.response.originalLink;
          }, 400);
        } else {
          navigate("/error");
        }
      } catch {
        navigate("/error");
      }
    }

    if (shortCode) {
      fetchAndRedirect();
    } else {
      navigate("/error");
    }

    return () => {
      isMounted = false;
    };
  }, [shortCode, navigate]);

  return (
    <div className={styles.page}>
      <div className={styles.terminalBox}>
        <div className={styles.headerBar}>
          <div className={styles.dots}>
            <span className={styles.dotRed} />
            <span className={styles.dotYellow} />
            <span className={styles.dotGreen} />
          </div>
          <span className={styles.headerTitle}>DISPATCH_GATEWAY // PACKET_ROUTE</span>
        </div>

        <div className={styles.content}>
          <div className={styles.loaderIconFrame}>
            <Radio size={28} className={styles.icon} />
          </div>

          <h2 className={styles.title}>
            ROUTING SHORTCODE: <span className={styles.codeTarget}>[{shortCode}]</span>
          </h2>

          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} />
          </div>

          <div className={styles.terminalStatus}>
            <span>&gt; {statusText}</span>
            <span className="blinking-cursor" />
          </div>

          <div className={styles.arcadeFooter}>
            <span>PACKET: TCP/IP</span>
            <span>STATUS: RESOLVING</span>
          </div>
        </div>
      </div>
    </div>
  );
}
