import type { PublicRegistrationWizardStep } from "@/features/public-registration/public-registration.types";
import { CheckCircle } from "lucide-react";

const stepLabels: Record<PublicRegistrationWizardStep, string> = {
  1: "Datos personales",
  2: "Inscripción",
  3: "Modalidad",
  4: "Comprobante",
};

type PublicRegistrationStepIndicatorProps = {
  currentStep: PublicRegistrationWizardStep;
};

export function PublicRegistrationStepIndicator({
  currentStep,
}: PublicRegistrationStepIndicatorProps) {
  return (
    <div className="border-b border-stone-200 pb-8 dark:border-stone-800">
      <div className="grid gap-4 sm:grid-cols-4">
        {(
          Object.entries(stepLabels) as Array<
            [string, (typeof stepLabels)[PublicRegistrationWizardStep]]
          >
        ).map(([step, label]) => {
          const numericStep = Number(step) as PublicRegistrationWizardStep;
          const isActive = numericStep === currentStep;
          const isCompleted = numericStep < currentStep;

          return (
            <div key={step} className="space-y-3">
              <div
                className={[
                  "h-px w-full transition-colors",
                  isActive
                    ? "bg-stone-900 dark:bg-stone-100"
                    : isCompleted
                      ? "bg-emerald-700 dark:bg-emerald-400"
                      : "bg-stone-200 dark:bg-stone-800",
                ].join(" ")}
              />
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p
                    className={[
                      "text-[11px] font-semibold tracking-[0.22em]",
                      isActive || isCompleted
                        ? "text-stone-900 dark:text-stone-100"
                        : "text-stone-400 dark:text-stone-500",
                    ].join(" ")}
                  >
                    0{step}
                  </p>
                  <p
                    className={[
                      "mt-1 text-sm leading-5",
                      isActive
                        ? "font-semibold text-stone-950 dark:text-stone-50"
                        : isCompleted
                          ? "font-medium text-stone-800 dark:text-stone-200"
                          : "font-medium text-stone-500 dark:text-stone-400",
                    ].join(" ")}
                  >
                    {label}
                  </p>
                </div>
                {isCompleted ? (
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                    <CheckCircle size={15} />
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
