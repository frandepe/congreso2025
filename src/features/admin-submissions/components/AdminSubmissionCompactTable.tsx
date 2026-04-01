import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AdminSubmissionListItemDto } from "@/features/api/types";
import {
  formatAdminDate,
  formatArsCurrency,
  getPaymentPlanLabel,
  getRegistrationStatusAppearance,
  getRegistrationStatusLabel,
} from "@/features/admin-submissions/admin-submissions.utils";

type AdminSubmissionCompactTableProps = {
  submissions: AdminSubmissionListItemDto[];
};

export function AdminSubmissionCompactTable({
  submissions,
}: AdminSubmissionCompactTableProps) {
  const location = useLocation();

  return (
    <div className="overflow-hidden rounded-[28px] border border-stone-200 bg-white/95 shadow-[0_20px_70px_-48px_rgba(15,23,42,0.35)]">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm text-stone-700">
          <caption className="sr-only">
            Vista compacta de solicitudes administrativas
          </caption>
          <thead className="bg-stone-50 text-xs uppercase tracking-[0.18em] text-stone-500">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">
                Solicitud
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Estado
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Pago
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Comprobantes
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Revision
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Accion
              </th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => {
              const statusAppearance = getRegistrationStatusAppearance(
                submission.status,
              );

              return (
                <tr
                  key={submission.id}
                  className="border-t border-stone-200 align-top"
                >
                  <th scope="row" className="px-4 py-4 font-medium text-stone-900">
                    <div>
                      <p className="font-semibold text-stone-950">
                        {submission.firstName} {submission.lastName}
                      </p>
                      <p className="mt-1 text-stone-500">
                        {submission.registrationOptionLabelSnapshot}
                      </p>
                      <p className="mt-2 text-xs text-stone-500">
                        {formatArsCurrency(submission.totalAmountExpected)} /{" "}
                        {getPaymentPlanLabel(submission.paymentPlanType)}
                      </p>
                    </div>
                  </th>
                  <td className="px-4 py-4">
                    <Badge className={statusAppearance.badgeClassName}>
                      <span
                        aria-hidden="true"
                        className={`mr-2 inline-block h-2 w-2 rounded-full ${statusAppearance.dotClassName}`}
                      />
                      {getRegistrationStatusLabel(submission.status)}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-stone-600">
                    <p>{getPaymentPlanLabel(submission.paymentPlanType)}</p>
                    <p className="mt-1 text-xs text-stone-500">
                      {submission.installmentCountExpected} cuotas esperadas
                    </p>
                  </td>
                  <td className="px-4 py-4 text-stone-600">
                    <p>
                      {submission.approvedReceiptsCount} aprobados /{" "}
                      {submission.submittedReceiptsCount} enviados
                    </p>
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
                    <Button
                      asChild
                      type="button"
                      variant="outline"
                      className="border-stone-300 bg-white"
                    >
                      <Link
                        to={`/admin/submissions/${submission.id}`}
                        state={{
                          from: `${location.pathname}${location.search}${location.hash}`,
                        }}
                        aria-label={`Abrir solicitud de ${submission.firstName} ${submission.lastName}`}
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
