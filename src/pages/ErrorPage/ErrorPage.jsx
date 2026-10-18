import React from "react";
import styles from "./ErrorPage.module.css";
import Button from "../../components/common/Button";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

/**
 * Single Responsibility: 404 System panic / route not found view.
 */
export default function ErrorPage() {
  return (
    <div className={styles.page}>
      <div className={styles.terminalWindow}>
        <div className={styles.windowHeader}>
          <div className={styles.dots}>
            <span className={styles.dotRed} />
            <span className={styles.dotYellow} />
            <span className={styles.dotGreen} />
          </div>
          <span className={styles.windowTitle}>SYSTEM_PANIC // SECTOR_404</span>
        </div>

        <div className={styles.content}>
          <div className={styles.statusBadge}>
            <AlertTriangle size={16} />
            <span>*** KERNEL EXCEPTION ***</span>
          </div>

          <div className={styles.errorCode}>404</div>

          <h1 className={styles.errorTitle}>SECTOR_NOT_FOUND</h1>

          <p className={styles.errorMsg}>
            The memory address, short route, or page you requested does not exist on this mainframe grid. The packet has dissipated into the bitstream.
          </p>

          <div className={styles.hexDump}>
{`0x00000000: 45 52 52 4F 52 5F 34 30 34 00 50 41 47 45 5F 4E  ERROR_404.PAGE_N
0x00000010: 4F 54 5F 46 4F 55 4E 44 00 53 54 41 54 55 53 21  OT_FOUND.STATUS!`}
          </div>

          <div className={styles.actionRow}>
            <Button
              link="/home"
              variant="primary"
              size="md"
              icon={<RotateCcw size={16} />}
            >
              RESTART_SYSTEM
            </Button>
            <Button
              link="/dashboard"
              variant="secondary"
              size="md"
              icon={<Home size={16} />}
            >
              DASHBOARD
            </Button>
          </div>

          <div className={styles.arcadePrompt}>
            <span>CREDITS: 00</span>
            <span className={styles.blinkContinue}>CONTINUE: 9... 8... 7...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
