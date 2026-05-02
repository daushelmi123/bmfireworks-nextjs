import { Helmet, HelmetProvider } from 'react-helmet-async';

const SEO = ({
  title = "BMFireworks - Pengedar Bunga Api Berlesen Malaysia | Fireworks CNY Raya 2026",
  description = "Pengedar bunga api berlesen #1 di Malaysia. Permit bunga api CNY & Hari Raya 2026 DIBUKA! 100% legal, lesen PDRM. Mercun, bunga api perkahwinan, acara korporat. Penghantaran ke seluruh Semenanjung. Johor, Perak, KL, Selangor.",
  keywords = "BMFireworks, Bearboom, bunga api Malaysia, fireworks Malaysia, legal fireworks, licensed fireworks Malaysia, fireworks distributor, wedding fireworks, Raya fireworks 2026, CNY fireworks 2026, Deepavali fireworks, corporate events fireworks, Johor fireworks, Perak fireworks, permit bunga api, mercun Malaysia, bunga api johor, bunga api perak, bunga api selangor, bunga api KL, pengedar bunga api berlesen, fireworks permit Malaysia, bunga api perkahwinan, bunga api CNY 2026, bunga api Hari Raya 2026, lesen PDRM bunga api, 足金八尺炮, 精品八尺特红, Galaxy Premium fireworks, 烟花 Malaysia",
  ogImage = "/images/mascot.png"
}) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.href : 'https://bmfirework.com';

  return (
    <HelmetProvider>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content="en_MY" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={siteUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={ogImage} />

        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Bearboom × BMFireworks" />
        <meta name="geo.region" content="MY" />
        <meta name="geo.placename" content="Kuala Lumpur" />

        {/* Structured Data for Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Bearboom × BMFireworks",
            "description": description,
            "url": "https://bmfirework.com",
            "telephone": "+60-11-124-60415",
            "email": "admin@bmfireworks.com",
            "priceRange": "RM10-RM1000",
            "@id": siteUrl,
            "image": ogImage,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kuala Lumpur",
              "addressCountry": "MY"
            },
            "openingHours": "Mo-Sa 09:00-18:00",
            "paymentAccepted": "Cash, Bank Transfer, Touch n Go, Grab Pay",
            "areaServed": [
              "Perlis", "Kedah", "Pulau Pinang", "Perak", "Kelantan",
              "Terengganu", "Pahang", "Selangor", "Kuala Lumpur",
              "Putrajaya", "Negeri Sembilan", "Melaka", "Johor"
            ]
          })}
        </script>
      </Helmet>
    </HelmetProvider>
  );
};

export default SEO;
