import TransitionSmoot from "@/components/Carousels/TransitionSmoot";
import React from "react";

const SergioMarcos = () => {
  return (
    <div className="dark:bg-background">
      <div className="container mx-auto py-20">
        <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl mx-4 md:mx-0">
          En memoria de Sergio Marcos
        </h2>
        <p className="mt-6 text-lg md:text-xl leading-7 text-muted-foreground mx-4 md:mx-0">
          La comisión organizadora y los participantes del Primer Congreso
          Nacional de Instructores de RCP despiden a uno de sus más
          significativos participantes. Sergio Marcos se nos adelantó, tantas
          veces bajo sus brazos para enseñar RCP, y esta vez los elevó para
          llegar a Dios; seguro allí tendrá un lugar privilegiado. El congreso
          fue uno de sus más grandes alientos para seguir peleándola, y fue para
          nosotros una gran bendición tenerlo como participante. Lucha,
          esfuerzo, vocación de servicio y, por sobre todas las cosas,
          solidaridad con el prójimo eran de las cosas que se notaban en Sergio
          con solo intercambiar un diálogo. Te recordaremos siempre, Sergio; en
          el segundo congreso faltará tu persona, pero no tu recuerdo. QEPD,
          Sergio. Abrazo a todo Argentina Reanima, a familiares y amigos de
          Sergio.
        </p>
      </div>
      <div className="bg-gradient-to-tl from-secondary to-white py-10">
        <TransitionSmoot />
      </div>
    </div>
  );
};

export default SergioMarcos;
