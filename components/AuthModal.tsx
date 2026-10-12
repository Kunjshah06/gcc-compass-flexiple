"use client";

import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import { X, Lock, Mail, User as UserIcon, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "signin" | "signup";
}

export default function AuthModal({ isOpen, onClose, defaultMode = "signin" }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { signInWithEmail, signUpWithEmail } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await signInWithEmail(email, password);
        if (error) {
          setErrorMsg(error.message || "Failed to sign in. Please verify your credentials.");
        } else {
          onClose();
        }
      } else {
        const { error, data } = await signUpWithEmail(email, password, fullName);
        if (error) {
          setErrorMsg(error.message || "Failed to create account.");
        } else if (data?.user?.identities?.length === 0) {
          setErrorMsg("An account with this email already exists.");
        } else {
          setSuccessMsg("Account created successfully! You are now logged in.");
          setTimeout(() => {
            onClose();
          }, 1200);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl p-6 sm:p-7 shadow-2xl relative transition-all"
        style={{
          backgroundColor: "var(--surface-1)",
          border: "1px solid var(--border-muted)",
          color: "var(--text-primary)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          suppressHydrationWarning
          className="absolute right-4 top-4 rounded-md p-1.5 transition cursor-pointer"
          style={{ color: "var(--text-tertiary)" }}
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div>
          <div
            className="inline-flex items-center gap-1.5 rounded px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-2"
            style={{
              backgroundColor: "rgba(245,158,11,0.1)",
              color: "var(--accent)",
              border: "1px solid rgba(245,158,11,0.2)",
            }}
          >
            Supabase Enterprise Auth
          </div>
          <h2 className="text-xl font-black tracking-tight" style={{ letterSpacing: "-0.02em" }}>
            {mode === "signin" ? "Welcome back to GCC Compass" : "Create your executive account"}
          </h2>
          <p className="text-[12px] mt-1" style={{ color: "var(--text-secondary)" }}>
            {mode === "signin"
              ? "Access your saved location models and personalized AI advisory logs."
              : "Evaluate India setup viability with full platform telemetry."}
          </p>
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div
            className="mt-4 rounded-md p-3 flex items-start gap-2.5 text-[11.5px]"
            style={{
              backgroundColor: "rgba(248,113,113,0.1)",
              border: "1px solid rgba(248,113,113,0.25)",
              color: "var(--red)",
            }}
          >
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div
            className="mt-4 rounded-md p-3 flex items-start gap-2.5 text-[11.5px]"
            style={{
              backgroundColor: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.25)",
              color: "var(--green)",
            }}
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          {mode === "signup" && (
            <div>
              <label
                className="block text-[10.5px] font-bold uppercase tracking-wider mb-1.5"
                style={{ color: "var(--text-tertiary)" }}
              >
                Full Name
              </label>
              <div className="relative">
                <UserIcon
                  className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2"
                  style={{ color: "var(--text-tertiary)" }}
                />
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  suppressHydrationWarning
                  className="w-full rounded-md py-2 pl-9 pr-3 text-[12.5px] outline-none transition"
                  style={{
                    backgroundColor: "var(--surface-2)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label
              className="block text-[10.5px] font-bold uppercase tracking-wider mb-1.5"
              style={{ color: "var(--text-tertiary)" }}
            >
              Business Email
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2"
                style={{ color: "var(--text-tertiary)" }}
              />
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                suppressHydrationWarning
                className="w-full rounded-md py-2 pl-9 pr-3 text-[12.5px] outline-none transition"
                style={{
                  backgroundColor: "var(--surface-2)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
          </div>

          <div>
            <label
              className="block text-[10.5px] font-bold uppercase tracking-wider mb-1.5"
              style={{ color: "var(--text-tertiary)" }}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2"
                style={{ color: "var(--text-tertiary)" }}
              />
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                suppressHydrationWarning
                className="w-full rounded-md py-2 pl-9 pr-3 text-[12.5px] outline-none transition"
                style={{
                  backgroundColor: "var(--surface-2)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            suppressHydrationWarning
            className="w-full flex items-center justify-center gap-2 rounded-md py-2.5 text-[12.5px] font-bold transition cursor-pointer disabled:opacity-50 mt-4"
            style={{
              backgroundColor: "var(--accent)",
              color: "#09090b",
            }}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : mode === "signin" ? (
              "Sign In to Platform"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Mode Switcher */}
        <div
          className="mt-5 pt-4 text-center text-[11.5px]"
          style={{ borderTop: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
        >
          {mode === "signin" ? (
            <span>
              Don't have an executive account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                suppressHydrationWarning
                className="font-bold underline cursor-pointer transition ml-1"
                style={{ color: "var(--accent)" }}
              >
                Sign Up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                suppressHydrationWarning
                className="font-bold underline cursor-pointer transition ml-1"
                style={{ color: "var(--accent)" }}
              >
                Sign In
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
