import inscriptosData from "@/shared/utils/inscriptos.json";
import inscriptosLocalesData from "@/shared/utils/inscriptosLocales.json";

type Inscripto = {
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  telefono: string;
  registrationOptionLabelSnapshot?: string;
};

type TablaInscriptosProps = {
  caption: string;
  inscriptos: Inscripto[];
  mostrarTipoInscripcion?: boolean;
};

const ordenarPorApellido = (personas: Inscripto[]) =>
  [...personas].sort((a, b) =>
    a.apellido.localeCompare(b.apellido, "es", { sensitivity: "base" }),
  );

const inscriptos = ordenarPorApellido(inscriptosData as Inscripto[]);
const inscriptosLocales = ordenarPorApellido(
  inscriptosLocalesData as Inscripto[],
);

function TablaInscriptos({
  caption,
  inscriptos,
  mostrarTipoInscripcion = false,
}: TablaInscriptosProps) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-stone-200 bg-white/95 shadow-[0_20px_70px_-48px_rgba(15,23,42,0.35)]">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm text-stone-700">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-stone-50 text-xs uppercase tracking-[0.14em] text-stone-500">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">Apellido</th>
              <th scope="col" className="px-4 py-3 font-semibold">Nombre</th>
              <th scope="col" className="px-4 py-3 font-semibold">Email</th>
              <th scope="col" className="px-4 py-3 font-semibold">DNI</th>
              <th scope="col" className="px-4 py-3 font-semibold">Teléfono</th>
              {mostrarTipoInscripcion && (
                <th scope="col" className="px-4 py-3 font-semibold">Inscripción</th>
              )}
            </tr>
          </thead>
          <tbody>
            {inscriptos.map((inscripto, index) => (
              <tr
                key={`${inscripto.dni || inscripto.email}-${index}`}
                className="border-t border-stone-200 align-top even:bg-stone-50/50"
              >
                <td className="whitespace-nowrap px-4 py-4 font-medium text-stone-950">
                  {inscripto.apellido}
                </td>
                <td className="whitespace-nowrap px-4 py-4 font-medium text-stone-950">
                  {inscripto.nombre}
                </td>
                <td className="px-4 py-4">
                  {inscripto.email ? (
                    <a
                      href={`mailto:${inscripto.email}`}
                      className="text-emerald-800 underline-offset-4 hover:underline"
                    >
                      {inscripto.email}
                    </a>
                  ) : (
                    <span aria-label="Sin email">—</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-4">
                  {inscripto.dni || "—"}
                </td>
                <td className="whitespace-nowrap px-4 py-4">
                  {inscripto.telefono ? (
                    <a
                      href={`tel:${inscripto.telefono}`}
                      className="text-emerald-800 underline-offset-4 hover:underline"
                    >
                      {inscripto.telefono}
                    </a>
                  ) : (
                    <span aria-label="Sin teléfono">—</span>
                  )}
                </td>
                {mostrarTipoInscripcion && (
                  <td className="min-w-56 px-4 py-4">
                    {inscripto.registrationOptionLabelSnapshot || "—"}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminInscriptosPage() {
  const totalInscriptos = inscriptos.length + inscriptosLocales.length;

  return (
    <section aria-labelledby="inscriptos-heading" className="space-y-10">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Listado aprobado
          </p>
          <h2
            id="inscriptos-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-stone-950"
          >
            Inscriptos
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
            Participantes con su inscripción aprobada para el Congreso Nacional
            de RCP, separados según su procedencia.
          </p>
        </div>

        <div className="grid w-full grid-cols-3 gap-2 sm:w-auto sm:gap-3">
          {[
            { label: "Total", value: totalInscriptos },
            { label: "Web", value: inscriptos.length },
            { label: "Locales", value: inscriptosLocales.length },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3"
            >
              <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                {label}
              </span>
              <span className="mt-1 block text-2xl font-semibold text-emerald-950">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-stone-950">Inscriptos vía web</h3>
          <p className="mt-1 text-sm text-stone-600">
            {inscriptos.length} participantes registrados a través del sitio.
          </p>
        </div>
        <TablaInscriptos
          caption="Listado de inscriptos aprobados a través del sitio web"
          inscriptos={inscriptos}
          mostrarTipoInscripcion
        />
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-stone-950">
            Inscriptos de Trenque Lauquen
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            {inscriptosLocales.length} participantes locales.
          </p>
        </div>
        <TablaInscriptos
          caption="Listado de inscriptos locales de Trenque Lauquen"
          inscriptos={inscriptosLocales}
        />
      </div>
    </section>
  );
}
