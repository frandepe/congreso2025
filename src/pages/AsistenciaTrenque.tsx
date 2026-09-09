import { ArrowUpRight, MapPin } from "lucide-react";

const ATTENDANCE_FORM_URL = "https://forms.gle/kXodCm6NXBwiXcF86";

export function AsistenciaTrenque() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f3f5ef] px-6 py-14 text-primary dark:bg-background sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-secondary/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="max-w-xl">
          <div className="mb-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] text-lightGreen">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-white">
              <MapPin className="size-4" aria-hidden="true" />
            </span>
            <span>2° Congreso Nacional de RCP</span>
          </div>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Trenque Lauquen,
            <span className="block text-lightGreen">te esperamos.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-700 dark:text-slate-300 sm:text-xl">
            Si sos de Trenque Lauquen y vas a participar del Congreso Nacional
            de RCP, confirmá tu asistencia completando un breve formulario.
          </p>

          <div className="mt-9">
            <a
              href={ATTENDANCE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-secondary px-7 py-4 text-center text-base font-bold text-white shadow-lg shadow-secondary/20 transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-redOrange hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30 sm:w-auto sm:text-lg motion-reduce:transform-none motion-reduce:transition-none"
            >
              Confirmar mi asistencia
              <ArrowUpRight
                className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                aria-hidden="true"
              />
            </a>
            <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-400">
              Te va a llevar menos de un minuto.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-3xl lg:mx-0">
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 h-full w-full rounded-[1.75rem] bg-primary sm:-bottom-6 sm:-left-6"
          />
          <figure className="relative overflow-hidden rounded-[1.75rem] border-4 border-white bg-white shadow-2xl shadow-primary/15 dark:border-slate-800 dark:bg-slate-800">
            <img
              src="/assets/trenque-banner.png"
              alt="Acceso a la ciudad de Trenque Lauquen"
              width={843}
              height={352}
              className="h-auto w-full object-contain"
            />
            <figcaption className="flex items-center gap-2 border-t border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white">
              <MapPin className="size-4 text-secondary" aria-hidden="true" />
              Trenque Lauquen, Buenos Aires
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
