import ContactForm from "@/components/ContactForm/ContactForm";
import React from "react";
import { Phone, Mail, Facebook, Instagram } from "lucide-react"; // Importa los íconos de lucide-react

export const Contact = () => {
  return (
    <div className="pt-9 px-6 relative dark:bg-background">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 relative">
        {/* Logo en el fondo */}
        <div className="absolute left-48 top-1/2 -translate-y-1/2 w-3/5 h-3/5 bg-[url('/assets/logo-congreso2026.png')] bg-contain bg-no-repeat opacity-10 pointer-events-none"></div>

        {/* Información de contacto con íconos */}
        <div className="flex flex-col space-y-8 w-full md:w-1/3">
          <h2 className="text-3xl font-semibold">Contáctenos</h2>

          <div className="space-y-6">
            {/* Teléfono */}
            <div className="flex items-center space-x-4 text-gray-700 hover:text-secondary transition-all duration-300 cursor-pointer">
              <Phone size={28} className="text-primary" />
              <a href="tel:+542392460227">2392-460227</a>
            </div>
            {/* Email */}
            <div className="flex items-center space-x-4 text-gray-700 hover:text-secondary transition-all duration-300 cursor-pointer">
              <Mail size={28} className="text-primary" />
              <a href="mailto:congresonacionalrcp@gmail.com">
                congresonacionalrcp@gmail.com
              </a>
            </div>
            {/* Facebook */}
            <div className="flex items-center space-x-4 text-gray-700 hover:text-secondary transition-all duration-300 cursor-pointer">
              <Facebook size={28} className="text-primary" />
              <a
                href="https://www.facebook.com/profile.php?id=61574079247674"
                target="_blank"
                rel="noopener noreferrer"
              >
                @facebook
              </a>
            </div>
            {/* Instagram */}
            <div className="flex items-center space-x-4 text-gray-700 hover:text-secondary transition-all duration-300 cursor-pointer">
              <Instagram size={28} className="text-primary" />
              <a
                href="https://www.instagram.com/congresonacionalrcp/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @instagram
              </a>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <ContactForm />
      </div>
    </div>
  );
};
