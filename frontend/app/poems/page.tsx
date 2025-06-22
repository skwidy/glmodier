import type { Metadata } from "next";
import { Suspense } from 'react'

import { sanityFetch } from "@/sanity/lib/live";
import { allPoemsQuery, allPoemTagsQuery } from "@/sanity/lib/queries";
import PoemsList from "@/app/components/PoemsList";

export const metadata: Metadata = {
  title: "Poésie",
  description: "Recueil de poèmes.",
};

export default async function PoemsPage() {
  const [{ data: poems }, { data: tags }] = await Promise.all([
    sanityFetch<any>({ query: allPoemsQuery }),
    sanityFetch<any>({ query: allPoemTagsQuery }),
  ]);

  // This check can be improved with a proper loading/error state
  if (!poems || !tags) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading poems...</div>}>
      <PoemsList poems={poems} tags={tags} />
    </Suspense>
  )
} 