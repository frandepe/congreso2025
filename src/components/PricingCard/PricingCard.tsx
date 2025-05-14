import { PricingCard } from "@/components/ui/pricing-card";

const DEMO_TIERS = [
  {
    name: "Un solo día",
    price: {
      unic: "5.000",
    },
    description: "Únase al congreso de Instructores de RCP",
    features: [
      "Acceso completo al congreso por un día",
      "Incluye programa y credencial",
      "Desayuno y refrigerios",
      "Uso de instalaciones",
    ],
    redirect: "https://forms.gle/bGpzXueC3CvU8uVZ7",
    cta: "Inscribirse",
  },
  {
    name: "Tres días sin alojamiento",
    price: {
      unic: "15.000",
    },
    description: "Únase al congreso de Instructores de RCP",
    features: [
      "Acceso completo durante los 3 días",
      "Incluye programa y credencial",
      "Desayuno diario y refrigerios",
      "Uso de instalaciones",
    ],
    redirect: "https://forms.gle/SUugngtLudHCXD7M8",
    cta: "Inscribirse",
  },
  {
    name: "Tres días con alojamiento (dormitorios compartidos)",
    price: {
      unic: "30.000",
    },
    description: "Accede a la Experiencia Completa del Congreso",
    features: [
      "Todo lo incluido en el plan anterior",
      "Alojamiento limpio y cómodo en dormitorios compartidos",
      "Disponible desde el día anterior al congreso (4 noches)",
      "🎟️ Cupos limitados a 70 personas",
    ],
    redirect: "https://forms.gle/YcAAUcLJNr165PQS6",
    cta: "Inscribirse",
    highlighted: true,
    popular: true,
  },
];

export function PricingCardDemo() {
  return (
    <div>
      <h2 className="text-4xl text-center font-bold">
        Opciones de inscripción
      </h2>
      <div className="grid gap-6 p-6 md:grid-cols-3 container">
        {DEMO_TIERS.map((tier) => (
          <PricingCard key={tier.name} tier={tier} paymentFrequency="unic" />
        ))}
      </div>
    </div>
  );
}
