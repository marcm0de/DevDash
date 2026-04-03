"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, SkipForward, Timer } from "lucide-react";
import { useDashStore } from "@/store";

type PomodoroState = "idle" | "running" | "paused";
type PomodoroPhase = "work" | "break" | "longBreak";

const DURATIONS = {
  work: 25 * 60,
  break: 5 * 60,
  longBreak: 15 * 60,
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function PomodoroWidget() {
  const [state, setState] = useState<PomodoroState>("idle");
  const [phase, setPhase] = useState<PomodoroPhase>("work");
  const [timeLeft, setTimeLeft] = useState(DURATIONS.work);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state === "running") {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Session complete
            if (phase === "work") {
              const newSessions = sessions + 1;
              setSessions(newSessions);
              if (newSessions % 4 === 0) {
                setPhase("longBreak");
                setState("idle");
                return DURATIONS.longBreak;
              } else {
                setPhase("break");
                setState("idle");
                return DURATIONS.break;
              }
            } else {
              setPhase("work");
              setState("idle");
              return DURATIONS.work;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state, phase, sessions]);

  const handlePlayPause = () => {
    if (state === "idle") setState("running");
    else if (state === "running") setState("paused");
    else setState("running");
  };

  const handleReset = () => {
    setState("idle");
    setTimeLeft(DURATIONS[phase]);
  };

  const handleSkip = () => {
    if (phase === "work") {
      setPhase("break");
      setTimeLeft(DURATIONS.break);
    } else {
      setPhase("work");
      setTimeLeft(DURATIONS.work);
    }
    setState("idle");
  };

  const total = DURATIONS[phase];
  const progress = total > 0 ? ((total - timeLeft) / total) * 100 : 0;

  const phaseLabel =
    phase === "work" ? "Focus" : phase === "break" ? "Break" : "Long Break";
  const phaseColor =
    phase === "work"
      ? "var(--accent)"
      : phase === "break"
      ? "#22c55e"
      : "#8b5cf6";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Timer size={14} className="text-[var(--text-muted)]" />
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Pomodoro
        </h2>
        <span
          className="ml-auto text-[10px] px-2 py-0.5 rounded-full font-medium"
          style={{ background: phaseColor + "20", color: phaseColor }}
        >
          {phaseLabel}
        </span>
      </div>

      {/* Timer display */}
      <div className="text-center">
        <span
          className="text-4xl font-bold tabular-nums tracking-tight"
          style={{ color: phaseColor }}
        >
          {formatTime(timeLeft)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%`, background: phaseColor }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={handleReset}
          className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          title="Reset"
        >
          <RotateCcw size={14} />
        </button>
        <button
          onClick={handlePlayPause}
          className="p-2.5 rounded-lg text-[#0f172a] transition-colors"
          style={{ background: phaseColor }}
        >
          {state === "running" ? (
            <Pause size={16} />
          ) : (
            <Play size={16} className="ml-0.5" />
          )}
        </button>
        <button
          onClick={handleSkip}
          className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          title="Skip"
        >
          <SkipForward size={14} />
        </button>
      </div>

      {/* Session counter */}
      <div className="flex items-center justify-center gap-1.5">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-colors"
            style={{
              background:
                i < sessions % 4 ? phaseColor : "var(--border)",
            }}
          />
        ))}
        <span className="text-[10px] text-[var(--text-muted)] ml-1">
          {sessions} sessions
        </span>
      </div>
    </div>
  );
}
