import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { type PortableTextBlock } from "next-sanity";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import PortableText from "@/app/components/PortableText";
import { sanityFetch } from "@/sanity/lib/live";
import { poemPagesSlugs, poemQuery } from "@/sanity/lib/queries";
import CoverImage from "@/app/components/CoverImage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: poemPagesSlugs,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const { data: poem } = await sanityFetch({
    query: poemQuery,
    params,
    stega: false,
  });

  return {
    title: poem?.title,
    description: "A poem by Guillaume Odier",
  } satisfies Metadata;
}

export default async function PoemPage(props: Props) {
  const params = await props.params;
  const [{ data: poem }] = await Promise.all([
    sanityFetch({ query: poemQuery, params }),
  ]);

  if (!poem?._id) {
    return notFound();
  }

  return (
    <div className="container px-4 sm:px-6 lg:px-8 my-12 lg:my-24">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/poems"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-8"
        >
          <ChevronLeft size={16} />
          <span>Back to Poems</span>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <div className="col-span-1">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold font-serif">
                {poem.title}
              </h1>
            </div>

            <div className="font-serif text-lg md:text-xl lg:text-2xl leading-normal text-left max-w-2xl">
              {poem.content?.length && (
                <div className="prose prose-lg prose-p:my-2">
                  <PortableText
                    value={poem.content as PortableTextBlock[]}
                  />
                </div>
              )}
            </div>
            <div className="mt-12 text-gray-500">
              <p>@Guillaume Odier</p>
            </div>
          </div>
          <div className="col-span-1">
            {poem.coverImage && (
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
                <CoverImage image={poem.coverImage} priority />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 