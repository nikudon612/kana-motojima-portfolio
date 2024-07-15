import { fetchHomepageGallery } from '$lib/fetchSanityData';

export async function load() {
  try {
    const data = await fetchHomepageGallery();
    console.log("Fetched homepageGallery in load function:", data); // Debugging log
    return {
      props: {
        data
      }
    };
  } catch (error) {
    console.error('Error fetching homepageGallery:', error);
    return {
      props: {
        data: null,
        error: 'Failed to fetch homepage gallery'
      }
    };
  }
}
