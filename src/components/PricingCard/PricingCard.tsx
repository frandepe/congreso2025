import { PricingCard } from "@/components/ui/pricing-card";

const DEMO_TIERS = [
  {
    name: "Gratis",
    price: {
      unic: 0,
    },
    description: "Únase al Congreso de Primeros Auxilios",
    features: [
      "3 o 4 caracteristicas de la inscripción gratuita",
      "Se puede sumar todos los checks que quieras",
      "24/7 support",
    ],
    cta: "Inscribirse",
  },
  {
    name: "Vip",
    price: {
      unic: 15000,
    },
    description: "Accede a la Experiencia Completa del Congreso",
    features: [
      "3 o 4 caracteristicas de la inscripcion paga",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
    cta: "Inscribirse",
    highlighted: true,
    popular: true,
  },
];

export function PricingCardDemo() {
  return (
    <div className="grid gap-6 p-6 md:grid-cols-2 container">
      {DEMO_TIERS.map((tier) => (
        <PricingCard key={tier.name} tier={tier} paymentFrequency="unic" />
      ))}
    </div>
  );
}
