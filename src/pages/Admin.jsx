// @ts-nocheck
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Loader, Eye, EyeOff, Lock } from "lucide-react";
import AdminCache from "./AdminCache";
import AdminBriefings from "./AdminBriefings";
import AdminReviews from "./AdminReviews";
import AdminVouchers from "./AdminVouchers";

const ORANGE = "#FF9913";
const SESSION_KEY = "gdx_admin_auth";

// Parse "User1:pass1,User2:pass2" → Map { "user1" → { display: "User1", pass: "pass1" } }
function parseAdminUsers() {
  const raw = import.meta.env.VITE_ADMIN_USERS || "";
  const map = new Map();
  raw.split(",").forEach(pair => {
    const [user, ...rest] = pair.trim().split(":");
    if (user && rest.length) map.set(user.toLowerCase(), { display: user, pass: rest.join(":") });
  });
  return map;
}
const ADMIN_USERS = parseAdminUsers();

const MODULES = [
  { id: "cache",      path: "/admin/cache",      icon: "🗄️",  label: "Admin"           },
  { id: "briefings",  path: "/admin/briefings",  icon: "📋",  label: "Client Briefings"},
  { id: "vouchers",   path: "/admin/vouchers",   icon: "📄",  label: "Travel Vouchers" },
  { id: "reviews",    path: "/admin/reviews",    icon: "⭐",  label: "Client Reviews"  },
];

// ── Login Screen ──────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show,     setShow]     = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const record = ADMIN_USERS.get(username.trim().toLowerCase());
      if (record && record.pass === password) {
        sessionStorage.setItem(SESSION_KEY, record.display);
        onLogin(record.display);
      } else if (!ADMIN_USERS.has(username.trim().toLowerCase())) {
        setError("Username not found.");
      } else {
        setError("Incorrect password.");
        setPassword("");
      }
      setLoading(false);
    }, 400);
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
          {/* Username */}
          <input
            type="text"
            value={username}
            onChange={e => { setUsername(e.target.value); clearError(); }}
            placeholder="Username"
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

          {/* Password */}
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

  function handleSignOut() {
    sessionStorage.removeItem(SESSION_KEY);
    setAdminUser(null);
  }

  if (!adminUser) {
    return <LoginScreen onLogin={(name) => setAdminUser(name)} />;
  }

  const active = MODULES.find(m => location.pathname.startsWith(m.path))?.id ?? "cache";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="max-w-screen-2xl mx-auto flex min-h-screen">

        {/* ── Sidebar ── */}
        <aside className="w-56 shrink-0 border-r border-gray-200 bg-white flex flex-col pt-8 pb-6 px-4">
          <div className="mb-8 px-2">
            <span className="font-condensed font-black text-xl" style={{ color: ORANGE }}>GLADEX</span>
            <span className="font-condensed font-black text-xl text-gray-800"> Admin</span>
            <p className="font-body text-xs text-gray-400 mt-1">👤 {adminUser}</p>
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
        </main>
      </div>
    </div>
  );
}
