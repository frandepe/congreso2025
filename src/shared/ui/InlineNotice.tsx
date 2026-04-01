import type { ReactNode } from "react";

type InlineNoticeVariant = "error" | "success" | "info";

type InlineNoticeProps = {
  variant?: InlineNoticeVariant;
  children: ReactNode;
  role?: "status" | "alert";
  ariaLive?: "polite" | "assertive" | "off";
};

const variantClassNames: Record<InlineNoticeVariant, string> = {
  error:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-200",
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-200",
  info:
    "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-100",
};

export function InlineNotice({
  variant = "info",
  children,
  role,
  ariaLive,
}: InlineNoticeProps) {
  return (
    <div
      role={role}
      aria-live={ariaLive}
      className={`rounded-2xl border px-4 py-3 text-sm ${variantClassNames[variant]}`}
    >
      {children}
    </div>
  );
}
