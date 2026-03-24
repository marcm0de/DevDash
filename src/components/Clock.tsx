"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <div className="h-[120px]" />;

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <time className="text-5xl font-bold tracking-tight text-[var(--accent)] tabular-nums">
        {format(now, "HH:mm:ss")}
      </time>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        {format(now, "EEEE, MMMM d, yyyy")}
      </p>
      <p className="text-xs text-[var(--text-muted)] opacity-60">{tz}</p>
    </div>
  );
}
