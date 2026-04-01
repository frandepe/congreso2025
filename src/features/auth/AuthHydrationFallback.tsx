import { FeedbackPanel } from "@/shared/ui/FeedbackPanel";

export function AuthHydrationFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 px-6">
      <div className="w-full max-w-md">
        <FeedbackPanel
          variant="loading"
          title="Validando sesion"
          description="Estamos recuperando tu acceso para evitar redirecciones innecesarias."
        />
      </div>
    </div>
  );
}
