"use client";

import { GitCommit, GitPullRequest, CircleDot, Eye } from "lucide-react";
import { mockGitEvents } from "@/lib/mock-github";
import type { GitEvent } from "@/store";

const icons: Record<GitEvent["type"], React.ReactNode> = {
  commit: <GitCommit size={12} className="text-[var(--accent)]" />,
  pr: <GitPullRequest size={12} className="text-purple-400" />,
  issue: <CircleDot size={12} className="text-yellow-400" />,
  review: <Eye size={12} className="text-blue-400" />,
};

export default function GitHubFeed() {
  return (
    <div className="space-y-3">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
        <GitCommit size={14} className="text-[var(--text-muted)]" />
        GitHub Activity
      </h2>
      <div className="space-y-2">
        {mockGitEvents.map((ev) => (
          <div
            key={ev.id}
            className="flex items-start gap-2 py-1.5 px-2 rounded hover:bg-[var(--bg-hover)] transition-colors"
          >
            <span className="mt-0.5 shrink-0">{icons[ev.type]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{ev.message}</p>
              <p className="text-[10px] text-[var(--text-muted)]">
                {ev.repo} · {ev.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
