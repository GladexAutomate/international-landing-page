// @ts-nocheck
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader, ChevronDown, ToggleLeft, ToggleRight, Shield } from "lucide-react";

const ORANGE = "#FF9913";

const ACCOUNTS_URL = import.meta.env.VITE_ACCOUNTS_URL;
const ACCOUNTS_KEY = import.meta.env.VITE_ACCOUNTS_SVC_KEY;

function resolveRole(account) {
  const t = (account.job_title || "").toUpperCase();
  if (["CEO","COO","CTO","CHIEF","PRESIDENT","OWNER","FOUNDER","GENERAL MANAGER","CORPORATE MANAGER"].some(x => t.includes(x))) return "super_admin";
  if (["MANAGER","SUPERVISOR","DIRECTOR","OFFICER","AUDITOR","EXECUTIVE ASSISTANT","EXECUTIVE SECRETARY","CORPORATE TRAINOR","SUBJECT MATTER EXPERT","PARTNER ONBOARDING COACH","BUSINESS DEVELOPMENT COACH","BUSINESS DEVELOPMENT ACQUISITION","PARTNER SUCCESS ENABLEMENT","SALES HEAD","SALES SKILLS","ONBOARDING COACH"].some(x => t.includes(x))) return "admin";
  if (t === "HR" || t.startsWith("HR ") || t.includes("HUMAN RESOURCE") || ["RECRUITER","RECRUITMENT","TALENT ACQUISITION","TALENT MANAGEMENT","PAYROLL","COMPENSATION AND BENEFITS","LEARNING AND DEVELOPMENT","TRAINING AND DEVELOPMENT"].some(x => t.includes(x))) return "admin";
  if (["TEAM LEADER","TEAM LEAD","TL DOMESTIC","TL INTERNATIONAL","CHAT SUPPORT TEAM LEAD","CUSTOMER RESPONSE LEADER","PARTNER SUCCESS LEAD","ROB TEAM LEADER","ADMIN TEAM LEADER"].some(x => t.includes(x)) || t === "TL" || t.startsWith("TL ")) return "team_leader";
  return "agent";
}

const ROLE_LABELS = {
  super_admin: { label: "Super Admin",  bg: "#FF9913", color: "#000" },
  admin:       { label: "Admin",        bg: "#7c3aed", color: "#fff" },
  team_leader: { label: "Team Leader",  bg: "#1d4ed8", color: "#fff" },
  agent:       { label: "Agent",        bg: "#e5e7eb", color: "#374151" },
};

const ROLE_FILTER_OPTIONS = ["super_admin", "admin", "team_leader", "agent"];

export default function AdminUsers() {
  const [accounts, setAccounts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [toggling, setToggling]     = useState(null);
  const [toast, setToast]           = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    if (!ACCOUNTS_URL || !ACCOUNTS_KEY) return;
    setLoading(true);
    const PAGE = 100;
    let all = [];
    let from = 0;
    try {
      while (true) {
        const r = await fetch(
          `${ACCOUNTS_URL}/rest/v1/employeeaccount?select=id,data&limit=${PAGE}&offset=${from}`,
          {
            headers: {
              "apikey": ACCOUNTS_KEY,
              "Authorization": `Bearer ${ACCOUNTS_KEY}`,
              "Accept-Profile": "public",
            },
          }
        );
        if (!r.ok) break;
        const rows = await r.json();
        all = all.concat(rows.map(row => ({ ...row.data, _id: row.id, role: resolveRole(row.data) })));
        if (rows.length < PAGE) break;
        from += PAGE;
      }
      all.sort((a, b) => (a.full_name || "").localeCompare(b.full_name || ""));
      setAccounts(all);
    } catch (err) {
      console.error("[AdminUsers] load error", err);
    }
    setLoading(false);
  }

  async function toggleActive(account) {
    setToggling(account._id);
    const newStatus = account.status === "active" ? "inactive" : "active";
    const { _id, role, ...cleanData } = account;
    try {
      const r = await fetch(
        `${ACCOUNTS_URL}/rest/v1/employeeaccount?id=eq.${account._id}`,
        {
          method: "PATCH",
          headers: {
            "apikey": ACCOUNTS_KEY,
            "Authorization": `Bearer ${ACCOUNTS_KEY}`,
            "Content-Profile": "public",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
          },
          body: JSON.stringify({ data: { ...cleanData, status: newStatus } }),
        }
      );
      if (!r.ok) {
        showToast(`Failed to update ${account.full_name}`, "error");
      } else {
        setAccounts(prev =>
          prev.map(a => a._id === account._id ? { ...a, status: newStatus } : a)
        );
        showToast(
          `${account.full_name} ${newStatus === "active" ? "activated" : "deactivated"}`,
          newStatus === "active" ? "success" : "warning"
        );
      }
    } catch (err) {
      showToast(`Failed to update ${account.full_name}`, "error");
    }
    setToggling(null);
  }

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  const q = search.trim().toLowerCase();
  const filtered = useMemo(() => accounts.filter(a => {
    const roleOk = roleFilter === "ALL" || a.role === roleFilter;
    if (!roleOk) return false;
    if (!q) return true;
    return (
      (a.full_name || "").toLowerCase().includes(q) ||
      (a.employee_code || "").toLowerCase().includes(q) ||
      (a.job_title || "").toLowerCase().includes(q)
    );
  }), [accounts, q, roleFilter]);

  const activeCount   = accounts.filter(a => a.status === "active").length;
  const inactiveCount = accounts.length - activeCount;

  return (
    <div className="flex-1 min-w-0">

      {/* Header */}
      <div className="mb-6 flex items-start gap-3">
        <Shield size={20} style={{ color: ORANGE }} className="mt-1 shrink-0" />
        <div>
          <h2 className="font-condensed font-black text-3xl text-gray-900 leading-tight">User Management</h2>
          <p className="font-body text-sm text-gray-400 mt-0.5">
            View all employee accounts — activate or deactivate access.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-3 mb-5 flex-wrap">
        {[
          { label: "Total Accounts", value: accounts.length, color: "#6366f1" },
          { label: "Active",         value: activeCount,     color: "#16a34a" },
          { label: "Inactive",       value: inactiveCount,   color: "#dc2626" },
        ].map(s => (
          <div key={s.label}
            className="bg-white rounded-xl px-4 py-3 flex items-center gap-3"
            style={{ border: "1.5px solid #e5e7eb" }}>
            <span className="font-black text-2xl font-condensed" style={{ color: s.color }}>{s.value}</span>
            <span className="font-body text-xs text-gray-500">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-4 flex-wrap items-center">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search name, ID, or job title…"
            className="w-full font-body text-sm pl-8 pr-8 py-2.5 rounded-xl bg-white outline-none"
            style={{ border: `1.5px solid ${search ? ORANGE : "#e5e7eb"}`, color: "#111" }}
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
              <X size={13} />
            </button>
          )}
        </div>

        <div className="relative">
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="font-body text-sm py-2.5 pl-3 pr-8 rounded-xl bg-white outline-none appearance-none cursor-pointer"
            style={{ border: `1.5px solid ${roleFilter !== "ALL" ? ORANGE : "#e5e7eb"}`, color: "#111" }}
          >
            <option value="ALL">All Roles</option>
            {ROLE_FILTER_OPTIONS.map(r => (
              <option key={r} value={r}>{ROLE_LABELS[r]?.label ?? r}</option>
            ))}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <p className="font-body text-xs text-gray-400 mb-3">
        {filtered.length} account{filtered.length !== 1 ? "s" : ""}
        {q || roleFilter !== "ALL" ? " matching filter" : ""}
      </p>

      {/* Table */}
      {loading ? (
        <div className="flex items-center gap-2 text-gray-400 py-10">
          <Loader size={16} className="animate-spin" />
          <span className="font-body text-sm">Loading accounts…</span>
        </div>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1.5px solid #e5e7eb" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body" style={{ minWidth: 640 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f0f0f0", backgroundColor: "#fafafa" }}>
                  {["Name", "Employee ID", "Job Title", "Role", "Status", "Action"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-12 text-gray-400 text-sm">No accounts found.</td></tr>
                ) : filtered.map((account, i) => {
                  const roleStyle  = ROLE_LABELS[account.role] ?? ROLE_LABELS.agent;
                  const isActive   = account.status === "active";
                  const isToggling = toggling === account._id;
                  return (
                    <tr key={account._id}
                      className="border-t border-gray-50 hover:bg-orange-50/20 transition-colors"
                      style={{ backgroundColor: i % 2 === 0 ? undefined : "#FAFAFA" }}>

                      <td className="px-4 py-3">
                        <span className="font-semibold text-gray-800">{account.full_name}</span>
                      </td>

                      <td className="px-4 py-3">
                        <span className="font-mono text-xs font-bold" style={{ color: ORANGE }}>
                          {account.employee_code}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-600">{account.job_title || "—"}</span>
                      </td>

                      <td className="px-4 py-3">
                        <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: roleStyle.bg, color: roleStyle.color }}>
                          {roleStyle.label}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                          isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-red-400"}`} />
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        {account.role === "super_admin" ? (
                          <span className="text-xs text-gray-300">Protected</span>
                        ) : (
                          <motion.button
                            onClick={() => toggleActive(account)}
                            disabled={isToggling}
                            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                            style={{
                              backgroundColor: isActive ? "#fee2e2" : "#dcfce7",
                              color: isActive ? "#dc2626" : "#16a34a",
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isToggling
                              ? <Loader size={11} className="animate-spin" />
                              : isActive
                                ? <><ToggleRight size={12} /> Deactivate</>
                                : <><ToggleLeft size={12} /> Activate</>
                            }
                          </motion.button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 right-6 font-body text-sm font-bold px-5 py-3 rounded-2xl shadow-lg z-50"
            style={{
              backgroundColor: toast.type === "error" ? "#dc2626" : toast.type === "warning" ? "#f59e0b" : "#16a34a",
              color: "#fff",
            }}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
