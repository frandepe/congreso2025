import type {
  CommercialAdvertisingPricingOptionDto,
  CommercialOptionCode,
} from "@/features/api/types";

export const commercialAdvertisingOptionContent: Record<
  Exclude<CommercialOptionCode, "STAND_SPACE_3X3">,
  {
    title: string;
    description: string;
  }
> = {
  ADVERTISING_WEB_PAGE: {
    title: "Publicidad en página",
    description:
      "Presencia de la marca dentro del sitio del congreso con contratación simple y pago único.",
  },
  ADVERTISING_WEB_AND_SCREEN: {
    title: "Página y pantalla",
    description:
      "Incluye presencia digital y exhibición adicional en pantalla durante el congreso.",
  },
  ADVERTISING_BANNERS_CLIENT_PROVIDED: {
    title: "Banners provistos por la empresa",
    description:
      "La empresa entrega el banner final y el congreso gestiona su exhibición en el evento.",
  },
  ADVERTISING_BANNERS_INCLUDED_BY_CONGRESS: {
    title: "Banners incluidos por el congreso",
    description:
      "El congreso incluye la producción del banner dentro del valor del paquete.",
  },
};

export function getCommercialAdvertisingOptionDescription(
  option: CommercialAdvertisingPricingOptionDto,
) {
  return commercialAdvertisingOptionContent[
    option.code as keyof typeof commercialAdvertisingOptionContent
  ].description;
}
