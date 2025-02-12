import sanityClient from "./sanityClient";

export async function fetchHomepageGallery() {
  const query = `*[_type == "homepageGallery"]{
    title,
    description,
    photos[]->{
      title,
      "imageUrl": image.asset->url,
      height, 
      width,
      x,
      y,
      Work_X,
      Work_Y,
    }
  }`;

  const data = await sanityClient.fetch(query);
  // console.log("Fetched Homepage Gallery:", data); // Add this line for debugging
  return data[0]; // Ensure it returns a single object if that's expected
}

export async function fetchProjects() {
  const query = `*[_type == "project" && !(_id in path("drafts.**"))]{
    title,
    order,
    "photos": photos[]->{
      "thumbnailUrl": image.asset->url + "?w=800&h=800&fit=max&fm=webp",  
      "url": image.asset->url + "?w=2000&h=2000&fit=max&fm=webp",
      Work_X,
      Work_Y,
      orientation,
    }
  }`;

  const data = await sanityClient.fetch(query);
  // console.log("data:", data);
  // console.log("Fetched Projects:", JSON.stringify(data, null, 2)); // Add this line for debugging
  return data; // Return the array of projects
}

export async function fetchAbout() {
  const query = `*[_type == "about"]{
    name,
    bio,
    "profileImageUrl": profileImage.asset->url,
    contactInfo,
    selectClients,
  }`;

  const data = await sanityClient.fetch(query);
  return data[0]; // Ensure it returns a single object if that's expected
}

export async function fetchSEO() {
  const query = `*[_type == "seo"][0] { 
    "title": title,
    "description": description,
    "ogImage": ogImage.asset->url,
    "canonicalUrl": canonicalUrl
  }`;

  try {
    const seoData = await sanityClient.fetch(query);

    if (!seoData) {
      console.warn("⚠️ No SEO data found in Sanity.");
      return null;
    }

    return seoData; // ✅ Returns a single object (not an array)
  } catch (error) {
    console.error("❌ Error fetching SEO data from Sanity:", error);
    return null;
  }
}
