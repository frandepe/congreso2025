// import { Link } from "react-router-dom";
import { ArrowRight, FileSearch, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { PricingCard } from "@/components/ui/pricing-card";

// const DEMO_TIERS = [
//   {
//     name: "Un solo dia",
//     price: {
//       unic: "5.000",
//     },
//     description: "Unase al congreso de Instructores de RCP",
//     features: [
//       "Acceso completo al congreso por un dia",
//       "Incluye programa y credencial",
//       "Desayuno y refrigerios",
//       "Uso de instalaciones",
//     ],
//     redirect: "https://forms.gle/QvYcTU28Qs3YEcRQ6",
//     cta: "Inscribirse",
//   },
//   {
//     name: "Tres dias sin alojamiento",
//     price: {
//       unic: "15.000",
//     },
//     description: "Unase al congreso de Instructores de RCP",
//     features: [
//       "Acceso completo durante los 3 dias",
//       "Incluye programa y credencial",
//       "Desayuno diario y refrigerios",
//       "Uso de instalaciones",
//     ],
//     redirect: "https://forms.gle/SUugngtLudHCXD7M8",
//     cta: "Inscribirse",
//   },
//   {
//     name: "Tres dias con alojamiento (dormitorios compartidos)",
//     price: {
//       unic: "30.000",
//     },
//     description: "Accede a la experiencia completa del Congreso",
//     features: [
//       "Todo lo incluido en el plan anterior",
//       "Alojamiento limpio y comodo en dormitorios compartidos",
//       "Disponible desde el dia anterior al congreso (4 noches)",
//       "Cupos limitados a 70 personas",
//     ],
//     redirect: "https://forms.gle/TJTWvP7sP33L4gK99",
//     cta: "Inscribirse",
//     highlighted: true,
//     popular: true,
//   },
// ];

export function PricingCardDemo() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold text-stone-950">
          Opciones de inscripción
        </h2>
        <p className="mt-4 text-base leading-7 text-stone-600">
          Si vas a inscribirte por primera vez o consultar tu estado, entrá a la
          pagina principal de inscripcion. Si ya pagaste la primera cuota y
          querés informar la segunda, usá la pantalla especifica de segunda
          cuota.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="relative overflow-hidden rounded-[32px] border border-stone-200 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(241,245,249,0.96))] p-8 shadow-[0_26px_80px_-52px_rgba(15,23,42,0.35)]">
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-100/70 blur-3xl"
          />
          <div className="relative">
            <div className="inline-flex rounded-2xl bg-emerald-50 p-3 text-emerald-700">
              <FileSearch className="h-6 w-6" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
              Opcion recomendada
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">
              Inscribirme o consultar mi estado
            </h3>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Entrá acá si todaváa no hiciste tu inscripción o si querés revisar
              el estado de una solicitud ya enviada con tu código de
              seguimiento.
            </p>

            <div className="mt-6 space-y-3 text-sm text-stone-700">
              <p className="rounded-2xl bg-white/90 px-4 py-3">
                Para inscripción inicial
              </p>
              <p className="rounded-2xl bg-white/90 px-4 py-3">
                Para consultar estado de seguimiento
              </p>
              <p className="rounded-2xl bg-white/90 px-4 py-3">
                Para recuperar tu código por email
              </p>
            </div>

            {/* <Button asChild className="mt-8 h-12 rounded-xl px-6 text-sm">
              <Link to="/inscripcion/participantes">
                Ir a inscripcion
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button> */}
            <Button className="mt-8 h-12 rounded-xl px-6 text-sm" disabled>
              Ir a inscripcion (próximamente)
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[32px] border border-stone-200 bg-[linear-gradient(145deg,rgba(255,251,235,0.98),rgba(255,255,255,0.96))] p-8 shadow-[0_26px_80px_-52px_rgba(15,23,42,0.35)]">
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 h-32 w-32 rounded-full bg-amber-100/70 blur-3xl"
          />
          <div className="relative">
            <div className="inline-flex rounded-2xl bg-amber-50 p-3 text-amber-700">
              <ReceiptText className="h-6 w-6" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
              Solo si ya pagaste la primera
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">
              Informar segunda cuota
            </h3>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Usá esta pantalla únicamente si tu inscripción fue en 2 cuotas y
              ahora necesitas cargar el comprobante del segundo pago.
            </p>

            <div className="mt-6 space-y-3 text-sm text-stone-700">
              <p className="rounded-2xl bg-white/90 px-4 py-3">
                Necesitás tu código de seguimiento
              </p>
              <p className="rounded-2xl bg-white/90 px-4 py-3">
                Solo aplica a inscripciones en 2 cuotas
              </p>
              <p className="rounded-2xl bg-white/90 px-4 py-3">
                No usar para inscripción inicial
              </p>
            </div>

            <Button
              variant="outline"
              className="mt-8 h-12 rounded-xl border-stone-300 bg-white px-6 text-sm text-stone-900"
              disabled
            >
              Ir a segunda cuota (próximamente)
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            {/* <Button
              asChild
              variant="outline"
              className="mt-8 h-12 rounded-xl border-stone-300 bg-white px-6 text-sm text-stone-900"
            >
              <Link to="/inscripcion/segunda-cuota">
                Ir a segunda cuota
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button> */}
          </div>
        </section>
      </div>

      {/* <div className="grid gap-6 p-6 md:grid-cols-3 container">
        {DEMO_TIERS.map((tier) => (
          <PricingCard key={tier.name} tier={tier} paymentFrequency="unic" />
        ))}
      </div> */}
    </div>
  );
}
