import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "PICMYFIT - AI-Powered Personal Fashion Stylist | Luxury Style Recommendations",
  description = "Transform your style with PICMYFIT's AI-powered fashion intelligence. Get personalized luxury outfit recommendations for every body type, age, and budget. Professional styling made accessible.",
  keywords = "AI fashion stylist, personal stylist, outfit recommendations, luxury fashion, style advice, fashion AI, wardrobe consultant, outfit planner, fashion technology, style matching, body type styling, fashion intelligence",
  image = "https://picmyfit.xyz/og-image.jpg",
  url = "https://picmyfit.xyz/",
  type = "website",
  noIndex = false
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="PICMYFIT" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:image:alt" content={title} />
      <meta property="twitter:creator" content="@picmyfit" />
      <meta property="twitter:site" content="@picmyfit" />
    </Helmet>
  );
};

export default SEOHead;