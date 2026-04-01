import type {
  CommercialKind,
  CommercialOptionCode,
  RegistrationStatus,
} from "@/features/api/types";

export const ADMIN_COMMERCIAL_SUBMISSIONS_PAGE_SIZE = 20;

export const commercialKindOptions: Array<{
  value: CommercialKind;
  label: string;
}> = [
  { value: "STAND", label: "Stand" },
  { value: "ADVERTISING", label: "Publicidad" },
];

export const commercialOptionOptions: Array<{
  value: CommercialOptionCode;
  label: string;
}> = [
  { value: "STAND_SPACE_3X3", label: "Stand 3x3" },
  { value: "ADVERTISING_WEB_PAGE", label: "Página" },
  { value: "ADVERTISING_WEB_AND_SCREEN", label: "Página y pantalla" },
  {
    value: "ADVERTISING_BANNERS_CLIENT_PROVIDED",
    label: "Banners provistos por empresa",
  },
  {
    value: "ADVERTISING_BANNERS_INCLUDED_BY_CONGRESS",
    label: "Banners incluidos por congreso",
  },
];

export const commercialStatusOptions: Array<{
  value: RegistrationStatus;
  label: string;
}> = [
  { value: "PENDING_REVIEW", label: "Pendiente de revision" },
  { value: "PARTIALLY_PAID", label: "Parcialmente pagada" },
  { value: "FULLY_PAID", label: "Pagada completa" },
  { value: "REJECTED", label: "Rechazada" },
];
