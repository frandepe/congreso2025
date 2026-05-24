const visibleChipLabels = [
  "Inscripción",
  "Precios",
  "Alojamiento",
  "Segunda cuota",
  "Programa",
  "Stands",
  "Publicidad",
  "Contacto",
];

type HelpChatbotChipsProps = {
  onSelect: (label: string) => void;
};

export function HelpChatbotChips({ onSelect }: HelpChatbotChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 pb-3 sm:flex-wrap sm:overflow-visible">
      {visibleChipLabels.map((label) => (
        <button
          key={label}
          type="button"
          aria-label={`Consultar sobre ${label}`}
          onClick={() => onSelect(label)}
          className="min-h-9 shrink-0 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/50"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
