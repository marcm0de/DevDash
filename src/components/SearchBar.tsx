"use client";

import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import { useDashStore } from "@/store";

const engines = {
  google: { label: "Google", url: "https://www.google.com/search?q=" },
  duckduckgo: { label: "DDG", url: "https://duckduckgo.com/?q=" },
  github: { label: "GitHub", url: "https://github.com/search?q=" },
} as const;

type Engine = keyof typeof engines;

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const searchEngine = useDashStore((s) => s.searchEngine);
  const setSearchEngine = useDashStore((s) => s.setSearchEngine);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;
      window.open(engines[searchEngine].url + encodeURIComponent(query.trim()), "_blank");
      setQuery("");
    },
    [query, searchEngine]
  );

  const cycleEngine = () => {
    const keys = Object.keys(engines) as Engine[];
    const idx = keys.indexOf(searchEngine);
    setSearchEngine(keys[(idx + 1) % keys.length]);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto flex items-center gap-2">
      <button
        type="button"
        onClick={cycleEngine}
        className="shrink-0 text-xs px-2 py-1 rounded border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
        title="Cycle search engine (Ctrl+/)"
      >
        {engines[searchEngine].label}
      </button>
      <div className="relative flex-1">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg py-2 pl-9 pr-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>
    </form>
  );
}
