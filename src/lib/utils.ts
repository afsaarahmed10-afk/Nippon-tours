import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a JPY amount as e.g. "¥350,000". Non-finite input returns "¥—". */
export function formatJPY(value: number | string | null | undefined): string {
  const n = typeof value === "string" ? Number(value) : value;
  if (n == null || !Number.isFinite(n)) return "¥—";
  return `¥${Math.round(n).toLocaleString("en-US")}`;
}
