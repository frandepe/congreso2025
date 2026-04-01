import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type FeedbackPanelVariant =
  | "loading"
  | "error"
  | "empty"
  | "success"
  | "info";

type FeedbackPanelProps = {
  variant?: FeedbackPanelVariant;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  children?: ReactNode;
  className?: string;
  role?: "status" | "alert" | "region";
  ariaLive?: "polite" | "assertive" | "off";
  titleId?: string;
};

const variantClassNames: Record<FeedbackPanelVariant, string> = {
  loading: "border-stone-300 bg-white text-stone-700",
  error: "border-red-200 bg-red-50 text-red-700",
  empty: "border-stone-300 bg-white text-stone-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  info: "border-amber-200 bg-amber-50 text-amber-900",
};

export function FeedbackPanel({
  variant = "info",
  title,
  description,
  actionLabel,
  onAction,
  children,
  className = "",
  role,
  ariaLive,
  titleId,
}: FeedbackPanelProps) {
  return (
    <section
      role={role}
      aria-live={ariaLive}
      aria-labelledby={titleId}
      className={`rounded-3xl border p-6 shadow-sm ${variantClassNames[variant]} ${className}`.trim()}
    >
      <p id={titleId} className="text-sm font-semibold">
        {title}
      </p>
      {description ? (
        <p className="mt-2 text-sm leading-6 opacity-90">{description}</p>
      ) : null}
      {children ? <div className="mt-4">{children}</div> : null}
      {actionLabel && onAction ? (
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      ) : null}
    </section>
  );
}
