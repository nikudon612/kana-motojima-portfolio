import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: 'your_project_id', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your dataset name
  useCdn: true, // Use the CDN for fast, cacheable responses
});
