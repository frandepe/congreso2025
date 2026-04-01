function readRequiredEnv(name: "VITE_API_BASE_URL") {
  const value = import.meta.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
}

function readOptionalEnv(name: "VITE_GA_MEASUREMENT_ID") {
  const value = import.meta.env[name]?.trim();
  return value ? value : undefined;
}

export const env = {
  apiBaseUrl: readRequiredEnv("VITE_API_BASE_URL"),
  gaMeasurementId: readOptionalEnv("VITE_GA_MEASUREMENT_ID"),
};
