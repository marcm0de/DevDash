import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ───── Types ───── */

export interface QuickLink {
  id: string;
  title: string;
  url: string;
  icon?: string; // emoji or favicon url
}

export interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}

export interface GitEvent {
  id: string;
  type: "commit" | "pr" | "issue" | "review";
  repo: string;
  message: string;
  time: string;
}

/* ───── State ───── */

interface DashState {
  // Notepad
  notepad: string;
  setNotepad: (v: string) => void;

  // Todos
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;

  // Quick Links
  links: QuickLink[];
  addLink: (link: Omit<QuickLink, "id">) => void;
  removeLink: (id: string) => void;
  updateLink: (id: string, data: Partial<QuickLink>) => void;

  // Search
  searchEngine: "google" | "duckduckgo" | "github";
  setSearchEngine: (e: "google" | "duckduckgo" | "github") => void;

  // User
  userName: string;
  setUserName: (n: string) => void;

  // Focus Mode
  focusMode: boolean;
  toggleFocusMode: () => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);

const defaultLinks: QuickLink[] = [
  { id: uid(), title: "GitHub", url: "https://github.com", icon: "🐙" },
  { id: uid(), title: "Stack Overflow", url: "https://stackoverflow.com", icon: "📚" },
  { id: uid(), title: "MDN", url: "https://developer.mozilla.org", icon: "📖" },
  { id: uid(), title: "Vercel", url: "https://vercel.com", icon: "▲" },
  { id: uid(), title: "NPM", url: "https://npmjs.com", icon: "📦" },
  { id: uid(), title: "ChatGPT", url: "https://chat.openai.com", icon: "🤖" },
];

export const useDashStore = create<DashState>()(
  persist(
    (set) => ({
      notepad: "",
      setNotepad: (v) => set({ notepad: v }),

      todos: [],
      addTodo: (text) =>
        set((s) => ({
          todos: [{ id: uid(), text, done: false, createdAt: Date.now() }, ...s.todos],
        })),
      toggleTodo: (id) =>
        set((s) => ({
          todos: s.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
        })),
      deleteTodo: (id) =>
        set((s) => ({ todos: s.todos.filter((t) => t.id !== id) })),

      links: defaultLinks,
      addLink: (link) =>
        set((s) => ({ links: [...s.links, { ...link, id: uid() }] })),
      removeLink: (id) =>
        set((s) => ({ links: s.links.filter((l) => l.id !== id) })),
      updateLink: (id, data) =>
        set((s) => ({
          links: s.links.map((l) => (l.id === id ? { ...l, ...data } : l)),
        })),

      searchEngine: "google",
      setSearchEngine: (e) => set({ searchEngine: e }),

      userName: "Marcus",
      setUserName: (n) => set({ userName: n }),

      focusMode: false,
      toggleFocusMode: () => set((s) => ({ focusMode: !s.focusMode })),
    }),
    { name: "devdash-store" }
  )
);
