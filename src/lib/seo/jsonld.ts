import { org } from "@/data/org";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "name": org.shortName,
    "legalName": org.fullName,
    "url": "https://nii-gik.ru",
    "telephone": org.phone,
    "email": org.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": org.address.street,
      "addressLocality": org.address.city,
      "addressRegion": org.address.region,
      "postalCode": org.address.postalCode,
      "addressCountry": "RU"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": org.phone,
      "contactType": "customer service"
    },
    "taxID": org.inn,
    "identifier": [
      {
        "@type": "PropertyValue",
        "name": "ОГРН",
        "value": org.ogrn
      },
      {
        "@type": "PropertyValue",
        "name": "КПП",
        "value": org.kpp
      }
    ]
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": org.shortName,
    "url": "https://nii-gik.ru",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://nii-gik.ru/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}
