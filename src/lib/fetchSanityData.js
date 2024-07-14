import sanityClient from './sanityClient';

export async function fetchPhotographer() {
  const query = `*[_type == "photographer"]{
    name,
    bio,
    "profileImage": profileImage.asset->url,
    contactInfo
  }`;
  return await sanityClient.fetch(query);
}

export async function fetchHomepageGallery() {
  const query = `*[_type == "homepageGallery"]{
    title,
    description,
    photos[]->{
      title,
      "imageUrl": image.asset->url
    }
  }`;
  return await sanityClient.fetch(query);
}

export async function fetchProjects() {
  const query = `*[_type == "project"]{
    title,
    description,
    photos[]->{
      title,
      "imageUrl": image.asset->url
    },
    homepageGallery->{
      title,
      description
    }
  }`;
  return await sanityClient.fetch(query);
}
