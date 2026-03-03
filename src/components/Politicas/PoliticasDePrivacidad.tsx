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

function PoliticasDePrivacidad() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="font-thin text-gray-600">
          Políticas
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-border px-6 py-4 text-base">
            Políticas de privacidad
          </DialogTitle>
          <div className="overflow-y-auto">
            <DialogDescription asChild>
              <div className="px-6 py-4">
                <div className="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground">
                  <p>
                    En <strong>Congreso Nacional RCP</strong>, respetamos la
                    privacidad de nuestros usuarios y estamos comprometidos con
                    la protección de sus datos personales. Esta política de
                    privacidad describe cómo recopilamos, usamos y protegemos la
                    información que proporcionas cuando usas nuestro sitio web.
                  </p>
                  <h3 className="font-semibold mt-4">
                    1. Información que recopilamos
                  </h3>
                  <p>
                    Recopilamos información cuando los usuarios interactúan con
                    nuestro sitio web, incluyendo:
                    <br />
                    - Nombre y Apellido, correo electrónico y teléfono (si
                    aplica) proporcionados en formularios de contacto.
                    <br />
                    - Datos de navegación y comportamiento dentro del sitio,
                    como páginas visitadas, clicks en botones y tiempo de
                    permanencia, mediante herramientas de analítica como Google
                    Analytics 4 (GA4).
                    <br />- Información del dispositivo y navegador (tipo de
                    navegador, resolución de pantalla, sistema operativo,
                    ubicación aproximada por IP).
                  </p>
                  <h3 className="font-semibold mt-4">
                    2. Uso de la información
                  </h3>
                  <p>
                    La información se utiliza para:
                    <br />
                    - Responder consultas de los usuarios.
                    <br />
                    - Analizar el uso de nuestro sitio y mejorar la experiencia
                    de navegación.
                    <br />
                    - Medir el desempeño de nuestras campañas y botones de
                    acción.
                    <br />
                    No compartimos ni vendemos tus datos personales a terceros
                    fuera de los proveedores de servicios (como GA4) necesarios
                    para el funcionamiento y análisis del sitio.
                  </p>
                  <h3 className="font-semibold mt-4">
                    3. Cookies y herramientas de seguimiento
                  </h3>
                  <p>
                    Utilizamos cookies y herramientas de seguimiento para
                    recopilar información de navegación y comportamiento. Esto
                    incluye Google Analytics 4, que nos permite medir visitas,
                    eventos (clics en botones, formularios completados) y datos
                    agregados de usuarios.
                    <br />
                    Podés configurar tu navegador para bloquear o eliminar
                    cookies, aunque algunas funciones del sitio podrían verse
                    afectadas.
                  </p>
                  <h3 className="font-semibold mt-4">
                    4. Seguridad de la información
                  </h3>
                  <p>
                    Tomamos medidas razonables para proteger tu información
                    personal contra accesos no autorizados, alteraciones o
                    destrucción. Sin embargo, ningún método de transmisión por
                    Internet o almacenamiento electrónico es 100% seguro.
                  </p>
                  <h3 className="font-semibold mt-4">
                    5. Retención de la información
                  </h3>
                  <p>
                    Conservamos la información personal solo mientras sea
                    necesario para los fines descritos o hasta que el usuario
                    solicite su eliminación.
                  </p>
                  <h3 className="font-semibold mt-4">
                    6. Derechos de los usuarios
                  </h3>
                  <p>
                    Tenés derecho a acceder, corregir o eliminar tus datos
                    personales en cualquier momento. Para ejercer estos
                    derechos, podés contactarnos a través de nuestro formulario
                    de contacto.
                  </p>
                  <h3 className="font-semibold mt-4">
                    7. Cambios en la política de privacidad
                  </h3>
                  <p>
                    Nos reservamos el derecho de modificar esta política en
                    cualquier momento. Te notificaremos sobre cambios publicando
                    la nueva versión en esta página.
                  </p>
                  <p className="text-center text-xs mt-6">
                    Fecha de última actualización: 02 de marzo, 2026
                  </p>
                </div>
              </div>
            </DialogDescription>
            <DialogFooter className="px-6 pb-6 sm:justify-start">
              <DialogClose asChild>
                <Button type="button">Cerrar</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export { PoliticasDePrivacidad };
