"use client";

import { useDashStore } from "@/store";
import { FileText } from "lucide-react";

export default function Notepad() {
  const notepad = useDashStore((s) => s.notepad);
  const setNotepad = useDashStore((s) => s.setNotepad);

  return (
    <div className="space-y-3 h-full flex flex-col">
      <div className="flex items-center gap-2">
        <FileText size={14} className="text-[var(--text-muted)]" />
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Notepad
        </h2>
        <span className="ml-auto text-[10px] text-[var(--text-muted)] opacity-50">
          auto-saved
        </span>
      </div>
      <textarea
        value={notepad}
        onChange={(e) => setNotepad(e.target.value)}
        placeholder="Quick notes…"
        className="flex-1 min-h-[120px] w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] resize-none focus:outline-none focus:border-[var(--accent)] transition-colors leading-relaxed"
        spellCheck={false}
      />
    </div>
  );
}
