"use client";

import { useEffect, useState } from "react";
import { Keyboard } from "lucide-react";

const shortcuts = [
  { key: "/", desc: "Focus search" },
  { key: "Ctrl+L", desc: "Add link" },
  { key: "Ctrl+T", desc: "Add todo" },
  { key: "Ctrl+/", desc: "Cycle engine" },
  { key: "?", desc: "Toggle shortcuts" },
];

export default function KeyboardShortcuts() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't fire if typing in an input
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "?") {
        setShow((s) => !s);
      }
      if (e.key === "/") {
        e.preventDefault();
        const el = document.querySelector<HTMLInputElement>('input[placeholder="Search…"]');
        el?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!show) {
    return (
      <button
        onClick={() => setShow(true)}
        className="fixed bottom-4 right-4 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors opacity-40 hover:opacity-100"
        title="Keyboard shortcuts (?)"
      >
        <Keyboard size={16} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShow(false)}>
      <div
        className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 max-w-xs w-full animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-sm font-semibold text-[var(--accent)] mb-4 flex items-center gap-2">
          <Keyboard size={14} /> Keyboard Shortcuts
        </h3>
        <div className="space-y-2">
          {shortcuts.map((s) => (
            <div key={s.key} className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-muted)]">{s.desc}</span>
              <kbd className="px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)] text-xs font-mono">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[10px] text-[var(--text-muted)] text-center">Press ? or click outside to close</p>
      </div>
    </div>
  );
}
