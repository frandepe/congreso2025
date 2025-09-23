import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/AuroraBG/AuroraBackground";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@headlessui/react";
import SliderPatrocinadores from "@/components/SliderPatrocinadores/SliderPatrocinadores";
import Countdown2026 from "@/components/Countdown/Countdown2026";

export function NextConference() {
  return (
    <div className="bg-primary">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          ¡Gracias a todos! <br />
        </motion.h1>
      </LampContainer>
      {/* Formulario mejorado */}

      <div className="w-full max-w-xl mx-auto flex flex-col gap-6 px-4">
        <h3 className="text-2xl text-center text-white/50">
          Tu feedback nos ayuda a hacer del próximo congreso algo aún mejor
        </h3>
        <div className="flex flex-col gap-2">
          <Label htmlFor="user_name" className="text-lg text-white font-medium">
            Tu Nombre / Institución{" "}
            <span className="text-secondary text-sm">(opcional)</span>
          </Label>
          <Input
            id="user_name"
            name="user_name"
            placeholder="Nombre o Institución"
            className="bg-primary border border-white/30 focus:border-secondary focus:ring-2 focus:ring-secondary/40 placeholder:text-white/50 rounded-xl py-3 px-4 text-white shadow-sm transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="message" className="text-lg text-white font-medium">
            ¿Qué te pareció el congreso?
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Comparte tus comentarios"
            className="min-h-[120px] bg-primary border border-white/30 focus:border-secondary focus:ring-2 focus:ring-secondary/40 placeholder:text-white/50 rounded-xl py-3 px-4 text-white shadow-sm transition-all"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="expectation"
            className="text-lg text-white font-medium"
          >
            ¿Qué esperás para el próximo?
          </Label>
          <Textarea
            id="expectation"
            name="expectation"
            placeholder="Tus expectativas para el congreso 2026"
            className="min-h-[120px] bg-primary border border-white/30 focus:border-secondary focus:ring-2 focus:ring-secondary/40 placeholder:text-white/50 rounded-xl py-3 px-4 text-white shadow-sm transition-all"
            required
          />
        </div>

        <Button className="mt-4 bg-secondary hover:bg-secondary/90 text-white rounded-xl py-3 font-semibold shadow-lg transition-all">
          Enviar Comentario
        </Button>
      </div>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-gradient-to-br my-24 from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        ¡Esto recien empieza!
      </motion.h1>

      <div className="mb-10">
        <Countdown2026 />
      </div>
      <div className="bg-slate-50 py-2">
        <SliderPatrocinadores />
      </div>
      <div className="absolute left-10 md:top-72 top-2/4 -translate-y-1/2 w-2/3 h-2/3 bg-[url('/assets/logo-congreso2025.png')] bg-contain bg-no-repeat opacity-10 pointer-events-none"></div>
    </div>
  );
}
