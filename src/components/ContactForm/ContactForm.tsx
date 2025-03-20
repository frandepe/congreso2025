import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import { useState } from "react";

export default function ContactForm() {
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          setResultado("Mensaje enviado con éxito");
          e.target.reset();
        },
        (error) => {
          setResultado("Error al enviar el mensaje");
          console.log(error.text);
        }
      )
      .finally(() => {
        setLoading(false);
      });
    console.log(res);
  };

  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-2">
        <h3 className="text-3xl font-bold">¿Tienes alguna pregunta?</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Si tiene alguna duda o comentario, no dude en ponerse en contacto con
          nosotros. Este formulario está destinado únicamente para consultas
          generales o sugerencias. Si desea inscribirse al congreso haga
          <a href="/inscripcion" className="text-secondary">
            {" "}
            clic aquí
          </a>
          .
        </p>
      </div>
      <form className="space-y-4" onSubmit={sendEmail}>
        <div className="space-y-2">
          <Label htmlFor="user_name">
            Nombre y Apellido <span className="text-secondary">*</span>
          </Label>
          <Input
            id="user_name"
            name="user_name"
            placeholder="Ingrese su nombre y apellido"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="user_email">
            Email <span className="text-secondary">*</span>
          </Label>
          <Input
            id="user_email"
            name="user_email"
            placeholder="Ingrese su correo electrónico"
            type="email"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="user_tel">Teléfono</Label>
          <Input
            id="user_tel"
            name="user_tel"
            placeholder="Ingrese su número de teléfono"
            type="text"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">
            Mensaje <span className="text-secondary">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Comparte tus comentarios o preguntas"
            className="min-h-[100px]"
            required
          />
        </div>
        <Button type="submit" disabled={loading || !!resultado}>
          {loading ? "Enviando..." : "Enviar"}
        </Button>
      </form>
      {resultado && (
        <div className="text-center text-lg font-semibold bg-secondary rounded-md p-2 shadow-md">
          {resultado === "Mensaje enviado con éxito" ? (
            <p>
              ¡Gracias por contactarnos! Nos pondremos en contacto con usted lo
              antes posible.
            </p>
          ) : (
            <p>
              Hubo un problema al enviar su mensaje. Por favor, intente
              nuevamente más tarde o contáctenos a través de nuestras redes
              sociales.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// template id: template_af1rz1p
// service_085uu2k
// public_key: 1pJRcoYPZ5B_8OK6a
