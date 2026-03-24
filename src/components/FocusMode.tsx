"use client";

import { useDashStore } from "@/store";
import { Focus, X } from "lucide-react";

export default function FocusModeToggle() {
  const focusMode = useDashStore((s) => s.focusMode);
  const toggleFocusMode = useDashStore((s) => s.toggleFocusMode);

  return (
    <button
      onClick={toggleFocusMode}
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
        focusMode
          ? "bg-[var(--accent)] text-[#0f172a] shadow-lg"
          : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]"
      }`}
      title={focusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
    >
      {focusMode ? (
        <>
          <X size={14} />
          Exit Focus
        </>
      ) : (
        <>
          <Focus size={14} />
          Focus Mode
        </>
      )}
    </button>
  );
}
