export async function GET() {
    const baseUrl = "https://www.kanamotojima.com";
  
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
        </url>
      </urlset>
    `;
  
    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }