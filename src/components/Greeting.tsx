"use client";

import { useState, useEffect } from "react";
import { useDashStore } from "@/store";
import { getGreeting, getQuote } from "@/lib/quotes";

export default function Greeting() {
  const userName = useDashStore((s) => s.userName);
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setGreeting(getGreeting());
    setQuote(getQuote());
  }, []);

  if (!greeting) return null;

  return (
    <div className="text-center space-y-1">
      <h1 className="text-2xl font-bold">
        {greeting},{" "}
        <span className="text-[var(--accent)]">{userName}</span>.
      </h1>
      <p className="text-sm text-[var(--text-muted)] italic">&ldquo;{quote}&rdquo;</p>
    </div>
  );
}
