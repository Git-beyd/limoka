import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Geist_Mono, Exo_2 } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const exo2 = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LIMOKA — Plateforme Nationale de Paiement Numérique de la RDC",
  description:
    "LIMOKA est une infrastructure publique souveraine pour connecter tous les acteurs de la finance numérique en RDC : banques, fintechs, opérateurs mobiles et services publics.",
  keywords: [
    "LIMOKA",
    "paiement instantané",
    "transfert argent RDC",
    "mobile money",
    "fintech RDC",
    "switch national de paiement",
    "RDC",
    "banque numérique",
  ],
  authors: [{ name: "LIMOKA RDC" }],
  openGraph: {
    title: "LIMOKA — Interopérable. Instantané. Inclusif. Sécurisé.",
    description:
      "Le switch national de paiement qui connecte l'écosystème financier de la RDC.",
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    siteName: "LIMOKA RDC",
  },
  twitter: {
    card: "summary_large_image",
    title: "LIMOKA — Plateforme Nationale de Paiement de la RDC",
    description:
      "Le switch national de paiement qui connecte banques, portefeuilles mobiles, fintechs et services publics de la RDC.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030308" },
    { media: "(prefers-color-scheme: light)", color: "#f0f0fa" },
  ],
};

// Injected synchronously before first paint — prevents theme flash
const themeScript = `(function(){try{var t=localStorage.getItem('limoka-theme');var p=t||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',p);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable} ${exo2.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
