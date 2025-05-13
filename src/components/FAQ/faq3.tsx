import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CircleCheckBig } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq3Props {
  heading: string;
  description: string;
  items?: FaqItem[];
  supportHeading: string;
  supportDescription: string;
  supportButtonText: string;
  supportButtonUrl: string;
}

const faqItems = [
  {
    id: "faq-1",
    question: "¿Cuándo y dónde se realizará el Congreso Nacional de RCP?",
    answer:
      "El congreso se llevará a cabo del 15 al 17 de octubre de 2025 en Trenque Lauquen, Provincia de Buenos Aires, Argentina.",
  },
  {
    id: "faq-2",
    question: "¿Cómo me inscribo?",
    answer: (
      <>
        Puedes inscribirte a través de los enlaces específicos según tu
        modalidad de participación:
        <ul className="list-disc pl-5 mt-2">
          <li>Un día: $5.000</li>
          <li>Tres días sin alojamiento: $15.000</li>
          <li>
            Tres días con alojamiento en dormís compartidos (cupos limitados):
            $30.000
          </li>
        </ul>
        <p className="mt-2">
          Haz{" "}
          <a
            className="text-primary underline"
            href="inscripcion"
            target="_blank"
          >
            clic aquí
          </a>{" "}
          para inscribirte
        </p>
      </>
    ),
  },
  {
    id: "faq-3",
    question: "¿Qué incluye la inscripción?",
    answer: (
      <>
        Tu inscripción incluye:
        <ul className="list-disc pl-5 mt-2">
          <li className="flex gap-2 items-center">
            <CircleCheckBig color="green" size={18} /> Acceso a todas las
            conferencias y talleres del congreso.
          </li>
          <li className="flex gap-2 items-center">
            <CircleCheckBig color="green" size={18} /> Materiales del evento
            (programa, credencial, etc.).
          </li>
          <li className="flex gap-2 items-center">
            <CircleCheckBig color="green" size={18} /> Desayuno y refrigerios en
            cada break.
          </li>
          <li className="flex gap-2 items-center">
            <CircleCheckBig color="green" size={18} /> Certificado de
            participación.
          </li>
          <li className="flex gap-2">
            <CircleCheckBig color="orange" className="mt-1" size={20} />
            Para quienes eligen la opción con alojamiento, incluye 4 noches en
            dormis compartidos.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "faq-4",
    question: "¿Cuántos cupos hay disponibles?",
    answer:
      "Los cupos son limitados para garantizar una mejor experiencia para todos los asistentes.",
  },
  {
    id: "faq-5",
    question: "¿Cómo puedo ser patrocinador o auspiciante del congreso?",
    answer:
      "Si quieres apoyar el evento, completa el formulario en nuestra web y te enviaremos los requisitos detallados.",
  },
  {
    id: "faq-6",
    question: "¿Puedo obtener una factura por la inscripción?",
    answer:
      "Sí, al momento de la inscripción podrás solicitar tu factura correspondiente.",
  },
  {
    id: "faq-7",
    question: "¿A quién puedo contactar en caso de dudas?",
    answer:
      "Puedes escribirnos a congresonacionalrcp@gmail.com o comunicarte al 2392-460227.",
  },
  {
    id: "faq-8",
    question: "¿Puedo cancelar mi inscripción y solicitar un reembolso?",
    answer:
      "Las inscripciones no son reembolsables. Sin embargo, si no puedes asistir, puedes transferir tu inscripción a otra persona notificándonos con anticipación.",
  },
  {
    id: "faq-9",
    question: "¿Es necesario tener experiencia previa en RCP para participar?",
    answer:
      "No, el congreso está abierto tanto a instructores como a cualquier persona interesada en la reanimación cardiopulmonar y los primeros auxilios. Habrá charlas y talleres adaptados a distintos niveles de experiencia.",
  },
  {
    id: "faq-10",
    question: "¿Qué debo llevar al congreso?",
    answer: (
      <>
        Te recomendamos traer ropa cómoda y muchas ganas de aprender y compartir
        experiencias.
        <br />
        <br />
        Si elegiste la opción con alojamiento, no olvides traer artículos de
        higiene personal, sábanas para cama de una plaza y una toalla.
        <br />
        <br />
        Los dormitorios son compartidos y están organizados en cuatro
        habitaciones de 16 camas cada una. La distribución será exclusiva para
        hombres y mujeres, según la cantidad de inscriptos.
      </>
    ),
  },
];

const Faq3 = () => {
  return (
    <section className="py-32 flex justify-center">
      <div className="container space-y-16">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
            Preguntas Frecuentes (FAQ)
          </h2>
          <p className="text-muted-foreground lg:text-lg">
            Consulta las respuestas a tus preguntas más comunes.
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg text-left">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mx-auto flex max-w-4xl flex-col items-center rounded-lg bg-accent p-4 text-center md:rounded-xl md:p-6 lg:p-8">
          <h3 className="mb-2 max-w-3xl font-semibold lg:text-lg">
            ¿Aún tienes preguntas?
          </h3>
          <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
            ¿No encuentras la respuesta que buscas? Nuestro equipo de soporte
            está aquí para ayudarte con cualquier pregunta o inquietud técnica.
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            <Button className="w-full sm:w-auto" asChild>
              <a href={"/contacto"} target="_blank">
                Contactar
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Faq3 };
