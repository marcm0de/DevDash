"use client";

import { useState } from "react";
import { Plus, X, ExternalLink } from "lucide-react";
import { useDashStore } from "@/store";

export default function QuickLinks() {
  const links = useDashStore((s) => s.links);
  const addLink = useDashStore((s) => s.addLink);
  const removeLink = useDashStore((s) => s.removeLink);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: "", url: "", icon: "🔗" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) return;
    addLink({
      title: form.title.trim(),
      url: form.url.startsWith("http") ? form.url.trim() : `https://${form.url.trim()}`,
      icon: form.icon || "🔗",
    });
    setForm({ title: "", url: "", icon: "🔗" });
    setAdding(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Quick Links
        </h2>
        <button
          onClick={() => setAdding(!adding)}
          className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          title="Add link (Ctrl+L)"
        >
          <Plus size={14} />
        </button>
      </div>

      {adding && (
        <form onSubmit={handleAdd} className="flex gap-2 animate-fade-in">
          <input
            value={form.icon}
            onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
            className="w-10 bg-[var(--bg-card)] border border-[var(--border)] rounded px-1 py-1 text-center text-sm focus:outline-none focus:border-[var(--accent)]"
            maxLength={2}
          />
          <input
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Title"
            className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded px-2 py-1 text-sm focus:outline-none focus:border-[var(--accent)]"
            autoFocus
          />
          <input
            value={form.url}
            onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
            placeholder="URL"
            className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded px-2 py-1 text-sm focus:outline-none focus:border-[var(--accent)]"
          />
          <button type="submit" className="text-[var(--accent)] hover:text-[var(--accent-dim)] text-sm font-semibold">
            Add
          </button>
        </form>
      )}

      <div className="grid grid-cols-3 gap-2">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 hover:border-[var(--accent)] hover:bg-[var(--bg-hover)] transition-all"
          >
            <span className="text-base">{link.icon}</span>
            <span className="text-sm truncate flex-1">{link.title}</span>
            <ExternalLink size={10} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeLink(link.id);
              }}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--danger)] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px]"
            >
              <X size={8} />
            </button>
          </a>
        ))}
      </div>
    </div>
  );
}
