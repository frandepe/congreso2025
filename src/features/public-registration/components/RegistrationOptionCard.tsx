type RegistrationOptionCardProps = {
  title: string;
  price: string;
  priceDetail?: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
};

export function RegistrationOptionCard({
  title,
  price,
  priceDetail,
  description,
  selected,
  onSelect,
}: RegistrationOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "w-full border px-6 py-6 text-left transition-colors",
        "rounded-xl",
        selected
          ? "border-stone-900 bg-stone-900 text-white"
          : "border-stone-200 bg-white text-stone-900 hover:border-stone-400",
      ].join(" ")}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-xl font-semibold leading-tight">{title}</h3>
          <p
            className={[
              "mt-3 max-w-2xl text-sm leading-6",
              selected ? "text-stone-300" : "text-stone-600",
            ].join(" ")}
          >
            {description}
          </p>
        </div>

        <div className="flex items-center gap-4 sm:pl-6">
          <p
            className={[
              "text-sm font-semibold tracking-[0.08em]",
              selected ? "text-white" : "text-stone-900",
            ].join(" ")}
          >
            {price}
          </p>
          {priceDetail ? (
            <p
              className={[
                "text-xs",
                selected ? "text-stone-300" : "text-stone-500",
              ].join(" ")}
            >
              {priceDetail}
            </p>
          ) : null}
          <span
            className={[
              "h-3.5 w-3.5 rounded-full border",
              selected
                ? "border-white bg-white"
                : "border-stone-300 bg-transparent",
            ].join(" ")}
          />
        </div>
      </div>
    </button>
  );
}
