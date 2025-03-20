{
  /* <p>
            En <strong>Congreso Nacional RCP</strong>, respetamos la privacidad de nuestros usuarios y estamos comprometidos con la
            protección de sus datos personales. Esta política de privacidad describe cómo recopilamos, usamos y protegemos la
            información que proporcionas cuando usas nuestro sitio web.
          </p>
          <h3 className="font-semibold mt-4">1. Información que recopilamos</h3>
          <p>
            Recopilamos la siguiente información cuando los usuarios interactúan con nuestro formulario de contacto: <br />
            - Nombre y Apellido <br />
            - Dirección de correo electrónico <br />
            - Número de teléfono (opcional) <br />
            - Mensaje que el usuario ingresa en el formulario.
          </p>
          <h3 className="font-semibold mt-4">2. Uso de la información</h3>
          <p>
            La información proporcionada se utilizará únicamente para responder a las consultas de los usuarios y enviar
            información relacionada con el Congreso Nacional de RCP. No compartimos ni vendemos tus datos a terceros.
          </p>
          <h3 className="font-semibold mt-4">3. Seguridad de la información</h3>
          <p>
            Tomamos medidas razonables para proteger tu información personal contra accesos no autorizados, alteraciones o
            destrucción. Sin embargo, ningún método de transmisión por Internet o método de almacenamiento electrónico es 100%
            seguro, por lo que no podemos garantizar la seguridad absoluta.
          </p>
          <h3 className="font-semibold mt-4">4. Retención de la información</h3>
          <p>
            Conservamos la información personal solo durante el tiempo necesario para cumplir con los fines para los cuales fue
            recopilada o hasta que el usuario solicite su eliminación.
          </p>
          <h3 className="font-semibold mt-4">5. Derechos de los usuarios</h3>
          <p>
            Tienes derecho a acceder, corregir, o eliminar tus datos personales en cualquier momento. Para ejercer estos
            derechos, puedes contactarnos a través de nuestro formulario de contacto.
          </p>
          <h3 className="font-semibold mt-4">6. Cambios en la política de privacidad</h3>
          <p>
            Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Te notificaremos sobre
            cualquier cambio publicando la nueva política en esta página.
          </p>
          <p className="text-center text-xs mt-6">
            Fecha de última actualización: [Fecha]
          </p> */
}

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
                    Recopilamos la siguiente información cuando los usuarios
                    interactúan con nuestro formulario de contacto: <br />
                    - Nombre y Apellido <br />
                    - Dirección de correo electrónico <br />
                    - Número de teléfono (opcional) <br />- Mensaje que el
                    usuario ingresa en el formulario.
                  </p>
                  <h3 className="font-semibold mt-4">
                    2. Uso de la información
                  </h3>
                  <p>
                    La información proporcionada se utilizará únicamente para
                    responder a las consultas de los usuarios y enviar
                    información relacionada con el Congreso Nacional de RCP. No
                    compartimos ni vendemos tus datos a terceros.
                  </p>
                  <h3 className="font-semibold mt-4">
                    3. Seguridad de la información
                  </h3>
                  <p>
                    Tomamos medidas razonables para proteger tu información
                    personal contra accesos no autorizados, alteraciones o
                    destrucción. Sin embargo, ningún método de transmisión por
                    Internet o método de almacenamiento electrónico es 100%
                    seguro, por lo que no podemos garantizar la seguridad
                    absoluta.
                  </p>
                  <h3 className="font-semibold mt-4">
                    4. Retención de la información
                  </h3>
                  <p>
                    Conservamos la información personal solo durante el tiempo
                    necesario para cumplir con los fines para los cuales fue
                    recopilada o hasta que el usuario solicite su eliminación.
                  </p>
                  <h3 className="font-semibold mt-4">
                    5. Derechos de los usuarios
                  </h3>
                  <p>
                    Tienes derecho a acceder, corregir, o eliminar tus datos
                    personales en cualquier momento. Para ejercer estos
                    derechos, puedes contactarnos a través de nuestro formulario
                    de contacto.
                  </p>
                  <h3 className="font-semibold mt-4">
                    6. Cambios en la política de privacidad
                  </h3>
                  <p>
                    Nos reservamos el derecho de modificar esta política de
                    privacidad en cualquier momento. Te notificaremos sobre
                    cualquier cambio publicando la nueva política en esta
                    página.
                  </p>
                  <p className="text-center text-xs mt-6">
                    Fecha de última actualización: 20 de Marzo, 2025
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
