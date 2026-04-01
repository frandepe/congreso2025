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
    <div className="border-b border-stone-200 pb-8">
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
                    ? "bg-stone-900"
                    : isCompleted
                      ? "bg-emerald-700"
                      : "bg-stone-200",
                ].join(" ")}
              />
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p
                    className={[
                      "text-[11px] font-semibold tracking-[0.22em]",
                      isActive || isCompleted
                        ? "text-stone-900"
                        : "text-stone-400",
                    ].join(" ")}
                  >
                    0{step}
                  </p>
                  <p
                    className={[
                      "mt-1 text-sm leading-5",
                      isActive
                        ? "font-semibold text-stone-950"
                        : isCompleted
                          ? "font-medium text-stone-800"
                          : "font-medium text-stone-500",
                    ].join(" ")}
                  >
                    {label}
                  </p>
                </div>
                {isCompleted ? (
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
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
