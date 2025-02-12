import { fetchHomepageGallery, fetchSEO } from "$lib/fetchSanityData";

// Function to fetch homepage gallery
async function getHomepageGallery() {
  try {
    const data = await fetchHomepageGallery();
    console.log("✅ Fetched homepageGallery:", data);
    return { data };
  } catch (error) {
    console.error("❌ Error fetching homepageGallery:", error);
    return { data: null, error: "Failed to fetch homepage gallery" };
  }
}

// Function to fetch SEO data
async function getSEO() {
  try {
    const seo = await fetchSEO();
    console.log("✅ Fetched SEO Data:", seo);
    return { seo };
  } catch (error) {
    console.error("❌ Error fetching SEO Data:", error);
    return { seo: null, error: "Failed to fetch SEO data" };
  }
}

// SvelteKit `load` function
export async function load() {
  const data = await getHomepageGallery();
  const seo = await getSEO();

  return {
    SEO: seo,
    props: {
      ...data,
    },
  };
}
