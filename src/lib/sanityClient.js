import { createClient } from "@sanity/client";

export default createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true, // Use the CDN for fast, cacheable responses
  apiVersion: "2024-07-08",
  token: import.meta.env.VITE_SANITY_API_TOKEN,
  ignoreBrowserTokenWarning: true,
});
