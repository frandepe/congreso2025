import type { ReactNode } from "react";

type InlineNoticeVariant = "error" | "success" | "info";

type InlineNoticeProps = {
  variant?: InlineNoticeVariant;
  children: ReactNode;
  role?: "status" | "alert";
  ariaLive?: "polite" | "assertive" | "off";
};

const variantClassNames: Record<InlineNoticeVariant, string> = {
  error: "border-red-200 bg-red-50 text-red-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  info: "border-amber-200 bg-amber-50 text-amber-900",
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
