type PaymentPlanCardProps = {
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
};

export function PaymentPlanCard({
  title,
  description,
  selected,
  onSelect,
}: PaymentPlanCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "w-full border px-6 py-6 text-left transition-colors",
        "rounded-xl",
        selected
          ? "border-emerald-900 bg-emerald-900 text-white dark:border-emerald-500 dark:bg-emerald-950"
          : "border-stone-200 bg-white text-stone-900 hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-stone-600",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-xl font-semibold leading-tight">{title}</h3>
          <p
            className={[
              "mt-3 max-w-2xl text-sm leading-6",
              selected
                ? "text-emerald-100"
                : "text-stone-600 dark:text-stone-400",
            ].join(" ")}
          >
            {description}
          </p>
        </div>

        <span
          className={[
            "mt-1 h-3.5 w-3.5 rounded-full border",
            selected
              ? "border-white bg-white"
              : "border-stone-300 bg-transparent dark:border-stone-600",
          ].join(" ")}
        />
      </div>
    </button>
  );
}
