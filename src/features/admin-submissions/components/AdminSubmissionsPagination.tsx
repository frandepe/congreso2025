import { Button } from "@/components/ui/button";
import type { PaginationMeta } from "@/features/api/types";

type AdminSubmissionsPaginationProps = {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
};

export function AdminSubmissionsPagination({
  meta,
  onPageChange,
}: AdminSubmissionsPaginationProps) {
  const canGoBack = meta.page > 1;
  const canGoForward = meta.page < meta.totalPages;

  return (
    <nav
      aria-label="Paginacion de solicitudes"
      className="flex flex-col gap-4 rounded-3xl border border-stone-300 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="text-sm text-stone-600">
        Pagina {meta.page} de {meta.totalPages}. Total: {meta.total}
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={!canGoBack}
          onClick={() => onPageChange(meta.page - 1)}
        >
          Anterior
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={!canGoForward}
          onClick={() => onPageChange(meta.page + 1)}
        >
          Siguiente
        </Button>
      </div>
    </nav>
  );
}
