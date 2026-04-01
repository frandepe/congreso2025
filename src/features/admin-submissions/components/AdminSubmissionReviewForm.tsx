import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  AdminSubmissionDetailDto,
  RegistrationStatus,
} from "@/features/api/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { registrationStatusOptions } from "@/features/admin-submissions/admin-submissions.constants";
import { useUpdateAdminSubmissionMutation } from "@/features/admin-submissions/admin-submissions.hooks";
import {
  getRegistrationStatusAppearance,
  getRegistrationStatusLabel,
} from "@/features/admin-submissions/admin-submissions.utils";
import { InlineNotice } from "@/shared/ui/InlineNotice";
import { getUserFacingErrorMessage } from "@/shared/utils/getUserFacingErrorMessage";

const reviewSchema = z.object({
  status: z.enum([
    "PENDING_REVIEW",
    "PARTIALLY_PAID",
    "FULLY_PAID",
    "REJECTED",
  ] satisfies [RegistrationStatus, ...RegistrationStatus[]], {
    error: "Selecciona un estado valido.",
  }),
  internalNote: z
    .string()
    .max(1000, "La nota interna no puede superar los 1000 caracteres."),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

type AdminSubmissionReviewFormProps = {
  submission: AdminSubmissionDetailDto;
};

const selectClassName =
  "h-11 w-full rounded-2xl border border-stone-200 bg-white px-4 text-sm text-stone-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

export function AdminSubmissionReviewForm({
  submission,
}: AdminSubmissionReviewFormProps) {
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const errorNoticeRef = useRef<HTMLDivElement | null>(null);
  const successNoticeRef = useRef<HTMLDivElement | null>(null);
  const updateMutation = useUpdateAdminSubmissionMutation(submission.id);

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
    if (submitError) {
      errorNoticeRef.current?.focus();
    }
  }, [submitError]);

  useEffect(() => {
    if (submitMessage) {
      successNoticeRef.current?.focus();
    }
  }, [submitMessage]);

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitMessage(null);
    setSubmitError(null);

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
        getUserFacingErrorMessage(
          error,
          "No se pudieron guardar los cambios.",
        ),
      );
    }
  }, (errors) => {
    setSubmitMessage(null);
    setSubmitError("Revisa los campos marcados antes de guardar.");

    if (errors.status) {
      form.setFocus("status");
      return;
    }

    if (errors.internalNote) {
      form.setFocus("internalNote");
    }
  });

  const currentStatus = form.watch("status") ?? submission.status;
  const statusAppearance = getRegistrationStatusAppearance(currentStatus);
  const statusError = form.formState.errors.status?.message;
  const internalNoteError = form.formState.errors.internalNote?.message;

  return (
    <section
      aria-labelledby="admin-review-heading"
      className="rounded-[30px] border border-stone-200 bg-white/95 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)]"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
          Revision
        </p>
        <h2
          id="admin-review-heading"
          className="mt-1 text-xl font-semibold text-stone-900"
        >
          Actualizar estado administrativo
        </h2>
        <div
          aria-describedby="admin-review-status-description"
          className={`mt-4 rounded-2xl border px-4 py-3 ${statusAppearance.badgeClassName}`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">
            Estado seleccionado
          </p>
          <p className="mt-1 text-base font-semibold">
            {getRegistrationStatusLabel(currentStatus)}
          </p>
          <p
            id="admin-review-status-description"
            className="mt-2 text-sm leading-6 text-stone-700"
          >
            El color acompaña el estado, pero la referencia principal es este
            texto: {getRegistrationStatusLabel(currentStatus)}.
          </p>
        </div>
      </div>

      <form
        className="mt-5 space-y-5"
        aria-describedby={
          submitError
            ? "admin-review-error"
            : submitMessage
              ? "admin-review-success"
              : undefined
        }
        onSubmit={onSubmit}
      >
        <label className="block space-y-2">
          <Label htmlFor="status">Estado</Label>
          <select
            id="status"
            className={selectClassName}
            disabled={updateMutation.isPending}
            aria-invalid={Boolean(statusError)}
            aria-describedby={
              statusError
                ? "admin-review-status-help admin-review-status-error"
                : "admin-review-status-help"
            }
            {...form.register("status")}
          >
            {registrationStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p id="admin-review-status-help" className="text-sm text-stone-500">
            Selecciona el nuevo estado administrativo de la solicitud.
          </p>
          {statusError ? (
            <p
              id="admin-review-status-error"
              className="text-sm font-medium text-red-700"
            >
              {statusError}
            </p>
          ) : null}
        </label>

        <label className="block space-y-2">
          <Label htmlFor="internalNote">Nota interna</Label>
          <Textarea
            id="internalNote"
            rows={5}
            disabled={updateMutation.isPending}
            placeholder="Agregar una nota interna para el comite"
            maxLength={1000}
            aria-invalid={Boolean(internalNoteError)}
            aria-describedby={
              internalNoteError
                ? "admin-review-note-help admin-review-note-error"
                : "admin-review-note-help"
            }
            {...form.register("internalNote")}
          />
          <p id="admin-review-note-help" className="text-sm text-stone-500">
            Esta nota es interna y sirve para dejar contexto para el comite. Maximo
            1000 caracteres.
          </p>
          {internalNoteError ? (
            <p
              id="admin-review-note-error"
              className="text-sm font-medium text-red-700"
            >
              {internalNoteError}
            </p>
          ) : null}
        </label>

        {submitError ? (
          <div
            id="admin-review-error"
            ref={errorNoticeRef}
            tabIndex={-1}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            <InlineNotice variant="error" role="alert" ariaLive="assertive">
              {submitError}
            </InlineNotice>
          </div>
        ) : null}

        {submitMessage ? (
          <div
            id="admin-review-success"
            ref={successNoticeRef}
            tabIndex={-1}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            <InlineNotice variant="success" role="status" ariaLive="polite">
              {submitMessage}
            </InlineNotice>
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
