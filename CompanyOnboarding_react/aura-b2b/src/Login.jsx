import { useState } from "react";
import "./resources/custom.css";
import { saveAuth } from "./auth";

/* ── Icons ──────────────────────────────────────────────── */
const IconUser = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconLock = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IconEye = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconEyeOff = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const IconAlert = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "1px" }}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="white">
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7l-9-5z"/>
  </svg>
);

/* ── Component ───────────────────────────────────────────── */
export default function Login({ onLoginSuccess }) {
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe]     = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [fieldErrors, setFieldErrors]   = useState({});

  const validate = () => {
    const errs = {};
    if (!email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email address";
    if (!password) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = async () => {
    setError("");
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5299/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Backend returns: { token: "...", expire: "MM/DD/YYYY HH:mm:ss" }
        const { token, expire } = data;

        // Persist token to storage (sessionStorage, or localStorage if rememberMe)
        saveAuth({ token, expire, email: email.trim(), remember: rememberMe });

        // Notify App.jsx so it switches to the dashboard
        onLoginSuccess({ token, expire, email: email.trim() });
      } else {
        setError(
          data?.message || data?.error ||
          `Login failed (${response.status}). Please check your credentials.`
        );
      }
    } catch (err) {
      if (err.name === "TypeError") {
        setError("Cannot reach the server. Please ensure the backend is running on localhost:5299.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="login-page">
      <div className="card-wrapper">
        <div className="login-card">

          {/* Brand */}
          <div className="brand-icon">
            <IconShield />
          </div>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to your account to continue</p>

          {/* Error alert */}
          {error && (
            <div className="alert-custom alert-error">
              <IconAlert />
              <span>{error}</span>
            </div>
          )}

          {/* Email field */}
          <div className="form-field-mb">
            <label className="form-label">Email Address</label>
            <div className="input-group-custom">
              <span className="input-icon"><IconUser /></span>
              <input
                type="email"
                className={`form-control-custom${fieldErrors.email ? " is-error" : ""}`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setFieldErrors(f => ({ ...f, email: "" })); }}
                onKeyDown={handleKeyDown}
                autoComplete="email"
              />
            </div>
            {fieldErrors.email && (
              <div className="field-error"><IconAlert />{fieldErrors.email}</div>
            )}
          </div>

          {/* Password field */}
          <div className="form-field-mb">
            <label className="form-label">Password</label>
            <div className="input-group-custom">
              <span className="input-icon"><IconLock /></span>
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control-custom${fieldErrors.password ? " is-error" : ""}`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setFieldErrors(f => ({ ...f, password: "" })); }}
                onKeyDown={handleKeyDown}
                autoComplete="current-password"
                style={{ paddingRight: "2.8rem" }}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
            {fieldErrors.password && (
              <div className="field-error"><IconAlert />{fieldErrors.password}</div>
            )}
          </div>

          {/* Options row */}
          <div className="options-row">
            <label className="remember-label">
              <input
                type="checkbox"
                className="remember-check"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#" className="forgot-link" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
          </div>

          {/* Submit button */}
          <button className="btn-login" onClick={handleSubmit} disabled={loading}>
            {loading
              ? <><div className="spinner" /> Signing in…</>
              : "Sign In"
            }
          </button>

          {/* Footer */}
          <p className="card-footer-text">
            Don't have an account?{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>Create one</a>
          </p>

        </div>
      </div>
    </div>
  );
}
