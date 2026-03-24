"use client";

import Clock from "@/components/Clock";
import Greeting from "@/components/Greeting";
import SearchBar from "@/components/SearchBar";
import QuickLinks from "@/components/QuickLinks";
import Notepad from "@/components/Notepad";
import Todos from "@/components/Todos";
import GitHubFeed from "@/components/GitHubFeed";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";

export default function Home() {
  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8 space-y-8">
      {/* Hero: Greeting + Clock + Search */}
      <section className="space-y-4">
        <Greeting />
        <Clock />
        <SearchBar />
      </section>

      {/* Quick Links */}
      <section className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 animate-fade-in">
        <QuickLinks />
      </section>

      {/* Main Grid: Todos | Notepad | GitHub Feed */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 animate-fade-in">
          <Todos />
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 animate-fade-in">
          <Notepad />
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 animate-fade-in">
          <GitHubFeed />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-[10px] text-[var(--text-muted)] opacity-30 pb-4">
        DevDash · press <kbd className="px-1 py-0.5 rounded border border-[var(--border)] text-[9px]">?</kbd> for shortcuts
      </footer>

      <KeyboardShortcuts />
    </main>
  );
}
