import React from "react";
import styles from "./UnauthorizedPage.module.css";
import Button from "../../components/common/Button";
import { ShieldAlert, KeyRound, Home, UserPlus } from "lucide-react";

/**
 * Single Responsibility: 401 Unauthorized / Access denied view presentation.
 */
export default function UnauthorizedPage() {
  return (
    <div className={styles.page}>
      <div className={styles.terminalWindow}>
        <div className={styles.windowHeader}>
          <div className={styles.dots}>
            <span className={styles.dotRed} />
            <span className={styles.dotYellow} />
            <span className={styles.dotGreen} />
          </div>
          <span className={styles.windowTitle}>SECURITY_DAEMON // ACCESS_DENIED</span>
        </div>

        <div className={styles.content}>
          <div className={styles.securityBadge}>
            <ShieldAlert size={16} />
            <span>*** UNAUTHORIZED PACKET ***</span>
          </div>

          <div className={styles.statusCode}>401</div>

          <h1 className={styles.statusTitle}>ACCESS_DENIED</h1>

          <p className={styles.statusDesc}>
            Mainframe firewall intercepted anonymous request. An active operator session token is mandatory to decrypt command center routes.
          </p>

          <div className={styles.terminalPromptBox}>
            <div className={styles.promptLine}>
              <span className={styles.promptArrow}>&gt;</span>
              <span>VERIFYING CREDENTIAL BUFFER: [ EMPTY ]</span>
            </div>
            <div className={styles.promptLine}>
              <span className={styles.promptArrow}>&gt;</span>
              <span>SECURITY PROTOCOL: ESCALATION LEVEL 1</span>
            </div>
            <div className={styles.promptLine}>
              <span className={styles.promptArrow}>&gt;</span>
              <span>ACTION: AWAITING OPERATOR INPUT...</span>
            </div>
          </div>

          <div className={styles.actionRow}>
            <Button
              link="/login"
              variant="primary"
              size="md"
              icon={<KeyRound size={16} />}
            >
              AUTHENTICATE_LOGIN
            </Button>
            <Button
              link="/signup"
              variant="secondary"
              size="md"
              icon={<UserPlus size={16} />}
            >
              REGISTER_ACCOUNT
            </Button>
            <Button
              link="/home"
              variant="ghost"
              size="md"
              icon={<Home size={16} />}
            >
              HOMEPAGE
            </Button>
          </div>

          <div className={styles.arcadeFooter}>
            <span>CREDITS: 01</span>
            <span className={styles.blinkPrompt}>PRESS START TO LOGIN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
