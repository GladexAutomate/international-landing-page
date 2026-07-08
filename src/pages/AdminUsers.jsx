// @ts-nocheck
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Search, X, Loader, ChevronDown, ToggleLeft, ToggleRight, Shield } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const ORANGE = "#FF9913";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const DEPT_COLORS = {
  "ACCOUNTING":        ["#dbeafe","#1e40af"],
  "ADMIN":             ["#fef3c7","#92400e"],
  "CORPORATE":         ["#d1fae5","#065f46"],
  "GTTC":              ["#ede9fe","#4c1d95"],
  "GUARD":             ["#f1f5f9","#475569"],
  "HR":                ["#fce7f3","#831843"],
  "MAIN DOMESTIC":     ["#dcfce7","#14532d"],
  "MAIN INTL":         ["#cffafe","#164e63"],
  "MARKETING":         ["#fef9c3","#713f12"],
  "POTB":              ["#e0f2fe","#0c4a6e"],
  "PRODUCT DEVELOPER": ["#f0fdf4","#166534"],
  "ROBINSON":          ["#fff1f2","#881337"],
  "SM MANILA":         ["#ecfdf5","#047857"],
};

function deptChip(dept) {
  const c = DEPT_COLORS[dept];
  if (!c) return null;
  return (
    <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full"
      style={{ backgroundColor: c[0], color: c[1] }}>
      {dept}
    </span>
  );
}

const ROLE_LABELS = {
  super_admin: { label: "Super Admin", bg: "#FF9913", color: "#000" },
  admin:       { label: "Admin",       bg: "#7c3aed", color: "#fff" },
  agent:       { label: "Agent",       bg: "#e5e7eb", color: "#374151" },
};

export default function AdminUsers() {
  const [accounts, setAccounts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [deptFilter, setDeptFilter] = useState("ALL");
  const [toggling, setToggling]     = useState(null); // id being toggled
  const [toast, setToast]           = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("admin_accounts")
      .select("id, full_name, employee_code, department, role, is_active, email, created_at")
      .order("department", { ascending: true })
      .order("full_name", { ascending: true });
    if (!error) setAccounts(data ?? []);
    setLoading(false);
  }

  async function toggleActive(account) {
    setToggling(account.id);
    const newVal = !account.is_active;
    const { error } = await supabase
      .from("admin_accounts")
      .update({ is_active: newVal })
      .eq("id", account.id);

    if (error) {
      showToast(`Failed to update ${account.full_name}`, "error");
    } else {
      setAccounts(prev =>
        prev.map(a => a.id === account.id ? { ...a, is_active: newVal } : a)
      );
      showToast(
        `${account.full_name} ${newVal ? "activated" : "deactivated"}`,
        newVal ? "success" : "warning"
      );
    }
    setToggling(null);
  }

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  const departments = useMemo(() => {
    const depts = [...new Set(accounts.map(a => a.department || "—"))].sort();
    return ["ALL", ...depts];
  }, [accounts]);

  const q = search.trim().toLowerCase();
  const filtered = useMemo(() => accounts.filter(a => {
    const deptOk = deptFilter === "ALL" || (a.department || "—") === deptFilter;
    if (!deptOk) return false;
    if (!q) return true;
    return (
      a.full_name.toLowerCase().includes(q) ||
      a.employee_code.toLowerCase().includes(q) ||
      (a.department || "").toLowerCase().includes(q)
    );
  }), [accounts, q, deptFilter]);

  const activeCount   = accounts.filter(a => a.is_active).length;
  const inactiveCount = accounts.length - activeCount;

  return (
    <div className="flex-1 min-w-0">

      {/* Header */}
      <div className="mb-6 flex items-start gap-3">
        <Shield size={20} style={{ color: ORANGE }} className="mt-1 shrink-0" />
        <div>
          <h2 className="font-condensed font-black text-3xl text-gray-900 leading-tight">User Management</h2>
          <p className="font-body text-sm text-gray-400 mt-0.5">
            Manage admin accounts — activate or deactivate access per employee.
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
            placeholder="Search name or Employee ID…"
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
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value)}
            className="font-body text-sm py-2.5 pl-3 pr-8 rounded-xl bg-white outline-none appearance-none cursor-pointer"
            style={{ border: `1.5px solid ${deptFilter !== "ALL" ? ORANGE : "#e5e7eb"}`, color: "#111" }}
          >
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <p className="font-body text-xs text-gray-400 mb-3">
        {filtered.length} account{filtered.length !== 1 ? "s" : ""}
        {q || deptFilter !== "ALL" ? " matching filter" : ""}
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
                  {["Name", "Employee ID", "Department", "Role", "Status", "Action"].map(h => (
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
                  const role = ROLE_LABELS[account.role] ?? ROLE_LABELS.agent;
                  const isToggling = toggling === account.id;
                  return (
                    <tr key={account.id}
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
                        {account.department ? deptChip(account.department) : (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: role.bg, color: role.color }}>
                          {role.label}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                          account.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${account.is_active ? "bg-green-500" : "bg-red-400"}`} />
                          {account.is_active ? "Active" : "Inactive"}
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
                              backgroundColor: account.is_active ? "#fee2e2" : "#dcfce7",
                              color: account.is_active ? "#dc2626" : "#16a34a",
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isToggling
                              ? <Loader size={11} className="animate-spin" />
                              : account.is_active
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
