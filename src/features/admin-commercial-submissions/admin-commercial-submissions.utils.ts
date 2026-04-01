import type {
  CommercialKind,
  CommercialOptionCode,
} from "@/features/api/types";

export function getCommercialKindLabel(kind: CommercialKind) {
  return kind === "STAND" ? "Stand" : "Publicidad";
}

export function getCommercialKindAppearance(kind: CommercialKind) {
  if (kind === "STAND") {
    return {
      badgeClassName:
        "border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-50 hover:text-emerald-900",
      chipClassName: "bg-emerald-500",
      summaryClassName: "bg-emerald-50 text-emerald-900",
    };
  }

  return {
    badgeClassName:
      "border-sky-200 bg-sky-50 text-sky-900 hover:bg-sky-50 hover:text-sky-900",
    chipClassName: "bg-sky-500",
    summaryClassName: "bg-sky-50 text-sky-900",
  };
}

export function getCommercialOptionLabel(optionCode: CommercialOptionCode) {
  switch (optionCode) {
    case "STAND_SPACE_3X3":
      return "Stand 3x3";
    case "ADVERTISING_WEB_PAGE":
      return "Publicidad en página";
    case "ADVERTISING_WEB_AND_SCREEN":
      return "Publicidad en página y pantalla";
    case "ADVERTISING_BANNERS_CLIENT_PROVIDED":
      return "Banners provistos por empresa";
    case "ADVERTISING_BANNERS_INCLUDED_BY_CONGRESS":
      return "Banners incluidos por congreso";
    default:
      return optionCode;
  }
}
