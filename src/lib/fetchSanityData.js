import sanityClient from "./sanityClient";

export async function fetchHomepageGallery() {
  const query = `*[_type == "homepageGallery"]{
    title,
    description,
    photos[]->{
      title,
      "imageUrl": image.asset->url,
      x,
      y
    }
  }`;

  const data = await sanityClient.fetch(query);
  console.log("Fetched Homepage Gallery:", data); // Add this line for debugging
  return data[0]; // Ensure it returns a single object if that's expected
}

export async function fetchProjects() {
  const query = `*[_type == "project"]{
    title,
    "photos": photos[].asset->url
  }`;

  const data = await sanityClient.fetch(query);
  console.log("Fetched Projects:", data); // Add this line for debugging
  return data; // Return the array of projects
}
