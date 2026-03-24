"use client";

import { useState } from "react";
import { Settings, Check, X } from "lucide-react";
import { useDashStore } from "@/store";

export default function SettingsPanel() {
  const userName = useDashStore((s) => s.userName);
  const setUserName = useDashStore((s) => s.setUserName);
  const [open, setOpen] = useState(false);
  const [nameInput, setNameInput] = useState(userName);

  const handleSave = () => {
    if (nameInput.trim()) {
      setUserName(nameInput.trim());
    }
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => {
          setNameInput(userName);
          setOpen(true);
        }}
        className="fixed bottom-4 left-4 p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all opacity-40 hover:opacity-100 z-40"
        title="Settings"
      >
        <Settings size={16} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setOpen(false)}>
      <div
        className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 max-w-sm w-full mx-4 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-sm font-semibold text-[var(--accent)] mb-4 flex items-center gap-2">
          <Settings size={14} /> Dashboard Settings
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              placeholder="Enter your name"
              className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              autoFocus
            />
            <p className="text-[10px] text-[var(--text-muted)] mt-1">
              This name appears in your dashboard greeting
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={() => setOpen(false)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-medium bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            <X size={12} /> Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-medium bg-[var(--accent)] text-[#0f172a] hover:opacity-90 transition-opacity"
          >
            <Check size={12} /> Save
          </button>
        </div>
      </div>
    </div>
  );
}
