"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "Muy bueno. Complieron con todas mis expectativas",
    by: "Alex, CEO at TechCorp",
    imgSrc: "https://i.pravatar.cc/150?img=1",
  },
  {
    tempId: 1,
    testimonial: "Espectacular grupo humano, esencia, personal y respeto",
    by: "Dan, CTO at SecureNet",
    imgSrc: "https://i.pravatar.cc/150?img=2",
  },
  {
    tempId: 2,
    testimonial:
      "Excelente jornada, muchas herramientas requerida para aplicar en nuestro pueblo. Gracias, gracias por enseñarnos a enseñar",
    by: "Stephanie, COO at InnovateCo",
    imgSrc: "https://i.pravatar.cc/150?img=3",
  },
  {
    tempId: 3,
    testimonial:
      "Todos los que participamos de este congreso somos, además de perros verdes, agentes multiplicadores. Al volver a casa haremos algo para mejorar nuestra comunidad.",
    by: "Marie, CFO at FuturePlanning",
    imgSrc: "https://i.pravatar.cc/150?img=4",
  },
  {
    tempId: 4,
    testimonial:
      "Valoro el calor humano, amabilidad, respeto y compromiso. Pidamos a Messi que haga una práctica de RCP y se dispararán los gestos 🤭",
    by: "Andre, Head of Design at CreativeSolutions",
    imgSrc: "https://i.pravatar.cc/150?img=5",
  },
  {
    tempId: 5,
    testimonial:
      "Lo que más valoré ha sido el paisaje humano y la calidez de los expositores. Estoy muy conforme. Me siento muy agradecida por la experiencia y me llevo una gran primera impresión.",
    by: "Jeremy, Product Manager at TimeWise",
    imgSrc: "https://i.pravatar.cc/150?img=6",
  },
  {
    tempId: 6,
    testimonial:
      "Quiero destacar y felicitar xq el grupo que se formo es de pura gente interesada en el tema",
    by: "Pam, Marketing Director at BrandBuilders",
    imgSrc: "https://i.pravatar.cc/150?img=7",
  },
  {
    tempId: 7,
    testimonial:
      "Se hizo muy llevadero, no se hizo largo. Muy linda experiencia, muy emotivo.",
    by: "Daniel, Data Scientist at AnalyticsPro",
    imgSrc: "https://i.pravatar.cc/150?img=8",
  },
  {
    tempId: 8,
    testimonial:
      "Valoro la calidez humana, LA SENSIBILIDAD DE NICOLAS!!🙌🏼 llegando a cada uno de nosotros!!!",
    by: "Fernando, UX Designer at UserFirst",
    imgSrc: "https://i.pravatar.cc/150?img=9",
  },
  {
    tempId: 9,
    testimonial:
      'Valoro la posibilidad que nos daban todo el tiempo de participar y de pensar al Congreso como "algo que armamos entre todos"',
    by: "Andy, DevOps Engineer at CloudMasters",
    imgSrc: "https://i.pravatar.cc/150?img=10",
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: (typeof testimonials)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out ",
        isCenter
          ? "z-10 bg-primary text-primary-foreground border-secondary"
          : "z-0 bg-card text-card-foreground border-border hover:border-secondary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px hsl(var(--border))"
          : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <img
        src="/assets/avatar.jpg"
        alt={`avatar de un perfil anónimo`}
        className="mb-4 h-10 w-10 bg-muted object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))",
        }}
      />
      <h3
        className={cn(
          "text-base sm:text-xl font-medium",
          isCenter ? "text-primary-foreground" : "text-foreground"
        )}
      >
        "{testimonial.testimonial}"
      </h3>

      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
          isCenter ? "text-primary-foreground/80" : "text-muted-foreground",
          testimonial.testimonial.length >= 130 ? "hidden md:block" : "block"
        )}
      >
        - Participante del Congreso 2025
      </p>
    </div>
  );
};

export const Testimonials2026: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 600 }}>
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors text-secondary",

            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors text-secondary",

            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
