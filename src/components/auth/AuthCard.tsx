import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import logoAsset from "@/assets/nippon-tours-logo.png";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen place-items-center bg-secondary px-4 py-16">
      <div className="w-full max-w-md rounded-3xl bg-card p-8 shadow-xl">
        <Link to="/" className="mb-8 flex items-center justify-center gap-3">
          <img src={logoAsset} alt="Nippon Tours" className="h-14 w-14 object-contain" />
        </Link>
        <h1 className="text-center font-display text-2xl font-semibold">{title}</h1>
        {subtitle && <p className="mt-2 text-center text-sm text-muted-foreground">{subtitle}</p>}
        <div className="mt-8">{children}</div>
        {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
        <p className="mt-6 text-center text-xs">
          <Link to="/" className="text-muted-foreground hover:text-accent">← Back to nippon-tours.com</Link>
        </p>
      </div>
    </div>
  );
}

export const inputCls =
  "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30";
export const labelCls = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground";
