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
    <div className="flex flex-col items-center justify-center py-6">
      <time className="text-7xl font-extrabold tracking-tighter text-[var(--accent)] tabular-nums drop-shadow-[0_0_24px_rgba(34,197,94,0.35)]">
        {format(now, "HH:mm:ss")}
      </time>
      <p className="mt-3 text-base font-medium text-[var(--text-muted)]">
        {format(now, "EEEE, MMMM d, yyyy")}
      </p>
      <p className="mt-1 text-xs text-[var(--text-muted)] opacity-50 tracking-wider uppercase">{tz}</p>
    </div>
  );
}
