import { Badge } from "@/components/ui/badge";
import type { AdminSubmissionDetailReceiptDto } from "@/features/api/types";
import {
  formatAdminDate,
  formatArsCurrency,
  getReceiptStatusAppearance,
  getReceiptStatusLabel,
} from "@/features/admin-submissions/admin-submissions.utils";

type AdminSubmissionReceiptListProps = {
  receipts: AdminSubmissionDetailReceiptDto[];
};

export function AdminSubmissionReceiptList({
  receipts,
}: AdminSubmissionReceiptListProps) {
  return (
    <section
      aria-labelledby="admin-receipts-heading"
      className="rounded-[30px] border border-stone-200 bg-white/95 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)]"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
          Comprobantes
        </p>
        <h2
          id="admin-receipts-heading"
          className="mt-1 text-xl font-semibold text-stone-900"
        >
          Cuotas y comprobantes enviados
        </h2>
        <p className="mt-2 text-sm text-stone-500">
          Cada comprobante muestra su estado, datos de la imágen y trazabilidad
          de revision.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        {receipts.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600">
            Todavia no hay comprobantes cargados para esta inscripcion.
          </div>
        ) : null}

        {receipts.map((receipt) => {
          const appearance = getReceiptStatusAppearance(receipt.status);

          return (
            <article
              key={receipt.id}
              aria-labelledby={`receipt-title-${receipt.id}`}
              className="overflow-hidden rounded-[24px] border border-stone-200 bg-white"
            >
              <div
                aria-hidden="true"
                className={`h-2 w-full bg-gradient-to-r ${appearance.accentClassName}`}
              />

              <div className="p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        id={`receipt-title-${receipt.id}`}
                        className="text-base font-semibold text-stone-900"
                      >
                        Cuota {receipt.installmentNumber}
                      </h3>
                      <Badge className={appearance.badgeClassName}>
                        <span
                          aria-hidden="true"
                          className={`mr-2 inline-block h-2 w-2 rounded-full ${appearance.dotClassName}`}
                        />
                        {getReceiptStatusLabel(receipt.status)}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-stone-600">
                      Estado del comprobante:{" "}
                      {getReceiptStatusLabel(receipt.status)}.{" "}
                      {receipt.reviewedByAdminEmail
                        ? `Revisado por ${receipt.reviewedByAdminEmail}`
                        : "Pendiente de validacion administrativa"}
                    </p>
                  </div>

                  <a
                    href={receipt.receiptUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Ver comprobante de cuota ${receipt.installmentNumber}`}
                    className="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800 transition hover:border-emerald-200 hover:bg-emerald-100"
                  >
                    Ver comprobante
                  </a>
                </div>

                <dl className="mt-4 grid gap-3 text-sm text-stone-700 md:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-2xl bg-stone-50 px-3 py-2">
                    <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">
                      Monto
                    </dt>
                    <dd className="mt-1 font-medium text-stone-900">
                      {formatArsCurrency(receipt.amountReported)}
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-stone-50 px-3 py-2">
                    <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">
                      Pago informado
                    </dt>
                    <dd className="mt-1 font-medium text-stone-900">
                      {formatAdminDate(receipt.paymentDate)}
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-stone-50 px-3 py-2">
                    <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">
                      Revision
                    </dt>
                    <dd className="mt-1 font-medium text-stone-900">
                      {formatAdminDate(receipt.reviewedAt)}
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-stone-50 px-3 py-2">
                    <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">
                      Revisor
                    </dt>
                    <dd className="mt-1 font-medium text-stone-900">
                      {receipt.reviewedByAdminEmail ?? "-"}
                    </dd>
                  </div>
                  {/* <div className="rounded-2xl bg-stone-50 px-3 py-2 md:col-span-2">
                    <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">
                      Archivo
                    </dt>
                    <dd className="mt-1 font-medium text-stone-900">
                      {receipt.receiptOriginalFilename ?? "-"}
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-stone-50 px-3 py-2 md:col-span-2">
                    <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">
                      Tipo y tamano
                    </dt>
                    <dd className="mt-1 font-medium text-stone-900">
                      {receipt.receiptMimeType ?? "-"} /{" "}
                      {formatBytesToReadableSize(receipt.receiptSizeBytes)}
                    </dd>
                  </div> */}
                </dl>

                {receipt.rejectionReason ? (
                  <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                    Motivo de rechazo: {receipt.rejectionReason}
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
