import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AdminCommercialSubmissionListItemDto } from "@/features/api/types";
import {
  formatAdminDate,
  formatArsCurrency,
  getReceiptStatusAppearance,
  getReceiptStatusLabel,
  getRegistrationStatusAppearance,
  getRegistrationStatusLabel,
} from "@/features/admin-submissions/admin-submissions.utils";
import {
  getCommercialKindAppearance,
  getCommercialKindLabel,
  getCommercialOptionLabel,
} from "@/features/admin-commercial-submissions/admin-commercial-submissions.utils";

type Props = {
  submissions: AdminCommercialSubmissionListItemDto[];
};

export function AdminCommercialSubmissionCompactTable({ submissions }: Props) {
  const location = useLocation();

  return (
    <div className="overflow-hidden rounded-[28px] border border-stone-200 bg-white/95 shadow-[0_20px_70px_-48px_rgba(15,23,42,0.35)]">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm text-stone-700">
          <thead className="bg-stone-50 text-xs uppercase tracking-[0.18em] text-stone-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Solicitud</th>
              <th className="px-4 py-3 font-semibold">Estado</th>
              <th className="px-4 py-3 font-semibold">Comprobante</th>
              <th className="px-4 py-3 font-semibold">Descuento</th>
              <th className="px-4 py-3 font-semibold">Revision</th>
              <th className="px-4 py-3 font-semibold">Accion</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => {
              const statusAppearance = getRegistrationStatusAppearance(submission.status);
              const receiptAppearance = submission.receiptStatus
                ? getReceiptStatusAppearance(submission.receiptStatus)
                : null;
              const kindAppearance = getCommercialKindAppearance(submission.commercialKind);

              return (
                <tr key={submission.id} className="border-t border-stone-200 align-top">
                  <th scope="row" className="px-4 py-4 font-medium text-stone-900">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-stone-950">{submission.companyName}</p>
                      <Badge className={kindAppearance.badgeClassName}>
                        <span aria-hidden="true" className={`mr-2 inline-block h-2 w-2 rounded-full ${kindAppearance.chipClassName}`} />
                        {getCommercialKindLabel(submission.commercialKind)}
                      </Badge>
                    </div>
                    <p className="mt-2 text-stone-600">
                      {getCommercialOptionLabel(submission.commercialOptionCode)}
                    </p>
                    <p className="mt-2 text-xs text-stone-500">
                      {formatArsCurrency(submission.totalAmountExpected)}
                      {submission.paymentPlanType === "TWO_INSTALLMENTS"
                        ? ` / ${submission.submittedReceiptsCount} de ${submission.installmentCountExpected} cuotas`
                        : ""}
                    </p>
                  </th>
                  <td className="px-4 py-4">
                    <Badge className={statusAppearance.badgeClassName}>
                      <span aria-hidden="true" className={`mr-2 inline-block h-2 w-2 rounded-full ${statusAppearance.dotClassName}`} />
                      {getRegistrationStatusLabel(submission.status)}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    {receiptAppearance ? (
                      <Badge className={receiptAppearance.badgeClassName}>
                        <span aria-hidden="true" className={`mr-2 inline-block h-2 w-2 rounded-full ${receiptAppearance.dotClassName}`} />
                        {getReceiptStatusLabel(submission.receiptStatus!)}
                      </Badge>
                    ) : (
                      <span className="text-stone-500">Sin comprobante</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-stone-600">
                    {submission.hasDiscountCoupon ? "Con cupon" : "Sin descuento"}
                  </td>
                  <td className="px-4 py-4 text-stone-600">
                    {submission.reviewedByAdminEmail ? (
                      <>
                        <p>{submission.reviewedByAdminEmail}</p>
                        <p className="mt-1 text-xs text-stone-500">
                          {formatAdminDate(submission.lastReviewedAt)}
                        </p>
                      </>
                    ) : (
                      <p className="text-stone-500">Sin revision</p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <Button asChild type="button" variant="outline" className="border-stone-300 bg-white">
                      <Link
                        to={`/admin/commercial/submissions/${submission.id}`}
                        state={{ from: `${location.pathname}${location.search}${location.hash}` }}
                      >
                        Abrir
                      </Link>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
