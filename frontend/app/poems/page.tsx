import type { Metadata } from "next";
import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/live";
import { allPoemsQuery } from "@/sanity/lib/queries";
import { AllPoemsQueryResult } from "@/sanity.types";
import Date from "@/app/components/Date";
import CoverImage from "@/app/components/CoverImage";

export const metadata: Metadata = {
  title: "Poésie",
  description: "Recueil de poèmes.",
};

export default async function PoemsPage() {
  const { data: poems } = await sanityFetch({
    query: allPoemsQuery,
  });

  return (
    <div className="my-12 lg:my-24">
      <div className="container">
        <div className="pb-6 border-b border-gray-100">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
              Poésie
            </h1>
            <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
              Recueil de poèmes
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {poems?.map((poem: AllPoemsQueryResult[0]) => (
            <article key={poem._id} className="group">
              <Link href={`/poems/${poem.slug}`} className="block">
                <div className="aspect-[16/9] overflow-hidden rounded-lg bg-gray-100">
                  {poem.coverImage && (
                    <div className="transition-transform duration-300 group-hover:scale-105">
                      <CoverImage image={poem.coverImage} priority={false} />
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {poem.title}
                  </h2>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <Date dateString={poem.date} />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {(!poems || poems.length === 0) && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No poems yet</h3>
            <p className="mt-2 text-gray-600">
              Create your first poem in the Sanity Studio.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 