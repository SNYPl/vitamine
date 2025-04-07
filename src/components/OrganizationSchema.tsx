"use client";

import { useEffect, useRef } from "react";

interface OrganizationSchemaProps {
  siteUrl: string;
  logoUrl: string;
}

export default function OrganizationSchema({
  siteUrl,
  logoUrl,
}: OrganizationSchemaProps) {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Create organization schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Vitamine Store",
      url: siteUrl,
      logo: logoUrl,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+995 551 607 474", // Replace with actual contact number
        contactType: "customer service",
        availableLanguage: "English",
      },
      sameAs: [
        "https://www.facebook.com/vitamine-store", // Replace with actual social links
        "https://www.instagram.com/vitamine-store",
        "https://twitter.com/vitamine_store",
      ],
    };

    // Create or update the script element
    if (!scriptRef.current) {
      scriptRef.current = document.createElement("script");
      scriptRef.current.type = "application/ld+json";
      document.head.appendChild(scriptRef.current);
    }

    scriptRef.current.textContent = JSON.stringify(organizationSchema);

    // Cleanup on unmount
    return () => {
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, [siteUrl, logoUrl]);

  // This component doesn't render anything visible
  return null;
}
