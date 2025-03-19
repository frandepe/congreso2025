/**
 * v0 by Vercel.
 * @see https://v0.dev/t/oYvRX9AiaKF
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-2">
        <h3 className="text-3xl font-bold">¿Tienes alguna pregunta?</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Si tienes alguna duda o comentario, no dudes en ponerte en contacto
          con nosotros. Este formulario está destinado únicamente para consultas
          generales o sugerencias. Si deseas inscribirte al congreso haz
          <a href="/inscripcion" className="text-secondary">
            {" "}
            clic aquí
          </a>
          .
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre y Apellido</Label>
          <Input id="name" placeholder="Ingrese su nombre y apellido" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Ingrese su correo electrónico"
            type="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Mensaje</Label>
          <Textarea
            id="message"
            placeholder="Comparte tus comentarios o preguntas"
            className="min-h-[100px]"
          />
        </div>
        <Button type="submit">Enviar</Button>
      </div>
    </div>
  );
}
