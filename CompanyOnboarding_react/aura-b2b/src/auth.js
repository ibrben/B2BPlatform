/**
 *
 * Handles storing, retrieving, and clearing the JWT token
 * in sessionStorage, and provides a ready-made fetch wrapper
 * that automatically attaches the Bearer token to every request.
 *
 * Storage strategy:
 *   - sessionStorage  â†’ token is cleared when the browser tab closes
 *   - If the user ticked "Remember me", we mirror to localStorage too,
 *     so the session survives page refreshes across browser restarts.
 */

const TOKEN_KEY  = "aura_token";
const EXPIRE_KEY = "aura_token_expire";
const EMAIL_KEY  = "aura_user_email";


export function saveAuth({ token, expire, email, remember = false }) {
  const storage = remember ? localStorage : sessionStorage;

  // Always write to sessionStorage (current-tab lifetime)
  sessionStorage.setItem(TOKEN_KEY,  token);
  sessionStorage.setItem(EXPIRE_KEY, expire || "");
  sessionStorage.setItem(EMAIL_KEY,  email  || "");

  // Additionally persist to localStorage when "Remember me" is on
  if (remember) {
    localStorage.setItem(TOKEN_KEY,  token);
    localStorage.setItem(EXPIRE_KEY, expire || "");
    localStorage.setItem(EMAIL_KEY,  email  || "");
  }
}


export function getAuth() {
  const token  = sessionStorage.getItem(TOKEN_KEY)  || localStorage.getItem(TOKEN_KEY);
  const expire = sessionStorage.getItem(EXPIRE_KEY) || localStorage.getItem(EXPIRE_KEY);
  const email  = sessionStorage.getItem(EMAIL_KEY)  || localStorage.getItem(EMAIL_KEY);

  if (!token) return null;

  return { token, expire, email };
}


export function isTokenValid() {
  const auth = getAuth();
  if (!auth?.token) return false;
  if (!auth.expire)  return true; 

  // expire string from backend: "MM/DD/YYYY HH:mm:ss"
  const expireDate = new Date(auth.expire);
  return !isNaN(expireDate.getTime()) && expireDate > new Date();
}

export function clearAuth() {
  [sessionStorage, localStorage].forEach(store => {
    store.removeItem(TOKEN_KEY);
    store.removeItem(EXPIRE_KEY);
    store.removeItem(EMAIL_KEY);
  });
}

/**
 * Drop-in replacement for fetch() that automatically injects
 * the Authorization: Bearer <token> header.
 *
 * Usage:
 *   const res = await authFetch("http://localhost:5299/api/company");
 *   const res = await authFetch("/api/something", { method: "POST", body: JSON.stringify(data) });
 *
 * Throws an AuthError when the token is missing or the server
 * responds with 401, so callers can redirect to login.
 */
export async function authFetch(url, options = {}) {
  const auth = getAuth();

  if (!auth?.token) {
    throw new AuthError("No authentication token found. Please log in.");
  }

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${auth.token}`,
    ...(options.headers || {}),   // allow callers to override/extend headers
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    clearAuth();
    throw new AuthError("Session expired. Please log in again.");
  }

  return response;
}

export class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthError";
  }
}