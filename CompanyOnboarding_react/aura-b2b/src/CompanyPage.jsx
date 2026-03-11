import { useState, useEffect, useCallback } from "react";
import "./resources/custom.css";
import { authFetch, AuthError } from "./auth";

/* ════════════════════════════════════════
   ICONS
════════════════════════════════════════ */
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="white">
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7l-9-5z"/>
  </svg>
);
const IconLogout = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconBuilding = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M9 9h6M9 13h6M9 17h6"/>
  </svg>
);
const IconPlus = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconAlertCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const IconAlertSmall = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const IconRefresh = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);
const IconPhone = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.62 19 19.45 19.45 0 0 1 5 12.38 19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91A16 16 0 0 0 14.09 15.91l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconMapPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconClock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconX = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconCheckCircle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IconUser = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconMail = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconKey = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
  </svg>
);
const IconCopy = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

/* ════════════════════════════════════════
   HELPERS
════════════════════════════════════════ */
const getInitials = (name = "") =>
  name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "?";

const EMPTY_FORM = {
  companyName:    "",
  phone:          "",
  address:        "",
  ownerEmail:     "",
  ownerFirstName: "",
  ownerLastName:  "",
};

/* ════════════════════════════════════════
   SKELETON ROWS
════════════════════════════════════════ */
const SkeletonRows = () =>
  [1, 2, 3, 4].map(i => (
    <tr key={i} className="cp-skeleton-row">
      <td>
        <div className="skeleton-name-cell">
          <div className="skeleton-avatar" />
          <div className="skeleton-text-lines">
            <div className="skeleton-bar" style={{ width: "55%", marginBottom: "6px" }} />
            <div className="skeleton-bar" style={{ width: "80%", height: "10px" }} />
          </div>
        </div>
      </td>
      <td><div className="skeleton-bar" style={{ width: "70%" }} /></td>
      <td><div className="skeleton-bar" style={{ width: "60%" }} /></td>
      <td><div className="skeleton-bar" style={{ width: "40%" }} /></td>
    </tr>
  ));

/* ════════════════════════════════════════
   CREDENTIAL RESULT CARD
   Shown after successful onboard
════════════════════════════════════════ */
function CredentialCard({ companyName, credential, onClose }) {
  const [copiedField, setCopiedField] = useState("");

  const copy = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(""), 2000);
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: 460 }}>

        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-header-icon" style={{ background: "linear-gradient(135deg,#34d399,#059669)", boxShadow: "0 4px 10px rgba(5,150,105,0.3)" }}>
              <IconCheckCircle />
            </div>
            <div>
              <div className="modal-title" style={{ color: "#065f46" }}>Company Created!</div>
              <div className="modal-subtitle">"{companyName}" has been onboarded successfully</div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">
          <p style={{ fontSize: "0.855rem", color: "var(--slate-500)", marginBottom: "0.25rem" }}>
            The owner account credentials have been generated. Please save them — the password won't be shown again.
          </p>

          {/* Username row */}
          <div className="cred-row">
            <div className="cred-label">
              <IconMail />
              Username
            </div>
            <div className="cred-value-row">
              <span className="cred-value">{credential.username}</span>
              <button
                className={`cred-copy-btn${copiedField === "username" ? " copied" : ""}`}
                onClick={() => copy(credential.username, "username")}
                title="Copy username"
              >
                <IconCopy />
                {copiedField === "username" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Password row */}
          <div className="cred-row">
            <div className="cred-label">
              <IconKey />
              Password
            </div>
            <div className="cred-value-row">
              <span className="cred-value cred-password">{credential.password}</span>
              <button
                className={`cred-copy-btn${copiedField === "password" ? " copied" : ""}`}
                onClick={() => copy(credential.password, "password")}
                title="Copy password"
              >
                <IconCopy />
                {copiedField === "password" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="cred-warning">
            <IconAlertSmall />
            <span>Make sure to share these credentials with the owner securely before closing this dialog.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="modal-btn-submit" onClick={onClose} style={{ background: "linear-gradient(135deg,#34d399,#059669)", boxShadow: "0 3px 10px rgba(5,150,105,0.3)", minWidth: 100 }}>
            Done
          </button>
        </div>

      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   ADD COMPANY MODAL
════════════════════════════════════════ */
function AddCompanyModal({ onClose, onSuccess }) {
  const [form, setForm]               = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting]   = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [credential, setCredential]   = useState(null); // holds { username, password }

  // Close on Escape key (only when credential card is not shown)
  useEffect(() => {
    if (credential) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, credential]);

  const setField = (key, value) => {
    setForm(f => ({ ...f, [key]: value }));
    setFieldErrors(e => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.companyName.trim())    errs.companyName    = "Company name is required";
    if (!form.phone.trim())          errs.phone          = "Phone number is required";
    if (!form.address.trim())        errs.address        = "Address is required";
    if (!form.ownerEmail.trim())     errs.ownerEmail     = "Owner email is required";
    else if (!/\S+@\S+\.\S+/.test(form.ownerEmail)) errs.ownerEmail = "Enter a valid email address";
    if (!form.ownerFirstName.trim()) errs.ownerFirstName = "First name is required";
    if (!form.ownerLastName.trim())  errs.ownerLastName  = "Last name is required";
    return errs;
  };

  const handleSubmit = async () => {
    setSubmitError("");
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const response = await authFetch("http://localhost:5299/api/company/onboard", {
        method: "POST",
        body: JSON.stringify({
          companyName:    form.companyName.trim(),
          phone:          form.phone.trim(),
          address:        form.address.trim(),
          ownerEmail:     form.ownerEmail.trim(),
          ownerFirstName: form.ownerFirstName.trim(),
          ownerLastName:  form.ownerLastName.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        // Refresh the company list in the background
        onSuccess();
        // Show the credential result card
        setCredential(data.credential);
      } else {
        setSubmitError(
          data?.message || data?.error ||
          `Request failed (${response.status}).`
        );
      }
    } catch (err) {
      if (err instanceof AuthError) {
        setSubmitError(err.message);
      } else if (err.name === "TypeError") {
        setSubmitError("Cannot reach the server. Please ensure the backend is running on localhost:5299.");
      } else {
        setSubmitError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // When credential card is shown, render that instead
  if (credential) {
    return (
      <CredentialCard
        companyName={form.companyName || "New Company"}
        credential={credential}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-card" style={{ maxWidth: 540 }}>

        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-header-icon">
              <IconBuilding />
            </div>
            <div>
              <div className="modal-title">Onboard New Company</div>
              <div className="modal-subtitle">Register a company and create an owner account</div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <IconX />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">

          {/* Submit error */}
          {submitError && (
            <div className="modal-alert">
              <IconAlertSmall />
              <span>{submitError}</span>
            </div>
          )}

          {/* ── Section: Company Info ── */}
          <div className="modal-section-label">Company Information</div>

          {/* Company Name */}
          <div className="modal-field">
            <label>Company Name <span style={{ color: "#ef4444" }}>*</span></label>
            <div className="modal-input-wrap">
              <span className="modal-input-icon"><IconBuilding /></span>
              <input
                type="text"
                className={`modal-input${fieldErrors.companyName ? " is-error" : ""}`}
                placeholder="e.g. Aura Main Branch"
                value={form.companyName}
                onChange={(e) => setField("companyName", e.target.value)}
                disabled={submitting}
                autoFocus
              />
            </div>
            {fieldErrors.companyName && (
              <div className="modal-field-error"><IconAlertSmall />{fieldErrors.companyName}</div>
            )}
          </div>

          {/* Phone + Address side by side */}
          <div className="modal-row-2">
            <div className="modal-field">
              <label>Phone <span style={{ color: "#ef4444" }}>*</span></label>
              <div className="modal-input-wrap">
                <span className="modal-input-icon"><IconPhone /></span>
                <input
                  type="text"
                  className={`modal-input${fieldErrors.phone ? " is-error" : ""}`}
                  placeholder="e.g. 0919199218"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  disabled={submitting}
                />
              </div>
              {fieldErrors.phone && (
                <div className="modal-field-error"><IconAlertSmall />{fieldErrors.phone}</div>
              )}
            </div>

            <div className="modal-field">
              <label>Address <span style={{ color: "#ef4444" }}>*</span></label>
              <div className="modal-input-wrap">
                <span className="modal-input-icon"><IconMapPin /></span>
                <input
                  type="text"
                  className={`modal-input${fieldErrors.address ? " is-error" : ""}`}
                  placeholder="e.g. Bangkok, Thailand"
                  value={form.address}
                  onChange={(e) => setField("address", e.target.value)}
                  disabled={submitting}
                />
              </div>
              {fieldErrors.address && (
                <div className="modal-field-error"><IconAlertSmall />{fieldErrors.address}</div>
              )}
            </div>
          </div>

          {/* ── Section: Owner Info ── */}
          <div className="modal-section-label" style={{ marginTop: "0.4rem" }}>Owner Account</div>

          {/* Owner Email */}
          <div className="modal-field">
            <label>Owner Email <span style={{ color: "#ef4444" }}>*</span></label>
            <div className="modal-input-wrap">
              <span className="modal-input-icon"><IconMail /></span>
              <input
                type="email"
                className={`modal-input${fieldErrors.ownerEmail ? " is-error" : ""}`}
                placeholder="e.g. doe@arw.co"
                value={form.ownerEmail}
                onChange={(e) => setField("ownerEmail", e.target.value)}
                disabled={submitting}
              />
            </div>
            {fieldErrors.ownerEmail && (
              <div className="modal-field-error"><IconAlertSmall />{fieldErrors.ownerEmail}</div>
            )}
          </div>

          {/* First + Last name side by side */}
          <div className="modal-row-2">
            <div className="modal-field">
              <label>First Name <span style={{ color: "#ef4444" }}>*</span></label>
              <div className="modal-input-wrap">
                <span className="modal-input-icon"><IconUser /></span>
                <input
                  type="text"
                  className={`modal-input${fieldErrors.ownerFirstName ? " is-error" : ""}`}
                  placeholder="e.g. Jonathan"
                  value={form.ownerFirstName}
                  onChange={(e) => setField("ownerFirstName", e.target.value)}
                  disabled={submitting}
                />
              </div>
              {fieldErrors.ownerFirstName && (
                <div className="modal-field-error"><IconAlertSmall />{fieldErrors.ownerFirstName}</div>
              )}
            </div>

            <div className="modal-field">
              <label>Last Name <span style={{ color: "#ef4444" }}>*</span></label>
              <div className="modal-input-wrap">
                <span className="modal-input-icon"><IconUser /></span>
                <input
                  type="text"
                  className={`modal-input${fieldErrors.ownerLastName ? " is-error" : ""}`}
                  placeholder="e.g. Doe"
                  value={form.ownerLastName}
                  onChange={(e) => setField("ownerLastName", e.target.value)}
                  disabled={submitting}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                />
              </div>
              {fieldErrors.ownerLastName && (
                <div className="modal-field-error"><IconAlertSmall />{fieldErrors.ownerLastName}</div>
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="modal-btn-cancel" onClick={onClose} disabled={submitting}>
            Cancel
          </button>
          <button className="modal-btn-submit" onClick={handleSubmit} disabled={submitting}>
            {submitting
              ? <><div className="modal-spinner" /> Onboarding…</>
              : <><IconPlus /> Onboard Company</>
            }
          </button>
        </div>

      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
export default function CompanyPage({ auth, onLogout }) {
  const [companies, setCompanies]           = useState([]);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState("");
  const [sessionExpired, setSessionExpired] = useState(false);
  const [search, setSearch]                 = useState("");
  const [showModal, setShowModal]           = useState(false);

  const userEmail   = auth?.email || "User";
  const initials    = userEmail.slice(0, 2).toUpperCase();
  const tokenExpire = auth?.expire || null;

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError("");
    setSessionExpired(false);
    try {
      const response = await authFetch("http://localhost:5299/api/company");

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        setError(errData?.message || `Failed to load companies (${response.status}).`);
        return;
      }

      const data = await response.json();
      setCompanies(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err instanceof AuthError) {
        setSessionExpired(true);
        setError(err.message);
      } else if (err.name === "TypeError") {
        setError("Cannot reach the server. Please ensure the backend is running on localhost:5299.");
      } else {
        setError("An unexpected error occurred while loading companies.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCompanies(); }, [fetchCompanies]);

  const filtered = companies.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name?.toLowerCase().includes(q) ||
      c.phone?.toLowerCase().includes(q) ||
      c.address?.toLowerCase().includes(q) ||
      c.id?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="cp-root">

      {/* ── Modal ── */}
      {showModal && (
        <AddCompanyModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchCompanies}
        />
      )}

      {/* ── Navbar ── */}
      <nav className="cp-nav">
        <div className="cp-nav-brand">
          <div className="cp-nav-logo"><IconShield /></div>
          <span className="cp-nav-title">Aura Dashboard</span>
        </div>
        <div className="cp-nav-right">
          {tokenExpire && (
            <div className="cp-expire-pill">
              <IconClock />
              <span>Expires {tokenExpire}</span>
            </div>
          )}
          <div className="cp-user-pill">
            <div className="cp-avatar">{initials}</div>
            <span className="cp-user-name">{userEmail}</span>
          </div>
          <button className="cp-btn-logout" onClick={onLogout}>
            <IconLogout /> Sign Out
          </button>
        </div>
      </nav>

      {/* ── Main content ── */}
      <main className="cp-main">

        {/* Page header */}
        <div className="cp-header">
          <div className="cp-header-left">
            <h1>Companies</h1>
            <p>Manage and view all registered companies</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {!loading && !error && (
              <div className="cp-badge">
                {companies.length} {companies.length === 1 ? "Company" : "Companies"}
              </div>
            )}
            <button className="cp-btn-add" onClick={() => setShowModal(true)}>
              <IconPlus /> Add Company
            </button>
          </div>
        </div>

        {/* Stats row */}
        {!loading && !error && companies.length > 0 && (
          <div className="cp-stats">
            <div className="cp-stat-card">
              <div className="cp-stat-icon"><IconBuilding /></div>
              <div>
                <div className="cp-stat-label">Total Companies</div>
                <div className="cp-stat-value">{companies.length}</div>
              </div>
            </div>
          </div>
        )}

        {/* Search bar */}
        {!loading && !error && companies.length > 0 && (
          <div className="cp-search-wrap">
            <span className="cp-search-icon"><IconSearch /></span>
            <input
              type="text"
              className="cp-search"
              placeholder="Search by name, phone, address…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        {/* Table card */}
        <div className="cp-table-card">
          {loading ? (
            <table className="cp-table">
              <thead>
                <tr><th>Company</th><th>Phone</th><th>Address</th><th>ID</th></tr>
              </thead>
              <tbody><SkeletonRows /></tbody>
            </table>

          ) : error ? (
            <div className="cp-state">
              <div className="cp-state-icon error"><IconAlertCircle /></div>
              <h3>{sessionExpired ? "Session Expired" : "Failed to load"}</h3>
              <p>{error}</p>
              {sessionExpired ? (
                <button className="cp-btn-retry" onClick={onLogout}>Back to Login</button>
              ) : (
                <button className="cp-btn-retry" onClick={fetchCompanies}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <IconRefresh /> Try Again
                  </span>
                </button>
              )}
            </div>

          ) : filtered.length === 0 ? (
            <div className="cp-state">
              <div className="cp-state-icon empty"><IconBuilding /></div>
              <h3>{search ? "No results found" : "No companies yet"}</h3>
              <p>
                {search
                  ? `No companies match "${search}". Try a different keyword.`
                  : "Get started by onboarding your first company."}
              </p>
              {search ? (
                <button className="cp-btn-retry" onClick={() => setSearch("")}>Clear search</button>
              ) : (
                <button className="cp-btn-retry" onClick={() => setShowModal(true)}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <IconPlus /> Add Company
                  </span>
                </button>
              )}
            </div>

          ) : (
            <table className="cp-table">
              <thead>
                <tr><th>Company</th><th>Phone</th><th>Address</th></tr>
              </thead>
              <tbody>
                {filtered.map((company, i) => (
                  <tr key={company.id} style={{ animationDelay: `${i * 0.05}s` }}>
                    <td>
                      <div className="cp-company-cell">
                        <div className="cp-company-icon">{getInitials(company.name)}</div>
                        <span className="cp-company-name">{company.name || "—"}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--slate-600)" }}>
                        <IconPhone />{company.phone || "—"}
                      </span>
                    </td>
                    <td>
                      <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--slate-600)" }}>
                        <IconMapPin />{company.address || "—"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </main>
    </div>
  );
}