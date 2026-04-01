const bankDetails = [
  {
    label: "CBU",
    value: "0140356301670405056738",
  },
  {
    label: "Alias",
    value: "MUNI.567",
  },
  {
    label: "Titularidad",
    value: "MUNICIPALIDAD DE TRENQUE LAUQUEN",
  },
  {
    label: "C.U.I.T",
    value: "33-99906399-9",
  },
  {
    label: "Numero de cuenta",
    value: "6704-50567/3",
  },
];

export function BankTransferDetails() {
  return (
    <section className="space-y-5 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Datos bancarios
        </p>
        <p className="text-base font-medium text-stone-950">
          Realizá la transferencia a esta cuenta antes de subir el comprobante.
        </p>
      </div>

      <dl className="grid gap-4 sm:grid-cols-2">
        {bankDetails.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/80 bg-white/80 px-4 py-3"
          >
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
              {item.label}
            </dt>
            <dd className="mt-1 break-words text-sm font-medium text-stone-950">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
