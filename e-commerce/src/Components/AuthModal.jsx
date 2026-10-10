import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { IoClose } from "react-icons/io5";
import { FaUserCircle, FaLock, FaUserPlus, FaSignInAlt } from "react-icons/fa";

const AuthModal = () => {
  const dispatch = useDispatch();
  const { isAuthModalOpen, authMode, error, successMessage } = useSelector(
    (store) => store.auth
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    dispatch(authActions.closeAuthModal());
    dispatch(authActions.clearAuthError());
    setUsername("");
    setPassword("");
    setName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === "login") {
      dispatch(authActions.login({ username, password }));
    } else {
      dispatch(authActions.signup({ username, password, name }));
    }
  };

  const handleSwitchMode = (mode) => {
    dispatch(authActions.setAuthMode(mode));
  };

  const fillDemoCredentials = () => {
    setUsername("demo");
    setPassword("password123");
  };

  return (
    <div className="auth-modal-overlay" onClick={handleClose}>
      <div
        className="auth-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="auth-modal-close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <IoClose />
        </button>

        <div className="auth-modal-header">
          <div className="auth-logo-badge">
            <div className="buyit-brand buyit-brand-modal">
              <span className="buyit-brand-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </span>
              <span className="buyit-brand-text">
                <span className="buyit-text-buy">Buy</span>
                <span className="buyit-text-it">it</span>
              </span>
            </div>
          </div>
          <h2 className="auth-title">
            {authMode === "login" ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="auth-subtitle">
            {authMode === "login"
              ? "Login to access your orders, bag, and wishlist"
              : "Sign up to start shopping on Buyit"}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${authMode === "login" ? "active" : ""}`}
            onClick={() => handleSwitchMode("login")}
          >
            <FaSignInAlt style={{ marginRight: 6 }} /> Login
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${authMode === "signup" ? "active" : ""}`}
            onClick={() => handleSwitchMode("signup")}
          >
            <FaUserPlus style={{ marginRight: 6 }} /> New User (Sign Up)
          </button>
        </div>

        {/* Alerts */}
        {error && <div className="auth-alert auth-alert-error">{error}</div>}
        {successMessage && (
          <div className="auth-alert auth-alert-success">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {authMode === "signup" && (
            <div className="auth-form-group">
              <label className="auth-label">Full Name</label>
              <div className="auth-input-wrapper">
                <FaUserCircle className="auth-input-icon" />
                <input
                  type="text"
                  className="auth-input"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="auth-form-group">
            <label className="auth-label">Username</label>
            <div className="auth-input-wrapper">
              <FaUserCircle className="auth-input-icon" />
              <input
                type="text"
                className="auth-input"
                placeholder="Enter username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Password</label>
            <div className="auth-input-wrapper">
              <FaLock className="auth-input-icon" />
              <input
                type="password"
                className="auth-input"
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="auth-submit-btn">
            {authMode === "login" ? "LOGIN" : "CREATE ACCOUNT"}
          </button>
        </form>

        <div className="auth-footer-help">
          {authMode === "login" ? (
            <>
              <span>New to Buyit? </span>
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => handleSwitchMode("signup")}
              >
                Create new user name
              </button>
              <div className="demo-credentials-box">
                <span>Quick demo: </span>
                <button
                  type="button"
                  className="auth-demo-pill"
                  onClick={fillDemoCredentials}
                >
                  Auto-fill demo user
                </button>
              </div>
            </>
          ) : (
            <>
              <span>Already have an account? </span>
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => handleSwitchMode("login")}
              >
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
