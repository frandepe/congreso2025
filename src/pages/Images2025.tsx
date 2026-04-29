import ImageReveal from "@/components/Images2025/Comienzos";
import { ImageGallery } from "@/components/Images2025/Gallery";
import React from "react";

const Images2025 = () => {
  return (
    <section className="w-full bg-white text-stone-900 dark:bg-stone-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-4 py-24">
        {/* BLOQUE 1 */}
        <div className="flex flex-col items-center text-center">
          <span className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400">
            Enero 2025
          </span>

          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Todo comenzó así...
          </h2>

          <p className="mt-4 max-w-xl text-sm text-stone-600 dark:text-stone-400">
            Primeras pruebas, mucho esfuerzo e ilusión por hacerlo bien.
          </p>

          <div className="mt-12">
            <ImageReveal
              leftImage="https://res.cloudinary.com/dygsjthl9/image/upload/v1777485707/IMG-20251021-WA0012_wvbewl.jpg"
              middleImage="https://res.cloudinary.com/dygsjthl9/image/upload/v1777485527/IMG-20251021-WA0042_rhfima.jpg"
              rightImage="https://res.cloudinary.com/dygsjthl9/image/upload/v1777485599/IMG-20251106-WA0021_lgfq0l.jpg"
            />
          </div>
        </div>

        {/* SEPARADOR */}
        <div className="my-24 h-px w-full bg-gradient-to-r from-transparent via-stone-300 to-transparent dark:via-stone-700" />

        {/* BLOQUE 2 */}
        <div className="flex flex-col items-center text-center">
          <span className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400">
            Desarrollo
          </span>

          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            ...y así seguimos
          </h2>

          <p className="mt-4 max-w-xl text-sm text-stone-600 dark:text-stone-400">
            Crecimos en equipo y en la forma de encarar cada proyecto.
          </p>

          <div className="mt-16 w-full">
            <ImageGallery />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Images2025;
