import { useState } from "react";
import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Button from "../../components/common/Button";
import Toast from "../../components/common/Toast";
import { useToast } from "../../hooks/useToast";
import { useClipboard } from "../../hooks/useClipboard";
import { urlService } from "../../services/urlService";
import { getFullShortUrl } from "../../config/env";
import {
  Zap,
  BarChart3,
  Cpu,
  Shield,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  Flame,
} from "lucide-react";

/**
 * Single Responsibility: Landing page view coordinating the public compression form,
 * hero telemetry presentation, and feature specs.
 */
export default function LandingPage() {
  const [form, setForm] = useState({ originalLink: "" });
  const [generatedLink, setGeneratedLink] = useState(null);
  const [loading, setLoading] = useState(false);

  const { toast, showToast, hideToast } = useToast(5000);
  const { copied, copy } = useClipboard(2000);

  const isDisabled = !form.originalLink.trim() || loading;

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (isDisabled) return;
    setLoading(true);

    try {
      const data = await urlService.shortenPublic(form.originalLink);
      const fullUrl = getFullShortUrl(data.response?.shortenedLink);

      await copy(fullUrl);
      setGeneratedLink(fullUrl);
      showToast("PACKET_CONDENSED: Copied to clipboard!", "success", 4000);
    } catch (err) {
      showToast(err.message || "Failed to compress route", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyGenerated = () => {
    if (!generatedLink) return;
    copy(generatedLink);
  };

  return (
    <div className={styles.page}>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      <Navbar />

      <main className={styles.mainContainer}>
        {/* Asymmetric Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.arcadeBadge}>
              <Flame size={12} />
              <span>8-BIT URL COMPRESSOR // STAGE 1</span>
            </div>

            <h1 className={styles.heroTitle}>
              CONDENSE LONG LINKS INTO <span className={styles.accentText}>SUB-PIXEL</span> CODES
            </h1>

            <p className={styles.heroSubtitle}>
              Transform bulky, unreadable URLs into high-speed retro shortcodes. Instant packet routing, zero tracking baggage, calibrated for modern cyberspace.
            </p>

            {/* Terminal Input Box */}
            <div className={styles.terminalBox}>
              <div className={styles.terminalHeader}>
                <div className={styles.terminalDots}>
                  <span className={`${styles.terminalDot} ${styles.dotRed}`} />
                  <span className={`${styles.terminalDot} ${styles.dotYellow}`} />
                  <span className={`${styles.terminalDot} ${styles.dotGreen}`} />
                </div>
                <span className={styles.terminalTitle}>bash - kutit --compress</span>
              </div>

              <form className={styles.urlForm} onSubmit={handleSubmission}>
                <label htmlFor="originalLinkInput" className={styles.inputLabel}>
                  TARGET_URL_INPUT &gt;
                </label>
                <div className={styles.inputGroup}>
                  <div className={styles.promptPrefix}>&gt;</div>
                  <input
                    id="originalLinkInput"
                    className={styles.input}
                    type="url"
                    name="originalLink"
                    value={form.originalLink}
                    placeholder="https://example.com/very/long/destination/path"
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
                    className={styles.submitBtn}
                    icon={copied ? <Check size={16} /> : <Zap size={16} />}
                  >
                    {loading ? "ROUTING..." : copied ? "COPIED!" : "COMPRESS_LINK"}
                  </Button>
                </div>
              </form>

              {/* Generated Result Box */}
              {generatedLink && (
                <div className={styles.resultBox}>
                  <span className={styles.resultLabel}>// GENERATED SHORTCODE:</span>
                  <div className={styles.resultRow}>
                    <a
                      href={generatedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.resultLink}
                    >
                      {generatedLink}
                      <ExternalLink size={13} />
                    </a>
                    <button
                      type="button"
                      className={styles.copyBtn}
                      onClick={handleCopyGenerated}
                    >
                      {copied ? <Check size={13} /> : <Copy size={13} />}
                      <span>{copied ? "COPIED" : "COPY"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Account CTA */}
            <div className={styles.adArea}>
              <span className={styles.adHint}>[OPERATOR NOTICE]</span>
              <p className={styles.adText}>
                Need to inspect telemetry, click counts, and keep history?
              </p>
              <Link to="/signup" className={styles.signupLink}>
                ENLIST OPERATOR ACCOUNT <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Asymmetric Hero Side Terminal Display */}
          <div className={styles.heroSidebar}>
            <div className={styles.sideTerminalFrame}>
              <div className={styles.frameHeader}>
                <span>CRT_TELEMETRY.LOG</span>
                <span className={styles.blinkSignal}>REC</span>
              </div>
              <div className={styles.telemetryContent}>
                <div className={styles.codeLine}>
                  <span className={styles.logGreen}>[BOOT]</span> 8-BIT KERNEL INITIALIZED
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.logYellow}>[PORT]</span> LISTENING ON HTTP/5173
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.logDim}>[VRAM]</span> 64K PHOSPHOR MATRIX
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.logGreen}>[PUMP]</span> PACKET CONDENSER ACTIVE
                </div>

                <div className={styles.asciiDivider}>
                  +-------------------------------+
                </div>

                <div className={styles.metricsBox}>
                  <div className={styles.metricItem}>
                    <span className={styles.metricNum}>0.08ms</span>
                    <span className={styles.metricName}>DISPATCH LATENCY</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricNum}>100%</span>
                    <span className={styles.metricName}>RETRO PURITY</span>
                  </div>
                </div>

                <div className={styles.asciiArt}>
{`  ___  _ _       _  _   
 | _ )(_) |_ ___(_)| |_ 
 | _ \\| |  _/ -_) ||  _|
 |___/|_|\\__\\___|_| \\__|`}
                </div>

                <div className={styles.systemFooter}>
                  <span>STATUS: 200 OK</span>
                  <span className={styles.insertCoin}>INSERT COIN</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Sections: Asymmetric grid with varied card sizes */}
        <section className={styles.featureSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionCategory}>// SYSTEM_SPECIFICATIONS</span>
            <h2 className={styles.sectionTitle}>BUILT WITH 8-BIT CRAFTSMANSHIP</h2>
          </div>

          <div className={styles.asymmetricGrid}>
            <div className={`${styles.featureCard} ${styles.cardWide}`}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>
                  <Zap size={20} />
                </div>
                <span className={styles.featureIndex}>01 // PACKET_ACCELERATOR</span>
              </div>
              <h3 className={styles.featureTitle}>LIGHTNING ROUTE RESOLUTION</h3>
              <p className={styles.featureDesc}>
                Sub-millisecond packet lookup table maps incoming short codes straight to target locations with zero bloat or tracker baggage.
              </p>
              <div className={styles.featureTag}>BENCHMARK: SUB-10MS DISPATCH</div>
            </div>

            <div className={`${styles.featureCard} ${styles.cardCompact}`}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>
                  <BarChart3 size={20} />
                </div>
                <span className={styles.featureIndex}>02 // TELEMETRY</span>
              </div>
              <h3 className={styles.featureTitle}>LIVE HIT TELEMETRY</h3>
              <p className={styles.featureDesc}>
                Every click registers directly in the matrix. Inspect click counters in real-time from your operator command center.
              </p>
              <div className={styles.featureTag}>COUNTER: ATOMIC INTEGER</div>
            </div>

            <div className={`${styles.featureCard} ${styles.cardCompact}`}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>
                  <Cpu size={20} />
                </div>
                <span className={styles.featureIndex}>03 // FOOTPRINT</span>
              </div>
              <h3 className={styles.featureTitle}>MICRO BYTE STRINGS</h3>
              <p className={styles.featureDesc}>
                Engineered for maximum density. Fits effortlessly into terminal consoles, IRC chats, SMS, and QR arrays.
              </p>
              <div className={styles.featureTag}>MEMORY: ULTRA LEAN</div>
            </div>

            <div className={`${styles.featureCard} ${styles.cardWide}`}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>
                  <Shield size={20} />
                </div>
                <span className={styles.featureIndex}>04 // VAULT_CONTROL</span>
              </div>
              <h3 className={styles.featureTitle}>OPERATOR COMMAND VAULT</h3>
              <p className={styles.featureDesc}>
                Authenticate to unlock link lifecycle control. Manage, audit, inspect details, or wipe obsolete routes permanently.
              </p>
              <div className={styles.featureTag}>CONTROL: OPERATOR LEVEL 1</div>
            </div>
          </div>
        </section>
      </main>

      {/* Arcade Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerTop}>
            <span className={styles.footerLogo}>KUT_IT // TERMINAL</span>
            <span className={styles.footerStatus}>HIGH SCORE: 999,990</span>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.footerCopy}>
              &copy; 1984-2026 KUTIT TERMINAL CORP. ALL CHIPS RESERVED.
            </p>
            <div className={styles.footerLinks}>
              <Link to="/home">HOMEPAGE</Link>
              <Link to="/login">LOGIN</Link>
              <Link to="/signup">REGISTER</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
