import { useState } from "react";
import styles from "./SignUpPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/KutItLogo.png";
import Button from "../../components/common/Button";
import Toast from "../../components/common/Toast";
import { useToast } from "../../hooks/useToast";
import { authService } from "../../services/authService";
import {
  UserPlus,
  Mail,
  User,
  KeyRound,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

/**
 * Single Responsibility: View coordinating operator registration form and system specs display.
 */
export default function SignUpPage() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const { toast, showToast, hideToast } = useToast(5000);
  const navigate = useNavigate();

  const isDisabled =
    !form.firstName.trim() ||
    !form.lastName.trim() ||
    !form.username.trim() ||
    !form.email.trim() ||
    !form.password ||
    loading;

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (isDisabled) return;
    setLoading(true);

    try {
      await authService.register(form);
      setSuccess(true);
      showToast("OPERATOR_ENLISTED: Redirecting to login...", "success", 2000);
      setTimeout(() => {
        navigate("/login");
      }, 1800);
    } catch (err) {
      showToast(err.message || "REGISTRATION_FAILED: Could not create operator profile.");
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
            <span>NEW_OPERATOR_DISCOVERY</span>
            <span className={styles.dotSeparator}>::</span>
            <span className={styles.portStatus}>SLOT: 01</span>
          </div>
        </div>

        <div className={styles.splitLayout}>
          {/* Left Registration Form */}
          <div className={styles.formPanel}>
            <div className={styles.formHeader}>
              <h1 className={styles.formTitle}>ENLIST_OPERATOR</h1>
              <p className={styles.formDesc}>
                Create an identity profile to unlock history tracking and hit telemetry.
              </p>
            </div>

            {success ? (
              <div className={styles.successBox}>
                <CheckCircle2 size={36} className={styles.successIcon} />
                <h3 className={styles.successTitle}>OPERATOR_ENLISTED!</h3>
                <p className={styles.successDesc}>
                  Routing credentials to security vault... Transferring to login terminal.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSignUp}>
                <div className={styles.nameRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="firstName" className={styles.fieldLabel}>
                      <span>FIRST_NAME</span>
                    </label>
                    <input
                      className={styles.input}
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Ada"
                      required
                      value={form.firstName}
                      onChange={(e) =>
                        setForm({ ...form, [e.target.name]: e.target.value })
                      }
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="lastName" className={styles.fieldLabel}>
                      <span>LAST_NAME</span>
                    </label>
                    <input
                      className={styles.input}
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Lovelace"
                      required
                      value={form.lastName}
                      onChange={(e) =>
                        setForm({ ...form, [e.target.name]: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="email" className={styles.fieldLabel}>
                    <Mail size={13} />
                    <span>OPERATOR_EMAIL</span>
                  </label>
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="operator@kutit.terminal"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, [e.target.name]: e.target.value })
                    }
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="username" className={styles.fieldLabel}>
                    <User size={13} />
                    <span>CHOSEN_CALLSIGN (USERNAME)</span>
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="pixel_pilot"
                    required
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, [e.target.name]: e.target.value })
                    }
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="password" className={styles.fieldLabel}>
                    <KeyRound size={13} />
                    <span>SECURITY_PASSPHRASE</span>
                  </label>
                  <input
                    className={styles.input}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••••••"
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
                  icon={<UserPlus size={16} />}
                >
                  {loading ? "REGISTERING_CHIP..." : "INITIALIZE_OPERATOR"}
                </Button>
              </form>
            )}

            <div className={styles.formFooter}>
              <span className={styles.hasAccountText}>ALREADY ENLISTED?</span>
              <Link to="/login" className={styles.loginLink}>
                [ LOG_IN_HERE ]
              </Link>
            </div>
          </div>

          {/* Right Monitor Panel */}
          <div className={styles.consolePanel}>
            <div className={styles.consoleHeader}>
              <div className={styles.consoleDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <span className={styles.consoleTitle}>OPERATOR_MATRIX // SPEC</span>
            </div>

            <div className={styles.consoleBody}>
              <div className={styles.brandBox}>
                <div className={styles.logoFrame}>
                  <img src={logo} alt="KutIt Logo" className={styles.logo} />
                </div>
                <div>
                  <h2 className={styles.brandName}>KUT_IT</h2>
                  <p className={styles.brandSub}>SYSTEM REGISTRATION VAULT</p>
                </div>
              </div>

              <div className={styles.benefitsBox}>
                <span className={styles.benefitsHeader}>
                  <Sparkles size={13} className={styles.sparkleIcon} />
                  UNLOCKED CAPABILITIES
                </span>
                <ul className={styles.benefitList}>
                  <li>&gt; PERSISTENT LINK ARCHIVE (LIFETIME)</li>
                  <li>&gt; ATOMIC CLICK TELEMETRY ENGINE</li>
                  <li>&gt; ONE-CLICK CLIPBOARD PIPELINE</li>
                  <li>&gt; GRANULAR ROUTE PURGE TOOLS</li>
                </ul>
              </div>

              <div className={styles.asciiTerminal}>
{` +=============================+
 | STAGE: 01   CREDITS: 03     |
 | HI-SCORE: 999,990           |
 | READY: PLAYER ONE           |
 +=============================+`}
              </div>

              <div className={styles.consoleFooter}>
                <span>PROTOCOL: RFC_7519</span>
                <span className={styles.readyText}>STATUS: READY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
