import { Calendar, MapPin, Truck } from "lucide-react";
import React from "react";

export const Transporte = () => {
  return (
    <section className="max-w-6xl mx-auto py-12">
      <h2 className="text-3xl md:text-5xl text-center mb-8 tracking-tighter font-regular">
        Cómo llegar y opciones de transporte
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Oficina de Informes */}
        <div className="flex flex-col items-start">
          <div className="flex items-center mb-4">
            <Calendar className="w-10 h-10 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800 ml-4">
              Oficina de Informes
            </h3>
          </div>
          <p className="text-gray-600">
            <span className="font-semibold">Dirección:</span> Av. García Salinas
            1010
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Horarios:</span> Lunes a Viernes de
            9 a 12 y de 15 a 19 hs.
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Celular:</span> (02392) 15611980
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span>{" "}
            turismo@trenquelauquen.gov.ar
          </p>
        </div>

        {/* Distancias a Trenque Lauquen */}
        <div className="flex flex-col items-start">
          <div className="flex items-center mb-4">
            <MapPin className="w-10 h-10 text-lightGreen" />
            <h3 className="text-xl font-semibold text-gray-800 ml-4">
              Distancias a Trenque Lauquen
            </h3>
          </div>
          <ul className="text-gray-600 space-y-2">
            <li>
              <strong>Ciudad Autónoma de Buenos Aires:</strong> 445 km
            </li>
            <li>
              <strong>La Plata:</strong> 520 km
            </li>
            <li>
              <strong>Santa Rosa (LP):</strong> 160 km
            </li>
            <li>
              <strong>Rosario (Sta Fe):</strong> 476 km
            </li>
            <li>
              <strong>Bahía Blanca:</strong> 320 km
            </li>
            <li>
              <strong>Mar del Plata:</strong> 590 km
            </li>
            <li>
              <strong>Neuquén:</strong> 706 km
            </li>
            <li>
              <strong>Bariloche (RN):</strong> 1128 km
            </li>
          </ul>
        </div>

        {/* Teléfonos de Empresas de Transporte */}
        <div className="flex flex-col items-start">
          <div className="flex items-center mb-4">
            <Truck className="w-10 h-10 text-red-600" />
            <h3 className="text-xl font-semibold text-gray-800 ml-4">
              Teléfonos de Empresas de Transporte
            </h3>
          </div>
          <ul className="text-gray-600 space-y-2">
            <li>
              <strong>Alberino y Ñandu del Sur:</strong> (02392) 423269
            </li>
            <li>
              <strong>Chevallier y Pullmann Gral Belgrano:</strong> (02392)
              424704
            </li>
            <li>
              <strong>Dumas:</strong> (02392) 433224
            </li>
            <li>
              <strong>Plusmar:</strong> (02392) 432920
            </li>
            <li>
              <strong>El Rápido:</strong> (02392) 426024
            </li>
            <li>
              <strong>Vía Bariloche:</strong> (02392) 423284
            </li>
            <li>
              <strong>La Primavera:</strong> (02392) 15614702
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
