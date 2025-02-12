<script>
  import HomepageGallery from "../components/homepage/homepageGallery.svelte";
  console.log("Built by Nick Bechtel - https://www.nickbechtel.com");

  export let data;
  let seo = data.SEO;
  let seoData = data?.SEO?.seo?.[0] || {};

  console.log("SEO", seo);
  console.log("SEO Data", seoData);
</script>

<svelte:head>
  <link rel="stylesheet" href="https://use.typekit.net/dpd3bwl.css" />
  <!-- Google Analytics 4 -->
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-DC8G46H6DH"
  ></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-DC8G46H6DH");
  </script>

  <!-- Title & Description -->
  <title>{seoData?.title || "Kana Motojima"}</title>
  <meta
    name="description"
    content={seoData?.description || "Default description"}
  />
  <meta
    name="keywords"
    content="Kana Motojima, photography, visual artist, New York, fine art photography, contemporary art"
  />
  <meta name="robots" content="index, follow" />
  <link
    rel="canonical"
    href={seoData?.canonicalUrl || "https://www.kanamotojima.com/"}
  />

  <!-- Open Graph Meta -->
  <meta property="og:title" content={seoData?.title || "Kana Motojima"} />
  <meta
    property="og:description"
    content={seoData?.description || "Default description"}
  />
  <meta
    property="og:url"
    content={seoData?.canonicalUrl || "https://www.kanamotojima.com/"}
  />
  <meta
    property="og:image"
    content={seoData?.ogImage ||
      "https://www.kanamotojima.com/images/og-image.jpg"}
  />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Kana Motojima's photography work" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Kana Motojima" />
  <meta property="og:locale" content="ja_JP" />

  <!-- Twitter Meta -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:title"
    content={seoData?.title || "Kana Motojima - Visual Artist"}
  />
  <meta
    name="twitter:description"
    content={seoData?.description ||
      "Exploring intimacy and relationships through photography."}
  />
  <meta
    name="twitter:image"
    content={seoData?.ogImage ||
      "https://www.kanamotojima.com/images/default-og.jpg"}
  />

  <!-- Alternate Language (Japanese Audience) -->
  <link rel="alternate" hreflang="ja" href="https://www.kanamotojima.com/" />
  <meta http-equiv="Content-Language" content="ja" />
  <meta name="DC.language" content="ja" />

  <!-- Structured Data -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Kana Motojima",
      "url": "https://www.kanamotojima.com/",
      "description": "Kana Motojima is a New York-based visual artist exploring intimacy and relationships through photography.",
      "image": "{seoData?.ogImage || 'https://www.kanamotojima.com/images/og-image.jpg'}",
      "author": {
        "@type": "Person",
        "name": "Kana Motojima"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Kana Motojima Studio",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.kanamotojima.com/images/logo.png"
        }
      },
      "sameAs": [
        "https://www.instagram.com/yourhandle",
        "https://www.linkedin.com/in/yourprofile"
      ]
    }
  </script>

  <!-- Performance Optimizations -->
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta charset="UTF-8" />
  <link rel="preload" href="https://use.typekit.net/dpd3bwl.css" as="style" />
  <link rel="preconnect" href="https://use.typekit.net" />
  <link rel="dns-prefetch" href="https://use.typekit.net" />
  <!-- <link rel="icon" href="/favicon.ico" type="image/x-icon" /> -->
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <meta name="theme-color" content="#ffffff" />
</svelte:head>

{#if !data}
  <p>Failed to load homepage gallery. Please try again later.</p>
{:else}
  <HomepageGallery {data} />
{/if}
