import { Suspense } from "react";
import Link from "next/link";

import { AllPosts } from "@/app/components/Posts";
import CoverImage from "@/app/components/CoverImage";
import { client } from "@/sanity/lib/client";
import { allPoemsQuery, allPhotoCategoriesQuery } from "@/sanity/lib/queries";
import {
  AllPoemsQueryResult,
  AllPhotoCategoriesQueryResult,
} from "@/sanity.types";

export default async function Page() {
  const [poems, photoCategories] = await Promise.all([
    client.fetch<AllPoemsQueryResult>(allPoemsQuery),
    client.fetch<AllPhotoCategoriesQueryResult>(allPhotoCategoriesQuery),
  ]);

  return (
    <>
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container">
          <aside className="py-12 sm:py-12">
            <div className="pb-12 sm:pb-20">
              <p className="text-lg font-medium text-gray-900 font-mono">
                Hey, I&apos;m G.
              </p>
              <p className="mt-2 text-lg text-gray-600">
                Co-Founder @
                <a
                  href="https://captaindata.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-colors hover:text-blue-500"
                >
                  captaindata.com
                </a>{" "}
                and @
                <a
                  href="https://linbox.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-colors hover:text-blue-500"
                >
                  linbox.app
                </a>
              </p>
            </div>
            <Suspense>{await AllPosts()}</Suspense>
          </aside>
        </div>
      </div>
      <div className="container my-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Gallery
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            All content, from photos to poems, is my own creation.
          </p>
        </div>
        <div className="grid gap-12">
          {photoCategories && photoCategories.length > 0 && (
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Photos
                </h2>
                <Link
                  href="/photos"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-500"
                >
                  View all
                </Link>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
                {(photoCategories as any[]).map((category) => (
                  <Link
                    key={category._id}
                    href={`/photos/${category.slug}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden bg-gray-100 transition-all duration-300 group-hover:bg-gray-200 rounded-lg">
                      <div className="aspect-[4/3] relative">
                        {category.coverImage && (
                          <CoverImage
                            image={category.coverImage}
                            priority={false}
                            className="rounded-lg"
                          />
                        )}
                        <div className="absolute inset-0 bg-opacity-0 transition-all duration-300 group-hover:bg-black/20" />
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <h2 className="text-xl font-semibold text-white">
                          {category.title}
                        </h2>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {poems && poems.length > 0 && (
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
                  <Link
                    key={poem._id}
                    href={`/poems/${poem.slug}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden bg-gray-100 transition-all duration-300 group-hover:bg-gray-200 rounded-lg">
                      <div className="aspect-[4/3] relative">
                        {poem.coverImage && (
                          <CoverImage
                            image={poem.coverImage}
                            priority={false}
                            className="rounded-lg"
                          />
                        )}
                        <div className="absolute inset-0 bg-opacity-0 transition-all duration-300 group-hover:bg-black/20" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <h2 className="text-xl font-semibold text-white">
                          {poem.title}
                        </h2>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
