import { Metadata } from "next";

const SITE_URL = "https://nii-gik.ru";

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
}

export function constructMetadata({
  title = "ООО НИИ «ГИК»",
  description = "Профессиональные решения в области инженерных изысканий, землеустройства и кадастра.",
  image = "/pribor.png",
  icons = "/favicon.ico",
  noIndex = false,
  canonicalUrl,
}: MetadataProps = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@niigik",
    },
    icons,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
