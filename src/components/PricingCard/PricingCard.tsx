import { Link } from "react-router-dom";
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
          Inscripción y segunda cuota
        </h2>
      </div>

      <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2">
        <section className="relative flex h-full flex-col overflow-hidden rounded-[32px] border border-emerald-200 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(236,253,245,0.92))] p-8 shadow-[0_26px_80px_-52px_rgba(6,78,59,0.4)]">
          <div
            aria-hidden="true"
            className="absolute -right-8 -top-8 h-44 w-44 rounded-full bg-emerald-200/70 blur-3xl"
          />

          <div className="relative flex h-full flex-col">
            <div className="inline-flex w-fit rounded-2xl bg-emerald-100 p-3 text-emerald-700">
              <FileSearch className="h-6 w-6" />
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.26em] text-emerald-700">
              Opción recomendada
            </p>

            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950">
              Inscripción al congreso
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              Completá tus datos, elegí la modalidad y cargá el comprobante para
              iniciar tu inscripción.
            </p>

            <div className="mt-7 divide-y divide-emerald-100 rounded-2xl border border-emerald-100 bg-white/85 text-sm shadow-sm">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-stone-700">1 día</span>
                <strong className="text-stone-950">$15.000</strong>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-stone-700">3 días</span>
                <strong className="text-stone-950">$40.000</strong>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-stone-700">3 días con alojamiento</span>
                <strong className="text-stone-950">$70.000</strong>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <Button asChild className="h-12 rounded-xl px-7 text-sm">
                <Link to="/inscripcion/participantes">
                  Inscribirme
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="relative flex h-full flex-col overflow-hidden rounded-[32px] border border-amber-200/80 bg-[linear-gradient(145deg,rgba(255,251,235,0.96),rgba(255,255,255,0.94))] p-8 shadow-[0_26px_80px_-58px_rgba(120,53,15,0.35)]">
          <div
            aria-hidden="true"
            className="absolute -left-8 -top-8 h-44 w-44 rounded-full bg-amber-200/60 blur-3xl"
          />

          <div className="relative flex h-full flex-col">
            <div className="inline-flex w-fit rounded-2xl bg-amber-100 p-3 text-amber-700">
              <ReceiptText className="h-6 w-6" />
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.26em] text-amber-700">
              Solo si ya te inscribiste
            </p>

            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950">
              Cargar segunda cuota
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              Usá esta opción únicamente si ya hiciste la inscripción inicial y
              elegiste pagar en 2 cuotas.
            </p>

            <div className="mt-7 rounded-2xl border border-amber-100 bg-white/75 p-4 text-sm">
              <p className="font-medium text-stone-800">Vas a necesitar:</p>

              <ul className="mt-3 space-y-2 text-stone-600">
                <li>
                  • Código de seguimiento{" "}
                  <span className="text-xs">
                    (lo recibiste por email al completar tu inscripción)
                  </span>
                </li>
                <li>• Comprobante del segundo pago</li>
                <li>• El mismo email de la inscripción</li>
              </ul>
            </div>

            <div className="mt-auto pt-8">
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-xl border-amber-200 bg-white/80 px-7 text-sm text-stone-900 hover:bg-amber-50"
              >
                <Link to="/inscripcion/segunda-cuota">
                  Informar segunda cuota
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <p className="mt-4 text-xs leading-6 text-stone-500">
                No uses esta opción para iniciar una inscripción nueva.
              </p>
            </div>
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
