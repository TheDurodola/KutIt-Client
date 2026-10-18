import { useState } from "react";
import styles from "./ProfilePage.module.css";
import Sidebar from "../../components/layout/Sidebar";
import Button from "../../components/common/Button";
import Toast from "../../components/common/Toast";
import { useToast } from "../../hooks/useToast";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import {
  User,
  Shield,
  LogOut,
  Cpu,
  Monitor,
  CheckCircle2,
} from "lucide-react";

/**
 * Single Responsibility: View coordinating operator clearance profile,
 * security credential display, and monitor preferences.
 */
export default function ProfilePage() {
  const navigate = useNavigate();
  const [scanlinesActive, setScanlinesActive] = useState(true);
  const { toast, showToast, hideToast } = useToast(5000);

  const handleLogOut = async () => {
    try {
      await authService.logout();
      navigate("/home");
    } catch (err) {
      showToast(err.message || "Failed to terminate session.", "error");
    }
  };

  return (
    <div className={styles.page}>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      <Sidebar onLogout={handleLogOut} />

      <main className={styles.body}>
        <div className={styles.container}>
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.headerTitleGroup}>
              <div className={styles.tag}>
                <Shield size={14} />
                <span>OPERATOR_SECURITY_CONSOLE</span>
              </div>
              <h1 className={styles.title}>OPERATOR_PROFILE</h1>
              <p className={styles.subtitle}>
                Inspect session permissions, cryptographic identity, and terminal preferences.
              </p>
            </div>

            <Button
              variant="danger"
              size="sm"
              icon={<LogOut size={14} />}
              onClick={handleLogOut}
            >
              TERMINATE_SESSION
            </Button>
          </header>

          {/* Asymmetric Profile Grid */}
          <div className={styles.profileGrid}>
            {/* Operator Identity Card */}
            <div className={`${styles.card} ${styles.cardWide}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardHeaderTitle}>// OPERATOR_CREDENTIALS</span>
                <span className={styles.badgeActive}>STATUS: ACTIVE</span>
              </div>

              <div className={styles.identityContent}>
                <div className={styles.avatarBox}>
                  <User size={38} className={styles.avatarIcon} />
                </div>
                <div className={styles.idDetails}>
                  <div className={styles.callsign}>CALLSIGN: OPERATOR_PRIMARY</div>
                  <div className={styles.idMeta}>CLEARANCE: LEVEL_01_ADMIN</div>
                  <div className={styles.idSession}>ENCRYPTION: SHA-256 SESSION HASH</div>
                </div>
              </div>

              <div className={styles.metaSpecs}>
                <div className={styles.metaRow}>
                  <span className={styles.metaKey}>SESSION_STATUS:</span>
                  <span className={styles.metaValGreen}>
                    <CheckCircle2 size={13} />
                    AUTHENTICATED
                  </span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaKey}>AUTH_TOKEN:</span>
                  <span className={styles.metaValMono}>HTTP_ONLY // SECURE_COOKIE</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaKey}>NETWORK_NODE:</span>
                  <span className={styles.metaValYellow}>KUTIT_GATEWAY_V1</span>
                </div>
              </div>
            </div>

            {/* Terminal Configuration Card */}
            <div className={`${styles.card} ${styles.cardCompact}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardHeaderTitle}>// TERMINAL_SPECS</span>
                <Cpu size={14} className={styles.specIcon} />
              </div>

              <div className={styles.configContent}>
                <div className={styles.configRow}>
                  <div className={styles.configLabelGroup}>
                    <Monitor size={15} />
                    <span>CRT_SCANLINES</span>
                  </div>
                  <button
                    className={`${styles.toggleBtn} ${
                      scanlinesActive ? styles.toggleOn : styles.toggleOff
                    }`}
                    onClick={() => setScanlinesActive(!scanlinesActive)}
                    type="button"
                  >
                    {scanlinesActive ? "ENABLED" : "DISABLED"}
                  </button>
                </div>

                <div className={styles.specList}>
                  <div className={styles.specItem}>
                    <span>PHOSPHOR PALETTE:</span>
                    <span className={styles.specVal}>#2CFF56 (GREEN)</span>
                  </div>
                  <div className={styles.specItem}>
                    <span>ACCENT FREQUENCY:</span>
                    <span className={styles.specValYellow}>#FFB200 (AMBER)</span>
                  </div>
                  <div className={styles.specItem}>
                    <span>MONITOR CLOCK:</span>
                    <span className={styles.specVal}>60 HZ REFRESH</span>
                  </div>
                </div>

                <div className={styles.arcadeBanner}>
                  <span>CREDITS REMAINING: 99</span>
                  <span className={styles.blinkHint}>INSERT COIN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
