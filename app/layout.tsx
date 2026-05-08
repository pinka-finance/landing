import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pinka.finance";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "pinka — Doniraj podcastu jednim skenom",
    template: "%s · pinka",
  },
  description:
    "Pinka spaja SEPA Instant i Monerium EURe tako da donatori daju, a kreatori i organizacije primaju — bez kartičnih provizija, bez čekanja, bez kompromisa.",
  keywords: [
    "podcast donacije",
    "SEPA Instant",
    "Monerium",
    "EURe",
    "crowdfunding",
    "Hrvatska",
    "blockchain",
    "fintech",
  ],
  authors: [{ name: "pinka.finance" }],
  creator: "pinka.finance",
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: siteUrl,
    siteName: "pinka",
    title: "pinka — Doniraj podcastu jednim skenom",
    description:
      "SEPA Instant + Monerium EURe. Bez kartičnih provizija. Bez čekanja. 100% donacije ide kreatoru ili organizaciji.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "pinka — Doniraj podcastu jednim skenom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "pinka — Doniraj podcastu jednim skenom",
    description:
      "SEPA Instant + Monerium EURe. Bez kartičnih provizija. Bez čekanja.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/icon",
    apple: "/icon",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FBF8F3",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        {/* Skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-cream focus:no-underline"
        >
          Preskoči na sadržaj
        </a>
        <MotionProvider>{children}</MotionProvider>
        <OrganizationJsonLd />
      </body>
    </html>
  );
}

function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "pinka",
    url: siteUrl,
    logo: `${siteUrl}/icon`,
    description:
      "Hrvatska platforma za zero-fee crowdfunding podcasta — SEPA Instant + Monerium EURe.",
    sameAs: ["https://github.com/pinka-finance"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "general",
        email: "hello@pinka.finance",
        areaServed: "EU",
        availableLanguage: ["Croatian", "English"],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
