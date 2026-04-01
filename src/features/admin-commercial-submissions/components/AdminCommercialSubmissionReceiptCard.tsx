import { Badge } from "@/components/ui/badge";
import type { AdminCommercialSubmissionDetailReceiptDto } from "@/features/api/types";
import {
  formatAdminDate,
  formatArsCurrency,
  getReceiptStatusAppearance,
  getReceiptStatusLabel,
} from "@/features/admin-submissions/admin-submissions.utils";

type Props = {
  receipts: AdminCommercialSubmissionDetailReceiptDto[];
};

export function AdminCommercialSubmissionReceiptCard({ receipts }: Props) {
  return (
    <section className="rounded-[30px] border border-stone-200 bg-white/95 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
        Comprobante
      </p>
      <h2 className="mt-1 text-xl font-semibold text-stone-900">
        Comprobante enviado
      </h2>

      {receipts.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600">
          Todavia no hay comprobante cargado para esta solicitud.
        </div>
      ) : null}

      {receipts.length > 0 ? (
        <div className="mt-5 space-y-4">
          {receipts.map((receipt) => (
            <div key={receipt.id} className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Cuota</p>
                  <p className="mt-1 font-medium text-stone-900">
                    {receipt.installmentNumber}
                  </p>
                </div>
                <Badge className={getReceiptStatusAppearance(receipt.status).badgeClassName}>
                  {getReceiptStatusLabel(receipt.status)}
                </Badge>
                <a
                  href={receipt.receiptUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800"
                >
                  Ver comprobante
                </a>
              </div>

              <dl className="mt-4 grid gap-3 text-sm text-stone-700 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl bg-white px-3 py-2">
                  <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Monto</dt>
                  <dd className="mt-1 font-medium text-stone-900">{formatArsCurrency(receipt.amountReported)}</dd>
                </div>
                <div className="rounded-2xl bg-white px-3 py-2">
                  <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Pago informado</dt>
                  <dd className="mt-1 font-medium text-stone-900">{formatAdminDate(receipt.paymentDate)}</dd>
                </div>
                <div className="rounded-2xl bg-white px-3 py-2">
                  <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Revision</dt>
                  <dd className="mt-1 font-medium text-stone-900">{formatAdminDate(receipt.reviewedAt)}</dd>
                </div>
                <div className="rounded-2xl bg-white px-3 py-2">
                  <dt className="text-xs uppercase tracking-[0.2em] text-stone-500">Revisor</dt>
                  <dd className="mt-1 font-medium text-stone-900">{receipt.reviewedByAdminEmail ?? "-"}</dd>
                </div>
              </dl>

              {receipt.rejectionReason ? (
                <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                  Motivo de rechazo: {receipt.rejectionReason}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
