"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Date from "@/app/components/Date";
import CoverImage from "@/app/components/CoverImage";

export default function PoemsList({
  poems,
  tags,
}: {
  poems: any;
  tags: any;
}) {
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag");

  const filteredPoems = selectedTag
    ? poems?.filter((poem: any) =>
        poem.tags?.some((tag: any) => tag.slug === selectedTag)
      )
    : poems;

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
        <div className="flex items-center gap-4 my-8">
          <Link
            href="/poems"
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              !selectedTag
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            All
          </Link>
          {tags?.map((tag: any) => (
            <Link
              key={tag._id}
              href={`/poems?tag=${tag.slug}`}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedTag === tag.slug
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {tag.name}
            </Link>
          ))}
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {filteredPoems?.map((poem: any) => (
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

        {(!filteredPoems || filteredPoems.length === 0) && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">
              No poems found for this tag
            </h3>
            <p className="mt-2 text-gray-600">
              Please select another tag or create a new poem in the Sanity
              Studio.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 