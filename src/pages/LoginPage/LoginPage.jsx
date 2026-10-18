import { useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/KutItLogo.png";
import Button from "../../components/common/Button";
import Toast from "../../components/common/Toast";
import { useToast } from "../../hooks/useToast";
import { authService } from "../../services/authService";
import { Terminal, KeyRound, User, ArrowLeft, ShieldCheck } from "lucide-react";

/**
 * Single Responsibility: View coordinating user authentication form and security console presentation.
 */
export default function LoginPage() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);

  const { toast, showToast, hideToast } = useToast(5000);
  const navigate = useNavigate();

  const isDisabled = !form.identifier.trim() || !form.password || loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;
    setLoading(true);

    try {
      await authService.login(form);
      navigate("/dashboard");
    } catch (err) {
      showToast(err.message || "AUTHENTICATION_FAILED: Invalid credentials.");
    } finally {
      setLoading(false);
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

      <div className={styles.container}>
        <div className={styles.topBar}>
          <Link to="/home" className={styles.returnLink}>
            <ArrowLeft size={14} />
            <span>[ RETURN_TO_HOME ]</span>
          </Link>
          <div className={styles.terminalMeta}>
            <span>SYS_ID: 8086-XT</span>
            <span className={styles.dotSeparator}>::</span>
            <span className={styles.portStatus}>PORT: 5173 SECURE</span>
          </div>
        </div>

        <div className={styles.splitLayout}>
          {/* Left Console Monitor */}
          <div className={styles.consolePanel}>
            <div className={styles.consoleHeader}>
              <div className={styles.consoleDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <span className={styles.consoleTitle}>SECURITY_DAEMON // V1.0</span>
            </div>

            <div className={styles.consoleBody}>
              <div className={styles.brandBox}>
                <div className={styles.logoFrame}>
                  <img src={logo} alt="KutIt Logo" className={styles.logo} />
                </div>
                <div>
                  <h2 className={styles.brandName}>KUT_IT</h2>
                  <p className={styles.brandSub}>URL CONDENSER SUBSYSTEM</p>
                </div>
              </div>

              <div className={styles.securityBadge}>
                <ShieldCheck size={16} className={styles.shieldIcon} />
                <span>OPERATOR CLEARANCE REQUIRED</span>
              </div>

              <div className={styles.diagnosticLog}>
                <div className={styles.logRow}>&gt; INIT AUTHENTICATION_PROTOCOL</div>
                <div className={styles.logRow}>&gt; CIPHER: AES_GCM_256BIT</div>
                <div className={styles.logRow}>&gt; SESSION_TOKEN: HTTP_ONLY_COOKIE</div>
                <div className={styles.logRow}>&gt; AWAITING CREDENTIAL STREAM...<span className="blinking-cursor" /></div>
              </div>

              <div className={styles.arcadePrompt}>
                <span>INSERT OPERATOR DISKETTE</span>
                <span className={styles.creditsTag}>CREDITS: 02</span>
              </div>
            </div>
          </div>

          {/* Right Authentication Form */}
          <div className={styles.formPanel}>
            <div className={styles.formHeader}>
              <h1 className={styles.formTitle}>OPERATOR_LOGIN</h1>
              <p className={styles.formDesc}>Enter identity credentials to access console.</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.fieldGroup}>
                <label htmlFor="identifier" className={styles.fieldLabel}>
                  <User size={13} />
                  <span>OPERATOR_IDENTIFIER</span>
                </label>
                <input
                  className={styles.input}
                  name="identifier"
                  id="identifier"
                  type="text"
                  placeholder="Username or Email"
                  autoComplete="username"
                  required
                  value={form.identifier}
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="password" className={styles.fieldLabel}>
                  <KeyRound size={13} />
                  <span>SECURITY_KEY (PASSWORD)</span>
                </label>
                <input
                  className={styles.input}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isDisabled}
                className={styles.submitBtn}
                icon={<Terminal size={16} />}
              >
                {loading ? "AUTHENTICATING..." : "EXECUTE_LOGIN"}
              </Button>
            </form>

            <div className={styles.formFooter}>
              <span className={styles.noAccountText}>NEW OPERATOR?</span>
              <Link to="/signup" className={styles.signupLink}>
                [ ENLIST_REGISTRATION ]
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
