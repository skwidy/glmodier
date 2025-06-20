import { Suspense } from "react";

import { AllPosts } from "@/app/components/Posts";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { allPoemsQuery } from "@/sanity/lib/queries";
import { AllPoemsQueryResult } from "@/sanity.types";
import CoverImage from "@/app/components/CoverImage";

export default async function Page() {
  const { data: poems } = await sanityFetch({
    query: allPoemsQuery,
  });

  return (
    <>
      <div className="container my-24">
        <div className="grid gap-12">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Poésie
              </h2>
              <Link
                href="/poems"
                className="text-sm font-semibold text-blue-600 hover:text-blue-500"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {poems?.slice(0, 3).map((poem: AllPoemsQueryResult[0]) => (
                <article key={poem._id} className="group">
                  <Link href={`/poems/${poem.slug}`} className="block">
                    <div className="aspect-[16/9] overflow-hidden rounded-lg bg-gray-100">
                      {poem.coverImage && (
                        <div className="transition-transform duration-300 group-hover:scale-105">
                          <CoverImage
                            image={poem.coverImage}
                            priority={false}
                          />
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {poem.title}
                      </h2>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense>{await AllPosts()}</Suspense>
          </aside>
        </div>
      </div>
    </>
  );
}
