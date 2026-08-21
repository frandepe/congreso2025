import type {
  SponsorshipContactCreatedDto,
  SponsorshipContactRequest,
} from "@/features/api/types";
import { apiRequest } from "@/shared/api/client";

export function createSponsorshipContactRequest(
  payload: SponsorshipContactRequest,
) {
  return apiRequest<SponsorshipContactCreatedDto>({
    path: "/sponsorship-contact",
    method: "POST",
    body: payload,
  });
}
