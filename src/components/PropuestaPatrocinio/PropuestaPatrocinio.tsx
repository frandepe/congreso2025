import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function PropuestaPatrocinio() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">¿Quieres ser Patrocinador?</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-0 sm:max-w-3xl">
        <DialogHeader className="border-b border-border px-6 py-4">
          <DialogTitle className="text-lg sm:text-xl font-semibold">
            Propuesta de Patrocinio - Congreso Nacional de RCP 2025
          </DialogTitle>
          <div className="pt-4">
            <a
              href="https://forms.gle/f7u9EUCD97wnHXm18"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" className="w-full">
                Sumate como Patrocinador
              </Button>
            </a>
          </div>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="space-y-6 px-6 py-4 text-sm leading-6 text-muted-foreground">
            {/* Intro */}

            <section className="space-y-2">
              <p>
                <strong>Audiencia principal:</strong> Instructores certificados
                de RCP, primeros auxilios y emergencias médicas de todo el país.
              </p>
              <p>
                <strong>Fecha / sede:</strong> 15, 16 y 17 de octubre de 2025.
                Sede del Club Deportivo Barrio Alegre
              </p>
              <p>
                <strong>Espacio asignado al patrocinador:</strong> Stand Premium
                de 9 m² (3 m x 3 m).
              </p>
            </section>

            {/* Inversión */}
            <section>
              <h3 className="font-semibold text-primary mb-2">
                Inversión única
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  ARS 150.000 hasta el <strong>30 de Julio 2025</strong>
                </li>
                <li>
                  ARS 250.000 hasta el <strong>30 de Agosto 2025</strong>
                </li>
                <li>
                  ARS 300.000 hasta el <strong>30 de Septiembre 2025</strong>
                </li>
              </ul>
              <p className="mt-2 text-xs italic">
                Sujeto a disponibilidad de 19 stands.
              </p>
            </section>

            {/* Beneficios */}
            <section>
              <h3 className="font-semibold text-primary mb-2">
                1. Beneficios de su Patrocinio
              </h3>
              <ul className="space-y-2">
                <li>
                  <strong>Visibilidad Física:</strong>
                  <ul className="list-disc list-inside ml-4">
                    <li>Stand 3 x 3 m en la zona central de exhibición</li>
                    <li>Logo en señalética general, tótems y banners LED</li>
                  </ul>
                </li>
                <li>
                  <strong>Visibilidad Digital:</strong>
                  <ul className="list-disc list-inside ml-4">
                    <li>Logo + enlace en la web oficial (12 meses)</li>
                    <li>2 menciones en mailings</li>
                    <li>1 publicación en Instagram/Facebook + LinkedIn</li>
                  </ul>
                </li>
                <li>
                  <strong>Activaciones:</strong> Inclusión de folleto o cupón en
                  welcome kit (500 unidades)
                </li>
                <li>
                  <strong>Networking:</strong> Pase full access para 2
                  representantes
                </li>
                <li>
                  <strong>Data & Leads:</strong> Acceso a lista opt-in (nombre,
                  email, institución)
                </li>
                <li>
                  <strong>Prensa:</strong> Mención en boletín pre y post evento
                </li>
              </ul>
            </section>

            {/* Entregables */}
            <section>
              <h3 className="font-semibold text-primary mb-2">
                2. Entregables del Organizador
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Electricidad (1 kW), Wi-Fi, credencial staff, limpieza diaria
                </li>
                <li>Soporte logístico: descarga, montaje y asistencia</li>
              </ul>
            </section>

            {/* Cronograma */}
            <section>
              <h3 className="font-semibold text-primary mb-2">
                3. Cronograma Clave
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Confirmar participación:</strong> 15 septiembre 2025
                </li>
                <li>
                  <strong>Enviar logotipos en alta:</strong> El día del pago
                </li>
                <li>
                  <strong>Material para welcome kit:</strong> 20 de septiembre
                  2025
                </li>
                <li>
                  <strong>Montaje Congreso:</strong> 14 de octubre 2025
                </li>
              </ul>
            </section>

            {/* Próximos pasos */}
            <section>
              <h3 className="font-semibold text-primary mb-2">
                4. Próximos Pasos
              </h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Confirmación escrita de interés completando el formulario
                </li>
                <li>Firma del acuerdo y pago del 50 % de reserva</li>
                <li>Reunión de kick off para coordinar activaciones</li>
              </ol>
            </section>

            {/* Contacto */}
            <section>
              <h3 className="font-semibold text-primary mb-2">
                5. Contacto para patrocinio
              </h3>
              <p>
                <strong>Email:</strong> congresonacionalrcp@gmail.com
              </p>
            </section>

            {/* Cierre */}
            <section className="border-t pt-4">
              <p>
                Estamos convencidos de que esta alianza potenciará su presencia
                ante la comunidad profesional de RCP, generará leads de alto
                valor y posicionará su marca como referente en la formación que
                salva vidas.
              </p>
              <p className="font-semibold mt-2">
                ¡Esperamos contar con ustedes!
              </p>
            </section>

            {/* CTA */}
            <div className="pt-4">
              <a
                href="https://forms.gle/f7u9EUCD97wnHXm18"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full">Sumate como Patrocinador</Button>
              </a>
            </div>
          </div>
        </DialogDescription>
        {/* <DialogFooter className="px-6 py-4 sm:justify-end"></DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export { PropuestaPatrocinio };

{
  /* <DialogClose asChild>
                <Button type="button">Cerrar</Button>
              </DialogClose> */
}
