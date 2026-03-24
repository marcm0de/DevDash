"use client";

import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Snowflake, CloudLightning, Wind } from "lucide-react";

interface WeatherData {
  temp: number;
  condition: string;
  city: string;
  humidity: number;
  wind: number;
}

// Placeholder weather data — in production, connect to a real API
const PLACEHOLDER_WEATHER: WeatherData = {
  temp: 72,
  condition: "Partly Cloudy",
  city: "New York",
  humidity: 55,
  wind: 8,
};

function getWeatherIcon(condition: string) {
  const c = condition.toLowerCase();
  if (c.includes("rain") || c.includes("drizzle")) return CloudRain;
  if (c.includes("snow")) return Snowflake;
  if (c.includes("thunder") || c.includes("storm")) return CloudLightning;
  if (c.includes("clear") || c.includes("sunny")) return Sun;
  if (c.includes("wind")) return Wind;
  return Cloud;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Simulate fetching weather data
    // TODO: Connect to real weather API (e.g., Open-Meteo, wttr.in)
    const timer = setTimeout(() => {
      setWeather(PLACEHOLDER_WEATHER);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!weather) {
    return (
      <div className="flex items-center gap-3 animate-pulse">
        <div className="w-10 h-10 rounded-lg bg-[var(--border)]" />
        <div className="space-y-1">
          <div className="h-4 w-16 rounded bg-[var(--border)]" />
          <div className="h-3 w-24 rounded bg-[var(--border)]" />
        </div>
      </div>
    );
  }

  const Icon = getWeatherIcon(weather.condition);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Cloud size={14} className="text-[var(--text-muted)]" />
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Weather
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="p-2.5 rounded-xl bg-[var(--accent)]/10">
          <Icon size={24} className="text-[var(--accent)]" />
        </div>
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[var(--text)]">{weather.temp}°</span>
            <span className="text-xs text-[var(--text-muted)]">F</span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">{weather.condition}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-[var(--text-muted)]">💧 {weather.humidity}%</p>
          <p className="text-xs text-[var(--text-muted)]">💨 {weather.wind} mph</p>
        </div>
      </div>
      <p className="text-[10px] text-[var(--text-muted)] opacity-50">
        📍 {weather.city} · Placeholder data — connect your weather API
      </p>
    </div>
  );
}
