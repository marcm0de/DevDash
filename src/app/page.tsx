"use client";

import Clock from "@/components/Clock";
import Greeting from "@/components/Greeting";
import SearchBar from "@/components/SearchBar";
import QuickLinks from "@/components/QuickLinks";
import Notepad from "@/components/Notepad";
import Todos from "@/components/Todos";
import GitHubFeed from "@/components/GitHubFeed";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import WeatherWidget from "@/components/WeatherWidget";
import PomodoroWidget from "@/components/PomodoroWidget";
import FocusModeToggle from "@/components/FocusMode";
import SettingsPanel from "@/components/SettingsPanel";
import { useDashStore } from "@/store";

export default function Home() {
  const focusMode = useDashStore((s) => s.focusMode);

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8 space-y-8">
      <FocusModeToggle />
      <SettingsPanel />

      {/* Hero: Greeting + Clock + Search — always visible */}
      <section className="space-y-4">
        <Greeting />
        <Clock />
        {!focusMode && <SearchBar />}
      </section>

      {/* Focus Mode: only show Notepad */}
      {focusMode ? (
        <section className="max-w-2xl mx-auto w-full">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 animate-fade-in">
            <Notepad />
          </div>
        </section>
      ) : (
        <>
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

          {/* Bottom row: Weather + Pomodoro */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 animate-fade-in">
              <WeatherWidget />
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 animate-fade-in">
              <PomodoroWidget />
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="text-center text-[10px] text-[var(--text-muted)] opacity-30 pb-4">
        DevDash · press <kbd className="px-1 py-0.5 rounded border border-[var(--border)] text-[9px]">?</kbd> for shortcuts
        {focusMode && " · Focus Mode active"}
      </footer>

      <KeyboardShortcuts />
    </main>
  );
}
