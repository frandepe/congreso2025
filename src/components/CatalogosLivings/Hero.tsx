import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";

const WHATSAPP_URL =
  "https://wa.me/5492392460227?text=Hola,%20quiero%20consultar%20por%20livings%20y%20equipamiento%20para%20mi%20stand.";

export default function HeroCatalogsLivings() {
  return (
    <section className="w-full border-b border-stone-200/70 bg-gradient-to-b from-white to-stone-50 dark:border-stone-800 dark:from-stone-950 dark:to-stone-900/70">
      <div className="mx-auto max-w-[88rem] px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-stone-950 dark:text-stone-50 sm:text-5xl">
            Livings y equipamiento para stands
          </h1>
          <p className="mt-4 text-base leading-7 text-stone-600 dark:text-stone-300 sm:text-lg">
            Consultá las opciones disponibles para complementar tu stand con
            livings, barras, mesas y sillas. La contratación del equipamiento se
            gestiona por separado.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center">
            <Button
              asChild
              size="lg"
              className="w-full bg-stone-900 text-white hover:bg-stone-800 sm:w-auto dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-200"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                Consultar por WhatsApp
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full border-stone-300 bg-white text-stone-800 sm:w-auto dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
            >
              <a href="#catalogo">
                Ver catálogo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
