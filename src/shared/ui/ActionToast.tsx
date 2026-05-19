import { useEffect } from "react";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ActionToastVariant = "success" | "error" | "info";

export type ActionToastMessage = {
  variant: ActionToastVariant;
  title: string;
  description: string;
};

type ActionToastProps = ActionToastMessage & {
  onClose: () => void;
  durationMs?: number;
};

const variantClassNames: Record<ActionToastVariant, string> = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-950",
  error: "border-red-200 bg-red-50 text-red-950",
  info: "border-amber-200 bg-amber-50 text-amber-950",
};

const iconClassNames: Record<ActionToastVariant, string> = {
  success: "text-emerald-700",
  error: "text-red-700",
  info: "text-amber-700",
};

function ToastIcon({ variant }: { variant: ActionToastVariant }) {
  const className = `mt-0.5 h-5 w-5 shrink-0 ${iconClassNames[variant]}`;

  if (variant === "success") {
    return <CheckCircle2 aria-hidden="true" className={className} />;
  }

  if (variant === "error") {
    return <XCircle aria-hidden="true" className={className} />;
  }

  return <Info aria-hidden="true" className={className} />;
}

export function ActionToast({
  variant,
  title,
  description,
  onClose,
  durationMs = 7000,
}: ActionToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, durationMs);

    return () => window.clearTimeout(timer);
  }, [durationMs, onClose, title, description, variant]);

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={`fixed bottom-5 right-5 z-50 flex w-[min(420px,calc(100vw-2.5rem))] gap-3 rounded-lg border p-4 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.45)] ${variantClassNames[variant]}`}
    >
      <ToastIcon variant={variant} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-sm leading-5 opacity-85">{description}</p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0 rounded-full text-current hover:bg-black/5 hover:text-current"
        onClick={onClose}
      >
        <X aria-hidden="true" className="h-4 w-4" />
        <span className="sr-only">Cerrar notificacion</span>
      </Button>
    </div>
  );
}
