import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

type PublicRegistrationWizardActionsProps = {
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting: boolean;
  onBack: () => void;
};

export function PublicRegistrationWizardActions({
  isFirstStep,
  isLastStep,
  isSubmitting,
  onBack,
}: PublicRegistrationWizardActionsProps) {
  return (
    <div className="mx-auto max-w-[720px] border-t border-stone-200 pt-8 sm:pt-10">
      <div className="flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          disabled={isFirstStep || isSubmitting}
          onClick={onBack}
          className="rounded-md border-stone-300 bg-white px-5 text-stone-700"
        >
          Volver
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isLastStep ? (
            isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar inscripción"
            )
          ) : (
            "Continuar"
          )}
        </Button>
      </div>
    </div>
  );
}
