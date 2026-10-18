import { useState, useCallback } from "react";
import styles from "./DashboardPage.module.css";
import Sidebar from "../../components/layout/Sidebar";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Toast from "../../components/common/Toast";
import { useToast } from "../../hooks/useToast";
import { useClipboard } from "../../hooks/useClipboard";
import { useUserUrls } from "../../hooks/useUserUrls";
import { getFullShortUrl } from "../../config/env";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  FolderOpen,
  Check,
  Radio,
  Layers,
} from "lucide-react";

/**
 * Single Responsibility: View coordinating the Operator Command Center dashboard,
 * telemetry overview, and route management matrix.
 */
export default function DashboardPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ originalLink: "" });

  const { toast, showToast, hideToast } = useToast(5000);
  const { copied, copy } = useClipboard(3000);

  const handleUnauthorized = useCallback(() => {
    navigate("/unauthorized");
  }, [navigate]);

  const handleError = useCallback((msg) => {
    showToast(msg, "error");
  }, [showToast]);

  const {
    links,
    isLoading: fetchingLinks,
    isSubmitting: loading,
    createUrl,
    deleteUrl,
  } = useUserUrls({
    onUnauthorized: handleUnauthorized,
    onError: handleError,
  });

  const isDisabled = !form.originalLink.trim() || loading;

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (isDisabled) return;

    try {
      const shortCode = await createUrl(form.originalLink);
      const fullUrl = getFullShortUrl(shortCode);

      await copy(fullUrl);
      setForm({ originalLink: "" });
      showToast("ROUTE_DEPLOYED: Copied to clipboard!", "success", 4000);
    } catch {
      // error handled by hook
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUrl(id);
      showToast("ROUTE_PURGED: Link removed from matrix.", "info", 3000);
    } catch {
      // error handled by hook
    }
  };

  const totalHits = links.reduce((acc, curr) => acc + (Number(curr.click) || 0), 0);

  return (
    <div className={styles.page}>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      <Sidebar />

      <main className={styles.body}>
        <div className={styles.contentContainer}>
          {/* Header Bar */}
          <header className={styles.dashboardHeader}>
            <div className={styles.headerTitleGroup}>
              <div className={styles.statusLive}>
                <Radio size={14} className={styles.liveIcon} />
                <span>MAINFRAME_ONLINE</span>
              </div>
              <h1 className={styles.headerTitle}>OPERATOR_DASHBOARD</h1>
              <p className={styles.headerSub}>Manage active routes and inspect hit telemetry.</p>
            </div>

            {/* Quick Metrics Ticker */}
            <div className={styles.statsBar}>
              <div className={styles.statBox}>
                <span className={styles.statKey}>ACTIVE_ROUTES</span>
                <span className={styles.statVal}>{links.length}</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statKey}>TOTAL_CLICKS</span>
                <span className={styles.statValYellow}>{totalHits}</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statKey}>SECTOR</span>
                <span className={styles.statValGreen}>NODE_01</span>
              </div>
            </div>
          </header>

          {/* New Route Command Input Terminal */}
          <section className={styles.commandTerminal}>
            <div className={styles.terminalTopBar}>
              <div className={styles.dotsGroup}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <span className={styles.terminalPromptLabel}>
                user@kutit:~$ route_deploy --persist
              </span>
            </div>

            <form className={styles.urlForm} onSubmit={handleSubmission}>
              <label htmlFor="dashboardLinkInput" className={styles.inputLabel}>
                TARGET_DESTINATION_URL &gt;
              </label>

              <div className={styles.inputGroup}>
                <div className={styles.promptPrefix}>&gt;</div>
                <input
                  id="dashboardLinkInput"
                  className={styles.input}
                  type="url"
                  name="originalLink"
                  value={form.originalLink}
                  placeholder="https://your-long-destination-url.com/docs/api"
                  required
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                />
                <Button
                  type="submit"
                  variant={copied ? "success" : "primary"}
                  size="md"
                  disabled={isDisabled}
                  className={styles.deployBtn}
                  icon={copied ? <Check size={16} /> : <Zap size={16} />}
                >
                  {loading ? "DEPLOYING..." : copied ? "COPIED!" : "COMPRESS_ROUTE"}
                </Button>
              </div>
            </form>
          </section>

          {/* Links Matrix Section */}
          <section className={styles.matrixSection}>
            <div className={styles.matrixHeader}>
              <div className={styles.matrixTitle}>
                <Layers size={16} />
                <h2>REGISTERED_ROUTE_MATRIX</h2>
              </div>
              <span className={styles.matrixCount}>
                [ {links.length} {links.length === 1 ? "ENTRY" : "ENTRIES"} LOADED ]
              </span>
            </div>

            {fetchingLinks ? (
              <div className={styles.cardsGrid}>
                {[1, 2, 3].map((i) => (
                  <div key={i} className={styles.skeletonCard}>
                    <div className={styles.skeletonLineShort} />
                    <div className={styles.skeletonLineFull} />
                    <div className={styles.skeletonLineMed} />
                  </div>
                ))}
              </div>
            ) : links.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIconFrame}>
                  <FolderOpen size={36} className={styles.emptyIcon} />
                </div>
                <h3 className={styles.emptyTitle}>NO_ACTIVE_ROUTES_FOUND</h3>
                <p className={styles.emptyText}>
                  Your operator vault contains no short codes yet. Deploy your first compressed link using the terminal above.
                </p>
                <div className={styles.emptyTag}>BUFFER: CLEAN // 0 BYTES OCCUPIED</div>
              </div>
            ) : (
              <div className={styles.cardsGrid}>
                {links.map((link) => (
                  <Card
                    key={link.id}
                    {...link}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
