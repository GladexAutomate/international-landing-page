// @ts-nocheck
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Loader, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import AdminCache from "./AdminCache";
import AdminBriefings from "./AdminBriefings";
import AdminReviews from "./AdminReviews";
import AdminVouchers from "./AdminVouchers";
import AdminUsers from "./AdminUsers";

const ORANGE = "#FF9913";
const SESSION_KEY  = "gdx_admin_auth";
const SESSION_ROLE = "gdx_admin_role";

const ACCOUNTS_URL = import.meta.env.VITE_ACCOUNTS_URL;
const ACCOUNTS_KEY = import.meta.env.VITE_ACCOUNTS_SVC_KEY;

function toTitleCase(str) {
  if (!str) return "";
  return str.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
}

function resolveRole(account) {
  const t = (account.job_title || "").toUpperCase();
  if (["CEO","COO","CTO","CHIEF","PRESIDENT","OWNER","FOUNDER","GENERAL MANAGER","CORPORATE MANAGER"].some(x => t.includes(x))) return "super_admin";
  if (["MANAGER","SUPERVISOR","DIRECTOR","OFFICER","AUDITOR","EXECUTIVE ASSISTANT","EXECUTIVE SECRETARY","CORPORATE TRAINOR","SUBJECT MATTER EXPERT","PARTNER ONBOARDING COACH","BUSINESS DEVELOPMENT COACH","BUSINESS DEVELOPMENT ACQUISITION","PARTNER SUCCESS ENABLEMENT","SALES HEAD","SALES SKILLS","ONBOARDING COACH"].some(x => t.includes(x))) return "admin";
  if (t === "HR" || t.startsWith("HR ") || t.includes("HUMAN RESOURCE") || ["RECRUITER","RECRUITMENT","TALENT ACQUISITION","TALENT MANAGEMENT","PAYROLL","COMPENSATION AND BENEFITS","LEARNING AND DEVELOPMENT","TRAINING AND DEVELOPMENT"].some(x => t.includes(x))) return "admin";
  if (["TEAM LEADER","TEAM LEAD","TL DOMESTIC","TL INTERNATIONAL","CHAT SUPPORT TEAM LEAD","CUSTOMER RESPONSE LEADER","PARTNER SUCCESS LEAD","ROB TEAM LEADER","ADMIN TEAM LEADER"].some(x => t.includes(x)) || t === "TL" || t.startsWith("TL ")) return "team_leader";
  return "agent";
}

const ROLE_BADGE = {
  super_admin: { label: "Super Admin", bg: `${ORANGE}22`, color: ORANGE },
  admin:       { label: "Admin",       bg: "#ede9fe",     color: "#6d28d9" },
  team_leader: { label: "Team Leader", bg: "#dbeafe",     color: "#1d4ed8" },
};

const ALL_MODULES = [
  { id: "cache",      path: "/admin/cache",      icon: "🗄️",  label: "Admin"            },
  { id: "briefings",  path: "/admin/briefings",  icon: "📋",  label: "Client Briefings" },
  { id: "vouchers",   path: "/admin/vouchers",   icon: "📄",  label: "Travel Vouchers"  },
  { id: "reviews",    path: "/admin/reviews",    icon: "⭐",  label: "Client Reviews"   },
  { id: "users",      path: "/admin/users",      icon: "👥",  label: "User Management", adminOrHigher: true },
];

// ── Login Screen ──────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show,     setShow]     = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!ACCOUNTS_URL || !ACCOUNTS_KEY) throw new Error("Accounts API not configured.");
      const trimmed = username.trim();
      const r = await fetch(
        `${ACCOUNTS_URL}/rest/v1/employeeaccount?select=id,data&data->>employee_code=eq.${encodeURIComponent(trimmed)}&data->>status=eq.active&limit=1`,
        {
          headers: {
            "apikey": ACCOUNTS_KEY,
            "Authorization": `Bearer ${ACCOUNTS_KEY}`,
            "Accept-Profile": "public",
          },
          signal: AbortSignal.timeout(12000),
        }
      );
      if (!r.ok) throw new Error(`Accounts service error (${r.status})`);
      const rows = await r.json();
      if (!rows?.length) {
        setError("Username not found or account is inactive.");
      } else {
        const acct = rows[0].data;
        if (acct.generated_password !== password.trim()) {
          setError("Incorrect password.");
          setPassword("");
        } else {
          const role = resolveRole(acct);
          sessionStorage.setItem(SESSION_KEY, toTitleCase(acct.full_name));
          sessionStorage.setItem(SESSION_ROLE, role);
          onLogin(toTitleCase(acct.full_name), role);
        }
      }
    } catch (err) {
      console.error("[Admin login]", err);
      setError("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const clearError = () => setError("");

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#F5F5F5" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-xs bg-white rounded-3xl shadow-xl p-8"
      >
        <div className="mb-8 text-center">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${ORANGE}18` }}>
            <Lock size={22} style={{ color: ORANGE }} />
          </div>
          <span className="font-condensed font-black text-3xl" style={{ color: ORANGE }}>GLADEX</span>
          <span className="font-condensed font-black text-3xl text-gray-800"> Admin</span>
          <p className="font-body text-sm text-gray-400 mt-1">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={username}
            onChange={e => { setUsername(e.target.value); clearError(); }}
            placeholder="Employee ID (e.g. GDX2022-0001)"
            required
            autoFocus
            autoComplete="username"
            className="w-full font-body text-sm rounded-xl px-4 py-3 outline-none transition-all"
            style={{
              border: `1.5px solid ${error ? "#fca5a5" : "#E5E5E5"}`,
              backgroundColor: "#FAFAFA",
              color: "#111",
            }}
          />

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={e => { setPassword(e.target.value); clearError(); }}
              placeholder="Password"
              required
              autoComplete="current-password"
              className="w-full font-body text-sm rounded-xl px-4 py-3 pr-11 outline-none transition-all"
              style={{
                border: `1.5px solid ${error ? "#fca5a5" : "#E5E5E5"}`,
                backgroundColor: "#FAFAFA",
                color: "#111",
              }}
            />
            <button type="button" onClick={() => setShow(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <p className="font-body text-xs text-red-500 text-center bg-red-50 py-2 rounded-lg">{error}</p>
          )}

          <motion.button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full flex items-center justify-center gap-2 font-body font-bold text-sm py-3 rounded-xl disabled:opacity-50 mt-1"
            style={{ backgroundColor: ORANGE, color: "#000" }}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {loading && <Loader size={15} className="animate-spin" />}
            {loading ? "Checking…" : "Sign In"}
          </motion.button>
        </form>

        <p className="font-body text-xs text-center text-gray-300 mt-6">Gladex Tours — Admin Only</p>
      </motion.div>
    </div>
  );
}

// ── Main Admin Shell ──────────────────────────────────────────────────────────

export default function Admin() {
  const location = useLocation();
  const navigate  = useNavigate();

  const [adminUser, setAdminUser] = useState(
    () => sessionStorage.getItem(SESSION_KEY) || null
  );
  const [adminRole, setAdminRole] = useState(
    () => sessionStorage.getItem(SESSION_ROLE) || "agent"
  );

  function handleSignOut() {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_ROLE);
    setAdminUser(null);
    setAdminRole("agent");
  }

  if (!adminUser) {
    return (
      <LoginScreen onLogin={(name, role) => {
        setAdminUser(name);
        setAdminRole(role);
      }} />
    );
  }

  const canManageUsers = adminRole === "super_admin" || adminRole === "admin";
  const MODULES = ALL_MODULES.filter(m => !m.adminOrHigher || canManageUsers);
  const active  = MODULES.find(m => location.pathname.startsWith(m.path))?.id ?? "cache";
  const badge   = ROLE_BADGE[adminRole];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="max-w-screen-2xl mx-auto flex min-h-screen">

        {/* ── Sidebar ── */}
        <aside className="w-56 shrink-0 border-r border-gray-200 bg-white flex flex-col pt-8 pb-6 px-4">
          <div className="mb-8 px-2">
            <span className="font-condensed font-black text-xl" style={{ color: ORANGE }}>GLADEX</span>
            <span className="font-condensed font-black text-xl text-gray-800"> Admin</span>
            <p className="font-body text-xs text-gray-400 mt-1">👤 {adminUser}</p>
            {badge && (
              <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ backgroundColor: badge.bg, color: badge.color }}>
                <ShieldCheck size={10} />
                {badge.label}
              </div>
            )}
          </div>

          <nav className="flex-1 space-y-1">
            {MODULES.map(m => {
              const isActive = active === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => navigate(m.path)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                  style={{
                    backgroundColor: isActive ? `${ORANGE}18` : "transparent",
                    color: isActive ? ORANGE : "#555",
                    fontWeight: isActive ? 700 : 500,
                  }}
                >
                  <span className="text-base leading-none">{m.icon}</span>
                  <span className="font-body text-sm">{m.label}</span>
                </button>
              );
            })}
          </nav>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left font-body text-sm text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all mt-2"
          >
            <LogOut size={14} />
            Sign Out
          </button>

          <p className="font-body text-xs text-gray-300 px-2 mt-3">Gladex Tours © 2024</p>
        </aside>

        {/* ── Content ── */}
        <main className="flex-1 min-w-0 p-6 lg:p-8">
          {active === "cache"      && <AdminCache />}
          {active === "briefings"  && <AdminBriefings />}
          {active === "vouchers"   && <AdminVouchers />}
          {active === "reviews"    && <AdminReviews />}
          {active === "users"      && canManageUsers && <AdminUsers />}
        </main>
      </div>
    </div>
  );
}
