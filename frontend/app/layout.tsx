import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import { VisualEditing, toPlainText } from "next-sanity";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import Script from "next/script";

import DraftModeToast from "@/app/components/DraftModeToast";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { handleError } from "./client-utils";

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const inter = localFont({
  src: "../public/fonts/InterVariable.ttf",
  variable: "--font-inter",
  display: "fallback",
});

const eb_garamond = localFont({
  src: [
    {
      path: "../public/fonts/eb-garamond-v31-latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/eb-garamond-v31-latin-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/eb-garamond-v31-latin-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/eb-garamond-v31-latin-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/eb-garamond-v31-latin-800.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/eb-garamond-v31-latin-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/eb-garamond-v31-latin-500italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/eb-garamond-v31-latin-600italic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/eb-garamond-v31-latin-700italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/eb-garamond-v31-latin-800italic.woff2",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-eb-garamond",
  display: "fallback",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${eb_garamond.variable} bg-white text-black`}
    >
      <head>
        <Script
          async
          src="https://tally.so/widgets/embed.js"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <section className="min-h-screen pt-24">
          {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
              <VisualEditing />
            </>
          )}
          {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
          <SanityLive onError={handleError} />
          <Header />
          <main className="">{children}</main>
          <Footer />
        </section>
        <SpeedInsights />
      </body>
    </html>
  );
}
