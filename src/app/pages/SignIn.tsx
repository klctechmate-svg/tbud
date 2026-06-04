import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { TioWaving, TioThumbsUp } from "../components/TioMascot";
import { Eye, EyeOff, Loader2, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// ─── TERMS CONTENT ────────────────────────────────────────────────────────────
const TERMS_CONTENT = (
  <div className="space-y-4 text-[#94A3B8] text-sm" style={{ fontFamily: "Inter", lineHeight: "1.7" }}>
    <p className="text-[#00D1FF] font-semibold">Last updated: May 2026</p>
    <div><h3 className="text-white font-semibold mb-1">1. Acceptance of Terms</h3><p>By accessing and using T-Bud's services, you accept and agree to be bound by these Terms & Conditions.</p></div>
    <div><h3 className="text-white font-semibold mb-1">2. Services</h3><p>T-Bud provides commission-based digital services including graphic design, educational content, social media marketing, and online business support.</p></div>
    <div><h3 className="text-white font-semibold mb-1">3. User Responsibilities</h3><p>You agree to provide accurate information when registering. You are responsible for maintaining the confidentiality of your account credentials.</p></div>
    <div><h3 className="text-white font-semibold mb-1">4. Privacy Policy</h3><p>We collect only the information necessary to provide our services. Your data will never be sold to third parties.</p></div>
    <div><h3 className="text-white font-semibold mb-1">5. Intellectual Property</h3><p>All content and materials created by T-Bud remain the property of T-Bud unless explicitly transferred to you in writing.</p></div>
    <div><h3 className="text-white font-semibold mb-1">6. Limitation of Liability</h3><p>T-Bud provides services "as is" without any warranties.</p></div>
    <div><h3 className="text-white font-semibold mb-1">7. Contact</h3><p>For questions, contact us at klc.techmate@gmail.com.</p></div>
  </div>
);

// ─── TERMS MODAL ─────────────────────────────────────────────────────────────
function TermsModal({ onClose, onAgree }: { onClose: () => void; onAgree: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#0D1117] rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
        style={{ border: "1px solid rgba(0,209,255,0.3)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl" style={{ fontFamily: "Inter", fontWeight: 700 }}>Terms & Conditions</h2>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-white"><X size={20} /></button>
        </div>
        {TERMS_CONTENT}
        <button onClick={onAgree} className="w-full mt-6 bg-[#0EA5E9] text-white py-3 rounded-lg hover:bg-[#0EA5E9]/90 transition-colors" style={{ fontFamily: "Inter", fontWeight: 700 }}>
          I Agree & Close
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── AGREE CHECKBOX ───────────────────────────────────────────────────────────
function AgreeCheckbox({ agreed, onToggle, onOpenTerms }: { agreed: boolean; onToggle: () => void; onOpenTerms: () => void }) {
  return (
    <div className="flex items-start gap-3 pt-1">
      <button type="button" onClick={onToggle}
        className="mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all"
        style={{ border: `2px solid ${agreed ? "#00D1FF" : "rgba(0,209,255,0.3)"}`, background: agreed ? "#00D1FF" : "transparent" }}>
        {agreed && <span className="text-black text-xs font-bold">✓</span>}
      </button>
      <p className="text-[#94A3B8] text-sm" style={{ fontFamily: "Inter" }}>
        I agree to the{" "}
        <button type="button" onClick={onOpenTerms} className="text-[#00D1FF] hover:underline" style={{ fontWeight: 600 }}>Terms & Conditions</button>
        {" "}and{" "}
        <button type="button" onClick={onOpenTerms} className="text-[#00D1FF] hover:underline" style={{ fontWeight: 600 }}>Privacy Policy</button>
      </p>
    </div>
  );
}

// ─── FIELD COMPONENT (top-level, NOT inside any other component) ──────────────
interface FieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  showToggle?: boolean;
  show?: boolean;
  onToggle?: () => void;
}

function FormField({ label, value, onChange, type = "text", placeholder, error, showToggle, show, onToggle }: FieldProps) {
  return (
    <div>
      <label className="block text-white mb-1 text-sm" style={{ fontFamily: "Inter", fontWeight: 600 }}>{label}</label>
      <div className="relative">
        <input
          type={showToggle ? (show ? "text" : "password") : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-[#060C1A] border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D1FF] transition-colors ${showToggle ? "pr-12" : ""} ${error ? "border-red-400/60" : "border-[#00D1FF]/30"}`}
          style={{ fontFamily: "Inter" }}
        />
        {showToggle && (
          <button type="button" onClick={onToggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white transition-colors">
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-400 text-xs mt-1" style={{ fontFamily: "Inter" }}>{error}</p>}
    </div>
  );
}

// ─── SIGN IN FORM ─────────────────────────────────────────────────────────────
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qc2FmcXNxYWh3eWdqYnBldnZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NjMxNjgsImV4cCI6MjA2NDEzOTE2OH0.uxFNFFPO2gTABgCBpnpJNSQFKkbPCYi8gCrdWHq7iFc";
const API = "https://mjsafqsqahwygjbpevvi.supabase.co/functions/v1/make-server-df0cbbe5";
const HEADERS = { "Content-Type": "application/json", Authorization: `Bearer ${ANON_KEY}` };

// ─── FORGOT PASSWORD MODAL ────────────────────────────────────────────────────
function ForgotPasswordModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch(`${API}/auth/reset-password`, {
        method: "POST", headers: HEADERS,
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Could not send reset email."); }
      else { setSent(true); }
    } catch { setError("Could not connect to server."); }
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.85)" }} onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#0D1117] rounded-2xl p-8 max-w-md w-full"
        style={{ border: "1px solid rgba(0,209,255,0.3)" }} onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-bold" style={{ fontFamily: "Inter" }}>Reset Password</h2>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-white"><X size={20} /></button>
        </div>
        {sent ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-4">📧</div>
            <p className="text-white font-semibold mb-2" style={{ fontFamily: "Inter" }}>Reset email sent!</p>
            <p className="text-[#94A3B8] text-sm" style={{ fontFamily: "Inter" }}>
              Check your inbox at <span className="text-[#00D1FF]">{email}</span> for reset instructions.
            </p>
            <button onClick={onClose} className="mt-6 bg-[#0EA5E9] text-white px-8 py-3 rounded-lg font-bold w-full hover:bg-[#0EA5E9]/85 transition-all" style={{ fontFamily: "Inter" }}>
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <p className="text-[#94A3B8] text-sm mb-4" style={{ fontFamily: "Inter" }}>
              Enter your registered email and we'll send you a password reset link.
            </p>
            <FormField label="Email Address" value={email} onChange={setEmail} type="email" placeholder="yourname@email.com" />
            {error && <p className="text-red-400 text-sm" style={{ fontFamily: "Inter" }}>{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-[#0EA5E9] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#0EA5E9]/85 transition-all disabled:opacity-60"
              style={{ fontFamily: "Inter" }}>
              {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : "Send Reset Link"}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── SIGN IN FORM ─────────────────────────────────────────────────────────────
function SignInForm({ onSuccess }: { onSuccess: (name: string, email: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { setError("Please agree to the Terms & Conditions to continue."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch(`${API}/auth/signin`, { method: "POST", headers: HEADERS, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Invalid email or password."); setLoading(false); return; }
      onSuccess(data.name, data.email);
    } catch { setError("Could not connect to server. Please try again."); }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField label="Email" value={email} onChange={setEmail} type="email" placeholder="yourname@email.com" />
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-white text-sm font-semibold" style={{ fontFamily: "Inter" }}>Password</label>
            <button type="button" onClick={() => setShowForgot(true)}
              className="text-[#00D1FF] text-xs hover:underline" style={{ fontFamily: "Inter" }}>
              Forgot Password?
            </button>
          </div>
          <FormField label="" value={password} onChange={setPassword} placeholder="••••••••" showToggle show={showPassword} onToggle={() => setShowPassword(!showPassword)} />
        </div>
        <AgreeCheckbox agreed={agreed} onToggle={() => setAgreed(!agreed)} onOpenTerms={() => setShowTerms(true)} />
        {error && <div className="text-red-400 text-sm text-center py-2 px-4 bg-red-400/10 rounded-lg border border-red-400/30" style={{ fontFamily: "Inter" }}>{error}</div>}
        <button type="submit" disabled={loading}
          className="w-full bg-[#0EA5E9] text-white py-4 rounded-lg hover:bg-[#0EA5E9]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "16px" }}>
          {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : "Sign In"}
        </button>
      </form>
      <AnimatePresence>
        {showTerms && <TermsModal onClose={() => setShowTerms(false)} onAgree={() => { setAgreed(true); setShowTerms(false); }} />}
        {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}
      </AnimatePresence>
    </>
  );
}

// ─── CREATE ACCOUNT FORM ──────────────────────────────────────────────────────
function CreateAccountForm({ onSuccess }: { onSuccess: (name: string, email: string) => void }) {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePassword = (pw: string) => {
    if (pw.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(pw)) return "Must contain at least one uppercase letter.";
    if (!/[a-z]/.test(pw)) return "Must contain at least one lowercase letter.";
    if (!/[0-9]/.test(pw)) return "Must contain at least one number.";
    if (/[^A-Za-z0-9]/.test(pw)) return "Must not contain special characters.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!birthday) newErrors.birthday = "Birthday is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    const pwError = validatePassword(password);
    if (pwError) newErrors.password = pwError;
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    if (!agreed) newErrors.terms = "Please agree to the Terms & Conditions.";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST", headers: HEADERS,
        body: JSON.stringify({ lastName, firstName, middleName, birthday, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error?.includes("already registered")) setErrors({ email: data.error });
        else setErrors({ terms: data.error || "Registration failed." });
        setLoading(false); return;
      }
      onSuccess(data.name, data.email);
    } catch {
      setErrors({ terms: "Could not connect to server. Please try again." });
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Last Name" value={lastName} onChange={setLastName} placeholder="Dela Cruz" error={errors.lastName} />
          <FormField label="First Name" value={firstName} onChange={setFirstName} placeholder="Juan" error={errors.firstName} />
        </div>
        <FormField label="Middle Name (optional)" value={middleName} onChange={setMiddleName} placeholder="Santos" />
        <div>
          <label className="block text-white mb-1 text-sm" style={{ fontFamily: "Inter", fontWeight: 600 }}>Birthday</label>
          <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)}
            className={`w-full bg-[#060C1A] border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D1FF] transition-colors ${errors.birthday ? "border-red-400/60" : "border-[#00D1FF]/30"}`}
            style={{ fontFamily: "Inter", colorScheme: "dark" }} />
          {errors.birthday && <p className="text-red-400 text-xs mt-1">{errors.birthday}</p>}
        </div>
        <FormField label="Email Address" value={email} onChange={setEmail} type="email" placeholder="yourname@email.com" error={errors.email} />
        <FormField label="Password" value={password} onChange={setPassword} placeholder="Min 8 chars, uppercase, lowercase, numbers" error={errors.password} showToggle show={showPassword} onToggle={() => setShowPassword(!showPassword)} />
        <FormField label="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Re-enter your password" error={errors.confirmPassword} showToggle show={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} />

        <div className="bg-[#060C1A] rounded-lg p-3 text-xs text-[#94A3B8] space-y-1" style={{ fontFamily: "Inter" }}>
          <p className="text-white font-semibold mb-1">Password requirements:</p>
          {["At least 8 characters", "At least one uppercase letter (A-Z)", "At least one lowercase letter (a-z)", "At least one number (0-9)", "No special characters allowed"].map((r, i) => (
            <p key={i}>• {r}</p>
          ))}
        </div>

        <AgreeCheckbox agreed={agreed} onToggle={() => setAgreed(!agreed)} onOpenTerms={() => setShowTerms(true)} />
        {errors.terms && <p className="text-red-400 text-xs" style={{ fontFamily: "Inter" }}>{errors.terms}</p>}

        <button type="submit" disabled={loading}
          className="w-full bg-[#0EA5E9] text-white py-4 rounded-lg hover:bg-[#0EA5E9]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "16px" }}>
          {loading ? <><Loader2 size={18} className="animate-spin" /> Creating account...</> : "Create Account"}
        </button>
      </form>
      <AnimatePresence>
        {showTerms && <TermsModal onClose={() => setShowTerms(false)} onAgree={() => { setAgreed(true); setShowTerms(false); }} />}
      </AnimatePresence>
    </>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [tab, setTab] = useState<"signin" | "register">("signin");
  const [success, setSuccess] = useState(false);
  const [successName, setSuccessName] = useState("");

  const handleSuccess = (name: string, email: string) => {
    signIn({ name, email });
    setSuccessName(name.split(",")[1]?.trim().split(" ")[0] || name.split(" ")[0]);
    setSuccess(true);
    setTimeout(() => navigate("/"), 2500);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center py-20 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <TioWaving className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-[#00D1FF]" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: "28px" }}>T-Bud</h1>
          <p className="text-[#94A3B8] mt-2" style={{ fontFamily: "Inter" }}>
            {tab === "signin" ? "Welcome back! Sign in to continue." : "Join T-Bud — Commission-Based Payment!"}
          </p>
        </div>

        <div className="flex rounded-xl overflow-hidden mb-6" style={{ border: "1px solid rgba(0,209,255,0.3)" }}>
          {(["signin", "register"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className="flex-1 py-3 text-sm font-semibold transition-all"
              style={{ fontFamily: "Inter", background: tab === t ? "#0EA5E9" : "transparent", color: tab === t ? "white" : "#94A3B8" }}>
              {t === "signin" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <div className="bg-[#0D1117] rounded-2xl p-8" style={{ border: "1px solid rgba(0, 209, 255, 0.3)" }}>
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, x: tab === "signin" ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {tab === "signin"
                ? <SignInForm onSuccess={handleSuccess} />
                : <CreateAccountForm onSuccess={handleSuccess} />
              }
            </motion.div>
          </AnimatePresence>

          <div className="text-center mt-6">
            <p className="text-[#94A3B8] text-sm" style={{ fontFamily: "Inter" }}>
              {tab === "signin" ? (
                <>Don't have an account?{" "}<button onClick={() => setTab("register")} className="text-[#00D1FF] hover:underline" style={{ fontWeight: 600 }}>Create one</button></>
              ) : (
                <>Already have an account?{" "}<button onClick={() => setTab("signin")} className="text-[#00D1FF] hover:underline" style={{ fontWeight: 600 }}>Sign in</button></>
              )}
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-[#94A3B8] text-sm hover:text-white transition-colors" style={{ fontFamily: "Inter" }}>← Back to Home</Link>
        </div>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.85)" }}>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-[#0D1117] border-2 border-[#00D1FF] rounded-2xl p-8 text-center">
              <TioThumbsUp className="w-24 h-24 mx-auto mb-4" />
              <h3 className="text-white text-2xl mb-2" style={{ fontFamily: "Inter", fontWeight: 700 }}>Welcome, {successName}!</h3>
              <p className="text-[#94A3B8]" style={{ fontFamily: "Inter" }}>Tio says hi! Redirecting you home...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
