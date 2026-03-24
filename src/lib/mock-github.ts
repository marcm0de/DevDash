import type { GitEvent } from "@/store";

export const mockGitEvents: GitEvent[] = [
  {
    id: "1",
    type: "commit",
    repo: "devdash",
    message: "feat: add search widget with multi-engine support",
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "pr",
    repo: "closetmax",
    message: "PR #42 — implement wardrobe analytics dashboard",
    time: "5 hours ago",
  },
  {
    id: "3",
    type: "review",
    repo: "openclaw",
    message: "Approved PR #187 — fix heartbeat scheduling",
    time: "1 day ago",
  },
  {
    id: "4",
    type: "issue",
    repo: "devdash",
    message: "Issue #3 — add weather API integration",
    time: "2 days ago",
  },
  {
    id: "5",
    type: "commit",
    repo: "closetmax",
    message: "fix: resolve auth token refresh race condition",
    time: "3 days ago",
  },
];
