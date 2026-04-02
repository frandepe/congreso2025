import { useEffect } from "react";
import { warmupBackend } from "@/shared/api/warmup";

export function useBackendWarmup() {
  useEffect(() => {
    void warmupBackend();
  }, []);
}
