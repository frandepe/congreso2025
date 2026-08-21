import { useMutation } from "@tanstack/react-query";
import type { SponsorshipContactRequest } from "@/features/api/types";
import { createSponsorshipContactRequest } from "@/features/sponsorship-contact/sponsorship-contact.api";

export function useCreateSponsorshipContactMutation() {
  return useMutation({
    mutationFn: (payload: SponsorshipContactRequest) =>
      createSponsorshipContactRequest(payload),
  });
}
