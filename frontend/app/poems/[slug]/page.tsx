import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { type PortableTextBlock } from "next-sanity";
import CoverImage from "@/app/components/CoverImage";
import PortableText from "@/app/components/PortableText";
import { sanityFetch } from "@/sanity/lib/live";
import { poemPagesSlugs, poemQuery } from "@/sanity/lib/queries";

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
    <div className="container my-12 lg:my-24">
      <div className="font-serif text-center text-lg md:text-xl lg:text-2xl leading-loose">
        {poem.content?.length && (
          <PortableText
            className="max-w-2xl mx-auto"
            value={poem.content as PortableTextBlock[]}
          />
        )}
      </div>
      <div className="mt-12 text-center">
        <h1 className="text-4xl font-bold">{poem.title}</h1>
        <p className="mt-4 text-gray-500">@GLMODIER</p>
      </div>
    </div>
  );
} 