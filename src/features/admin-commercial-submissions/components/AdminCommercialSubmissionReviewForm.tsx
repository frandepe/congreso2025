import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  AdminCommercialSubmissionDetailDto,
  RegistrationStatus,
} from "@/features/api/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InlineNotice } from "@/shared/ui/InlineNotice";
import { getUserFacingErrorMessage } from "@/shared/utils/getUserFacingErrorMessage";
import { useUpdateAdminCommercialSubmissionMutation } from "@/features/admin-commercial-submissions/admin-commercial-submissions.hooks";
import { commercialStatusOptions } from "@/features/admin-commercial-submissions/admin-commercial-submissions.constants";
import {
  getRegistrationStatusAppearance,
  getRegistrationStatusLabel,
} from "@/features/admin-submissions/admin-submissions.utils";

const reviewSchema = z.object({
  status: z.enum([
    "PENDING_REVIEW",
    "PARTIALLY_PAID",
    "FULLY_PAID",
    "REJECTED",
  ] satisfies [RegistrationStatus, ...RegistrationStatus[]]),
  internalNote: z
    .string()
    .max(1000, "La nota interna no puede superar los 1000 caracteres."),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

type Props = {
  submission: AdminCommercialSubmissionDetailDto;
};

const selectClassName =
  "h-11 w-full rounded-2xl border border-stone-200 bg-white px-4 text-sm text-stone-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

export function AdminCommercialSubmissionReviewForm({ submission }: Props) {
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const errorNoticeRef = useRef<HTMLDivElement | null>(null);
  const successNoticeRef = useRef<HTMLDivElement | null>(null);
  const updateMutation = useUpdateAdminCommercialSubmissionMutation(submission.id);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      status: submission.status,
      internalNote: submission.internalNote ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      status: submission.status,
      internalNote: submission.internalNote ?? "",
    });
    setSubmitMessage(null);
    setSubmitError(null);
  }, [form, submission.internalNote, submission.status]);

  useEffect(() => {
    if (submitError) errorNoticeRef.current?.focus();
  }, [submitError]);
  useEffect(() => {
    if (submitMessage) successNoticeRef.current?.focus();
  }, [submitMessage]);

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);
    setSubmitMessage(null);

    try {
      await updateMutation.mutateAsync({
        status: values.status,
        internalNote: values.internalNote.trim()
          ? values.internalNote.trim()
          : null,
      });
      setSubmitMessage("Cambios guardados.");
    } catch (error) {
      setSubmitError(
        getUserFacingErrorMessage(error, "No se pudieron guardar los cambios."),
      );
    }
  });

  const currentStatus = form.watch("status") ?? submission.status;
  const statusAppearance = getRegistrationStatusAppearance(currentStatus);

  return (
    <section className="rounded-[30px] border border-stone-200 bg-white/95 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
        Revision
      </p>
      <h2 className="mt-1 text-xl font-semibold text-stone-900">
        Actualizar estado administrativo
      </h2>
      <div className={`mt-4 rounded-2xl border px-4 py-3 ${statusAppearance.badgeClassName}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">
          Estado seleccionado
        </p>
        <p className="mt-1 text-base font-semibold">
          {getRegistrationStatusLabel(currentStatus)}
        </p>
      </div>

      <form className="mt-5 space-y-5" onSubmit={onSubmit}>
        <label className="block space-y-2">
          <Label htmlFor="status">Estado</Label>
          <select id="status" className={selectClassName} {...form.register("status")}>
            {commercialStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <Label htmlFor="internalNote">Nota interna</Label>
          <Textarea id="internalNote" rows={5} maxLength={1000} {...form.register("internalNote")} />
        </label>

        {submitError ? (
          <div ref={errorNoticeRef} tabIndex={-1}>
            <InlineNotice variant="error">{submitError}</InlineNotice>
          </div>
        ) : null}

        {submitMessage ? (
          <div ref={successNoticeRef} tabIndex={-1}>
            <InlineNotice variant="success">{submitMessage}</InlineNotice>
          </div>
        ) : null}

        <div className="flex justify-end">
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </section>
  );
}
