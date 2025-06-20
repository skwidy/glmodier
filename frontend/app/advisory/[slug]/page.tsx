import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { type PortableTextBlock } from "next-sanity";

import PortableText from "@/app/components/PortableText";
import { sanityFetch } from "@/sanity/lib/live";
import { simplePageSlugs, simplePageQuery } from "@/sanity/lib/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: simplePageSlugs,
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
  const { data: page } = await sanityFetch({
    query: simplePageQuery,
    params,
    stega: false,
  });

  return {
    title: page?.title,
    description: "Advisory page",
  } satisfies Metadata;
}

export default async function SimplePage(props: Props) {
  const params = await props.params;
  const [{ data: page }] = await Promise.all([
    sanityFetch({ query: simplePageQuery, params }),
  ]);

  if (!page?._id) {
    return notFound();
  }

  return (
    <div className="container my-12 lg:my-24">
      <div className="grid gap-12">
        <div className="pb-6 grid gap-6 mb-6 border-b border-gray-100">
          <div className="max-w-3xl flex flex-col gap-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
              {page.title}
            </h1>
          </div>
        </div>
        {page.content?.length && (
          <PortableText
            className="max-w-2xl"
            value={page.content as PortableTextBlock[]}
          />
        )}
      </div>
    </div>
  );
} 