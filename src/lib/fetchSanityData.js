import sanityClient from "./sanityClient";

export async function fetchHomepageGallery() {
  const query = `*[_type == "homepageGallery"]{
    title,
    description,
    photos[]->{
      title,
      "imageUrl": image.asset->url,
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
  const query = `*[_type == "project"]{
    title,
    "photos": photos[]->{
      "url": image.asset->url,
      Work_X,
      Work_Y,
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
