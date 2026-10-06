import { FormEvent, useRef, useState } from "react";
import { Download, Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Certificate } from "../components/Certificate";
import type {
  CertificateParticipant,
  CertificateSearchMethod,
} from "../certificates.types";
import { findCertificateParticipants } from "../certificates.utils";

export function CertificatesPage() {
  const [query, setQuery] = useState("");
  const [searchMethod, setSearchMethod] =
    useState<CertificateSearchMethod>("dni");
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<CertificateParticipant[]>([]);
  const [selectedParticipant, setSelectedParticipant] =
    useState<CertificateParticipant | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const matches = findCertificateParticipants(query, searchMethod);

    setResults(matches);
    setSelectedParticipant(null);
    setHasSearched(true);
  };

  const changeSearchMethod = (method: CertificateSearchMethod) => {
    setSearchMethod(method);
    setQuery("");
    setResults([]);
    setSelectedParticipant(null);
    setHasSearched(false);
  };

  const showCertificate = (participant: CertificateParticipant) => {
    setSelectedParticipant(participant);
    window.setTimeout(() => {
      certificateRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  const printCertificate = (participant: CertificateParticipant) => {
    setSelectedParticipant(participant);
    window.setTimeout(() => window.print(), 0);
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#f3f5ef] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-32 -z-10 size-96 rounded-full bg-secondary/10 blur-3xl"
      />

      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <img
            src="/assets/logo-congreso2026.png"
            alt="Segundo Congreso Nacional de RCP, Trenque Lauquen 2026"
            className="mx-auto h-auto w-52 sm:w-60"
          />
          <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-lightGreen">
            Congreso Nacional de RCP
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
            Descargá tu certificado
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Buscá tu certificado por DNI o por nombre y apellido.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 max-w-2xl rounded-2xl border border-primary/10 bg-white p-5 shadow-xl shadow-primary/5 sm:p-7"
        >
          <fieldset>
            <legend className="font-semibold text-primary">Buscar por</legend>
            <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
              {(
                [
                  ["dni", "DNI"],
                  ["fullName", "Nombre y apellido"],
                ] as const
              ).map(([method, label]) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => changeSearchMethod(method)}
                  aria-pressed={searchMethod === method}
                  className={`min-h-11 rounded-lg px-3 text-sm font-bold transition ${
                    searchMethod === method
                      ? "bg-white text-primary shadow-sm"
                      : "text-slate-600 hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
          <label
            htmlFor="certificate-search"
            className="mt-5 block font-semibold text-primary"
          >
            {searchMethod === "dni" ? "DNI" : "Nombre y apellido"}
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="certificate-search"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={
                searchMethod === "dni" ? "Ej.: 12.345.678" : "Ej.: Jorge Pérez"
              }
              inputMode={searchMethod === "dni" ? "numeric" : "text"}
              autoComplete="name"
              required
              className="min-h-12 flex-1 rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-900 outline-none transition focus:border-lightGreen focus:ring-4 focus:ring-lightGreen/15"
            />
            <Button
              type="submit"
              size="lg"
              className="min-h-12 gap-2 font-bold"
            >
              <Search className="size-4" aria-hidden="true" />
              Buscar certificado
            </Button>
          </div>
        </form>

        {hasSearched && results.length === 0 && (
          <div
            role="status"
            className="mx-auto mt-8 max-w-2xl rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-center text-amber-950"
          >
            <p className="font-semibold">
              No encontramos un certificado con los datos ingresados.
            </p>
            <p className="mt-1 text-sm">
              Revisá los datos e intentá nuevamente con la otra opción de
              búsqueda.
            </p>
          </div>
        )}

        {results.length > 1 && (
          <div
            role="status"
            className="mx-auto mt-8 max-w-2xl rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-center text-amber-950"
          >
            <p className="font-semibold">Existen varias coincidencias.</p>
            <p className="mt-1 text-sm">
              Utilizá el DNI para identificar tu certificado. Si no tenés un DNI
              registrado, contactate con la organización.
            </p>
          </div>
        )}

        {results.length === 1 && (
          <div className="mx-auto mt-8 max-w-2xl" aria-live="polite">
            <p className="mb-3 text-sm font-semibold text-slate-600">
              Encontramos tu certificado.
            </p>
            <div className="space-y-3">
              {results.map((participant, index) => {
                const fullName = [participant.nombre, participant.apellido]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <div
                    key={`${participant.dni ?? "sin-dni"}-${index}`}
                    className="flex flex-col gap-4 rounded-xl border border-emerald-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-lightGreen">
                        Participante
                      </p>
                      <p className="mt-1 text-xl font-bold text-primary">
                        {fullName || "Nombre no disponible"}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button
                        type="button"
                        variant="outline"
                        className="gap-2"
                        onClick={() => showCertificate(participant)}
                      >
                        <Eye className="size-4" aria-hidden="true" />
                        Ver certificado
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        className="gap-2 font-bold"
                        onClick={() => printCertificate(participant)}
                      >
                        <Download className="size-4" aria-hidden="true" />
                        Guardar como PDF
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {selectedParticipant && (
          <div
            ref={certificateRef}
            className="certificate-print-area scroll-mt-6 mt-12"
          >
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-lightGreen">
                  Vista previa
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  El documento se imprimirá en formato A4 horizontal.
                </p>
              </div>
              <Button
                type="button"
                variant="secondary"
                className="gap-2 font-bold"
                onClick={() => window.print()}
              >
                <Download className="size-4" aria-hidden="true" />
                Guardar como PDF
              </Button>
            </div>
            <div className="certificate-preview">
              <Certificate participant={selectedParticipant} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
