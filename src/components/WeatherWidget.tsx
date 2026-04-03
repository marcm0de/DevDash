"use client";

import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Snowflake, CloudLightning, Wind, RefreshCw, MapPin } from "lucide-react";

interface WeatherData {
  temp: number;
  feelsLike: number;
  condition: string;
  city: string;
  humidity: number;
  wind: number;
  high: number;
  low: number;
}

function getWeatherIcon(condition: string) {
  const c = condition.toLowerCase();
  if (c.includes("rain") || c.includes("drizzle") || c.includes("shower")) return CloudRain;
  if (c.includes("snow") || c.includes("blizzard") || c.includes("sleet")) return Snowflake;
  if (c.includes("thunder") || c.includes("storm")) return CloudLightning;
  if (c.includes("clear") || c.includes("sunny")) return Sun;
  if (c.includes("wind") || c.includes("gale")) return Wind;
  return Cloud;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://wttr.in/?format=j1", { signal: AbortSignal.timeout(5000) });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const current = data.current_condition?.[0];
      const area = data.nearest_area?.[0];
      const todayAstro = data.weather?.[0];

      if (current) {
        setWeather({
          temp: parseInt(current.temp_F) || 0,
          feelsLike: parseInt(current.FeelsLikeF) || 0,
          condition: current.weatherDesc?.[0]?.value || "Unknown",
          city: area?.areaName?.[0]?.value || "Unknown",
          humidity: parseInt(current.humidity) || 0,
          wind: parseInt(current.windspeedMiles) || 0,
          high: parseInt(todayAstro?.maxtempF) || 0,
          low: parseInt(todayAstro?.mintempF) || 0,
        });
      }
    } catch {
      setError("Could not fetch weather");
      // Fallback to placeholder
      setWeather({
        temp: 72, feelsLike: 70, condition: "Partly Cloudy",
        city: "New York", humidity: 55, wind: 8, high: 78, low: 62,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) {
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

  if (!weather) return null;

  const Icon = getWeatherIcon(weather.condition);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Cloud size={14} className="text-[var(--text-muted)]" />
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Weather
        </h2>
        <button
          onClick={fetchWeather}
          className="ml-auto text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          title="Refresh"
        >
          <RefreshCw size={12} />
        </button>
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
        <div className="ml-auto text-right space-y-0.5">
          <p className="text-xs text-[var(--text-muted)]">🌡 Feels {weather.feelsLike}°</p>
          <p className="text-xs text-[var(--text-muted)]">💧 {weather.humidity}%</p>
          <p className="text-xs text-[var(--text-muted)]">💨 {weather.wind} mph</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
        <span className="flex items-center gap-1">
          <MapPin size={10} /> {weather.city}
        </span>
        <span>
          H: {weather.high}° · L: {weather.low}°
        </span>
      </div>
      {error && (
        <p className="text-[10px] text-[var(--text-muted)] opacity-50">
          ⚠️ {error} — showing fallback data
        </p>
      )}
    </div>
  );
}
