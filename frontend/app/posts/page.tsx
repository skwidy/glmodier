import type { Metadata } from "next";
import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/live";
import { allPostsQuery } from "@/sanity/lib/queries";
import { AllPostsQueryResult } from "@/sanity.types";
import CoverImage from "@/app/components/CoverImage";
import Date from "@/app/components/Date";

export const metadata: Metadata = {
  title: "Blog Posts",
  description: "All blog posts",
};

export default async function PostsPage() {
  const { data: posts } = await sanityFetch({
    query: allPostsQuery,
  });

  return (
    <div className="my-12 lg:my-24">
      <div className="container">
        <div className="pb-6 border-b border-gray-100">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
              Blog Posts
            </h1>
            <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
              Latest articles and updates
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {posts?.map((post: AllPostsQueryResult[0]) => (
            <article key={post._id} className="group">
              <Link href={`/posts/${post.slug}`} className="block">
                <div className="aspect-[16/9] overflow-hidden rounded-lg bg-gray-100">
                  {post.coverImage && (
                    <div className="transition-transform duration-300 group-hover:scale-105">
                      <CoverImage
                        image={post.coverImage}
                        priority={false}
                      />
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <Date dateString={post.date} />
                    {post.author && (
                      <>
                        <span className="mx-2">•</span>
                        <span>
                          {post.author.firstName} {post.author.lastName}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {(!posts || posts.length === 0) && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No posts yet</h3>
            <p className="mt-2 text-gray-600">
              Create your first blog post in the Sanity Studio.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 