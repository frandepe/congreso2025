import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  ClipboardCheck,
  Loader,
  Send,
  Store,
  UsersRound,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateSponsorshipContactMutation } from "@/features/sponsorship-contact/sponsorship-contact.hooks";
import { InlineNotice } from "@/shared/ui/InlineNotice";
import { getUserFacingErrorMessage } from "@/shared/utils/getUserFacingErrorMessage";

const schema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, "Ingresá el nombre de la empresa o institución.")
    .max(120, "Usá hasta 120 caracteres."),
  contactName: z
    .string()
    .trim()
    .min(1, "Ingresá el nombre de la persona de contacto.")
    .max(120, "Usá hasta 120 caracteres."),
  email: z
    .string()
    .trim()
    .email("Ingresá un email válido.")
    .max(160, "Usá hasta 160 caracteres."),
  phone: z.string().trim().max(60, "Usá hasta 60 caracteres."),
  message: z.string().trim().max(1200, "Usá hasta 1200 caracteres."),
  website: z.string().max(0),
});

type FormValues = z.infer<typeof schema>;

const fieldClassName =
  "h-12 rounded-md border-stone-300 px-4 text-sm shadow-none focus-visible:ring-emerald-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500";
const textareaClassName =
  "min-h-[130px] rounded-md border-stone-300 px-4 py-3 text-sm shadow-none focus-visible:ring-emerald-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500";

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm text-red-600 dark:text-red-300">{message}</p>;
}

export function SponsorshipContactPage() {
  const createMutation = useCreateSponsorshipContactMutation();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await createMutation.mutateAsync({
        companyName: values.companyName,
        contactName: values.contactName,
        email: values.email,
        phone: values.phone || undefined,
        message: values.message || undefined,
        website: values.website,
      });
      form.reset();
    } catch {
      // The mutation state renders the user-facing error below.
    }
  });

  const errorMessage = createMutation.error
    ? getUserFacingErrorMessage(
        createMutation.error,
        "No se pudo enviar la consulta. Intentá nuevamente en unos minutos.",
      )
    : null;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:px-12 lg:py-20">
        <div className="space-y-8 lg:sticky lg:top-10 lg:self-start">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700 dark:text-emerald-300">
              Espacios para empresas e instituciones
            </p>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl dark:text-stone-100">
              ¿Querés participar con un stand?
            </h1>
            <p className="max-w-xl text-base leading-7 text-stone-600 dark:text-stone-400">
              Presentá tu empresa, institución, productos o servicios y formá
              parte del espacio de expositores del Congreso Nacional de RCP.
              Consultanos por disponibilidad y alternativas para participar.
            </p>
          </div>

          <div className="grid gap-3 text-sm text-stone-700 dark:text-stone-300">
            <div className="flex gap-3 rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
              <Store className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <h2 className="font-semibold text-stone-950 dark:text-stone-100">
                  Mostrá lo que hacés
                </h2>
                <p className="mt-1 leading-6">
                  Presentá productos, servicios o tu propuesta institucional
                  durante el Congreso.
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
              <UsersRound className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <h2 className="font-semibold text-stone-950 dark:text-stone-100">
                  Conectá con el sector
                </h2>
                <p className="mt-1 leading-6">
                  Acercate a profesionales, instructores, instituciones y
                  organizaciones vinculadas a la emergencia y la RCP.
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
              <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <h2 className="font-semibold text-stone-950 dark:text-stone-100">
                  Encontrá la opción adecuada
                </h2>
                <p className="mt-1 leading-6">
                  Contanos qué necesitás y te asesoramos sobre disponibilidad y
                  alternativas de participación.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white px-5 py-7 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.22)] sm:px-8 lg:px-10 dark:border-stone-800 dark:bg-stone-900">
          {createMutation.isSuccess ? (
            <div
              role="status"
              aria-live="polite"
              className="flex flex-col gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100"
            >
              <CheckCircle2 className="h-8 w-8" />
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                  ¡Gracias por contactarnos!
                </h2>
                <p className="text-sm leading-6">
                  Recibimos tus datos. Desde la organización del Congreso nos
                  vamos a comunicar con vos para contarte las opciones
                  disponibles y ayudarte a encontrar la alternativa más
                  adecuada.
                </p>
              </div>
            </div>
          ) : null}

          <form className="mt-6 space-y-6 first:mt-0" onSubmit={onSubmit}>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-100">
                Hablemos de tu participación
              </h2>
              <p className="text-sm leading-6 text-stone-600 dark:text-stone-400">
                Dejanos tus datos y nos comunicaremos para contarte las opciones
                disponibles y responder tus consultas.
              </p>
            </div>

            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
              {...form.register("website")}
            />

            <div className="space-y-2">
              <Label htmlFor="companyName">Empresa o institución *</Label>
              <Input
                id="companyName"
                placeholder="Nombre de la organización"
                className={fieldClassName}
                aria-invalid={Boolean(form.formState.errors.companyName)}
                {...form.register("companyName")}
              />
              <FieldError message={form.formState.errors.companyName?.message} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactName">Persona de contacto *</Label>
              <Input
                id="contactName"
                placeholder="Nombre y apellido"
                className={fieldClassName}
                aria-invalid={Boolean(form.formState.errors.contactName)}
                {...form.register("contactName")}
              />
              <FieldError message={form.formState.errors.contactName?.message} />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contacto@empresa.com"
                  className={fieldClassName}
                  aria-invalid={Boolean(form.formState.errors.email)}
                  {...form.register("email")}
                />
                <FieldError message={form.formState.errors.email?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono / WhatsApp</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Número de contacto"
                  className={fieldClassName}
                  aria-invalid={Boolean(form.formState.errors.phone)}
                  {...form.register("phone")}
                />
                <FieldError message={form.formState.errors.phone?.message} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mensaje o consulta</Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Contanos si querés consultar por disponibilidad, tipo de espacio o alguna necesidad puntual"
                className={textareaClassName}
                aria-invalid={Boolean(form.formState.errors.message)}
                {...form.register("message")}
              />
              <FieldError message={form.formState.errors.message?.message} />
            </div>

            {errorMessage ? (
              <InlineNotice variant="error" role="alert" ariaLive="assertive">
                {errorMessage}
              </InlineNotice>
            ) : null}

            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="h-12 w-full justify-center gap-2 rounded-xl bg-stone-950 px-5 text-sm font-medium text-white hover:bg-stone-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              {createMutation.isPending ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  Enviando consulta
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Quiero recibir información
                </>
              )}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
