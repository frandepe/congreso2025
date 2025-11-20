import { motion } from "framer-motion";
import React from "react";

export const TextProgressiveBlur = () => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#faf9f6] to-[#f0efec] text-gray-800 overflow-hidden">
      {/* Contenedor principal tipo carta */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative my-8 w-full max-w-3xl rounded-2xl bg-white/70 backdrop-blur-md shadow-xl px-8 py-10 overflow-y-auto max-h-[90vh]"
      >
        {/* Encabezado */}
        <div className="text-center mb-10">
          <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-2">
            Carta de agradecimiento
          </h2>

          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
        </div>

        {/* Cuerpo del texto */}
        <div className="text-justify leading-relaxed space-y-6 text-gray-700">
          <p>
            Soy Nicolás De Paulo, Presidente del comité organizador del primer
            congreso nacional de instructores de RCP y quiero hacer estos
            agradecimientos: al Sr. Intendente Municipal de Trenque Lauquen Ing.
            Francisco Recoulat quien allá por Enero de 2025 recibió mi propuesta
            y tuvo la generosidad de decir SI al proyecto y darme toda la
            libertad para la organización del evento, con ello a todas las Areas
            del municipio que colaboraron, en especial a la que pertenezco
            ABORDAJE TERRITORIAL.
          </p>

          <p>
            Al COMITÉ ORGANIZADOR; ese comité formado por Patricia Soto,
            Guillermo Carranza, Sergio Felice, Franco De Paulo y después se unió
            Valentina; fue un equipo, fuimos una sola persona en un conjunto de
            ideas y trabajo que no había día ni horario para reunirnos vía zoom
            y organizar y soñar y planificar y tantas cosas a lo largo de esos 8
            meses anteriores al congreso.
          </p>

          <p>
            A los expositores, tanto a los que estuvieron vía streaming desde
            España, caso de Miguel Ángel Grimas Salinas y Francesc Carmona como
            a quienes estuvieron en persona, la gente del Equipo PAE, la gente
            de Argentina Reanima, Mariano Casoy, la misma Patricia Soto,
            Guillermo Carmona y Emiliano, todos ellos nos aportaron sus
            conocimientos y los brindaron de una manera genial.
          </p>

          <p>
            A los sponsors y empresas que confiaron plenamente en el congreso
            sin saber con qué se encontrarían: Argentina Reanima, ACES, LEX,
            Cardiosistemas, Nexo, Lexcy E&M, Driplan Cardio, La Pataca y Bares y
            Fondas.
          </p>

          <p>
            Al Club Barrio Alegre por sus instalaciones y disposición para su
            uso.
          </p>

          <p>
            A Jorge Coscueta dueño del Full Trac que brindó la atención de
            comidas en el evento, Esteban Pérez con la pantalla y sonido, Juan
            Vivas y sus conexiones de internet, el personal municipal que armó,
            desarmó y cuidó las instalaciones durante los 3 días, a quienes
            atendieron el polideportivo municipal, al personal de la oficina de
            Producción con su stand de muestras y degustaciones y a todos los
            que estuvieron a disposición del congreso como por ejemplo el
            personal de Espacios Verdes que colaboraron con los homenajes de la
            plantación de los árboles Aquí un agradecimiento especial a las
            familias de Tomas, Beltrán y Adrian por permitirnos tan hermoso
            homenaje.
          </p>

          <p>
            Al artista Abel Prieto (hermano de Adrian, nuestro homenajeado) por
            las obras de arte que fueron entregadas a quienes nos representaron
            en el congreso.
          </p>

          <p className="font-medium text-center mt-10 text-gray-800">
            Por último dejé a quienes creo son la otra pata que sostiene al
            congreso, los participantes, Instructores, Bomberos, Enfermeras,
            Estudiantes, Gente de la comunidad toda, que participaron, se
            nutrieron y se emocionaron con este primer congreso, compartieron
            experiencias, lloraron, rieron y por sobre todas las cosas creo que
            vivieron una experiencia inolvidable. Algunos viajaron muchos
            kilómetros, otros menos, otros eran locales, pero todos se llevaron
            una mágica experiencia y la emoción de haber participado en un
            evento histórico, EL PRIMER CONGRESO NACIONAL DE INSTRUCTORES DE
            RCP. GRACIAS POR SER PARTE CADA UNO EN LO SUYO, lo recordaré por
            siempre y no se borrará ni de mi mente ni de mi corazón.-
          </p>
        </div>

        {/* Firma */}
        <div className="mt-12 text-right pr-2 italic text-gray-600">
          <p>Con gratitud,</p>
          <p className="font-signature text-xl text-gray-700">
            Nicolás De Paulo
          </p>
        </div>
      </motion.div>
    </div>
  );
};
