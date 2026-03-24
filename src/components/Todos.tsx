"use client";

import { useState } from "react";
import { useDashStore } from "@/store";
import { CheckSquare, Square, Trash2, Plus } from "lucide-react";

export default function Todos() {
  const todos = useDashStore((s) => s.todos);
  const addTodo = useDashStore((s) => s.addTodo);
  const toggleTodo = useDashStore((s) => s.toggleTodo);
  const deleteTodo = useDashStore((s) => s.deleteTodo);
  const [input, setInput] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    addTodo(input.trim());
    setInput("");
  };

  const active = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  return (
    <div className="space-y-3 h-full flex flex-col">
      <div className="flex items-center gap-2">
        <CheckSquare size={14} className="text-[var(--text-muted)]" />
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Todos
        </h2>
        <span className="ml-auto text-[10px] text-[var(--text-muted)]">
          {active.length} active
        </span>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add todo…"
          className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
        <button
          type="submit"
          className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          title="Add todo (Ctrl+T)"
        >
          <Plus size={16} />
        </button>
      </form>

      <div className="flex-1 overflow-y-auto space-y-1 max-h-[200px]">
        {active.map((todo) => (
          <div key={todo.id} className="group flex items-center gap-2 py-1 px-1 rounded hover:bg-[var(--bg-hover)] transition-colors">
            <button onClick={() => toggleTodo(todo.id)} className="text-[var(--text-muted)] hover:text-[var(--accent)]">
              <Square size={14} />
            </button>
            <span className="flex-1 text-sm">{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-[var(--text-muted)] hover:text-[var(--danger)] opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
        {done.length > 0 && (
          <>
            <div className="border-t border-[var(--border)] my-2" />
            {done.slice(0, 5).map((todo) => (
              <div key={todo.id} className="group flex items-center gap-2 py-1 px-1 rounded hover:bg-[var(--bg-hover)] transition-colors opacity-40">
                <button onClick={() => toggleTodo(todo.id)} className="text-[var(--accent)]">
                  <CheckSquare size={14} />
                </button>
                <span className="flex-1 text-sm line-through">{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-[var(--text-muted)] hover:text-[var(--danger)] opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </>
        )}
        {todos.length === 0 && (
          <p className="text-sm text-[var(--text-muted)] text-center py-4 opacity-50">
            No todos yet
          </p>
        )}
      </div>
    </div>
  );
}
