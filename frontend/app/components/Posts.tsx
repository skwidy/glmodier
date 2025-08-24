import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/live";
import { morePostsQuery, allPostsQuery } from "@/sanity/lib/queries";
import { Post as PostType, AllPostsQueryResult } from "@/sanity.types";
import DateComponent from "@/app/components/Date";
import OnBoarding from "@/app/components/Onboarding";
import Avatar from "@/app/components/Avatar";
import { createDataAttribute } from "next-sanity";
import CoverImage from "./CoverImage";

const Post = ({
  post,
  vertical = false,
}: {
  post: AllPostsQueryResult[number];
  vertical?: boolean;
}) => {
  const { _id, title, slug, excerpt, date, author, coverImage } = post;

  const attr = createDataAttribute({
    id: _id,
    type: "post",
    path: "title",
  });

  return (
    <article
      data-sanity={attr()}
      key={_id}
      className="border border-gray-200 rounded-sm p-6 bg-gray-50 transition-colors hover:bg-white relative group flex flex-col"
    >
      <Link
        className="hover:text-brand underline transition-colors"
        href={`/posts/${slug}`}
      >
        <span className="absolute inset-0 z-10" />
      </Link>
      <div
        className={`grid ${
          vertical ? "grid-cols-1" : "grid-cols-1 md:grid-cols-4"
        } gap-6 items-start`}
      >
        {coverImage && (
          <div
            className={`${
              vertical ? "" : "md:col-span-1"
            } aspect-[4/3] overflow-hidden rounded-md`}
          >
            <CoverImage
              image={coverImage}
              priority={false}
              className="w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div
          className={
            vertical
              ? "flex flex-col h-full"
              : coverImage
              ? "md:col-span-3 flex flex-col h-full"
              : "md:col-span-4 flex flex-col h-full"
          }
        >
          <div className="flex-grow">
            <h3 className="text-2xl font-bold mb-4 leading-tight">{title}</h3>

            <p className="line-clamp-3 text-sm leading-6 text-gray-600 max-w-[70ch]">
              {excerpt}
            </p>
          </div>
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            {author && author.firstName && author.lastName && (
              <div className="flex items-center">
                <Avatar person={author} small={true} />
              </div>
            )}
            <time className="text-gray-500 text-xs font-mono" dateTime={date}>
              <DateComponent dateString={date} />
            </time>
          </div>
        </div>
      </div>
    </article>
  );
};

const SmallPost = ({ post }: { post: AllPostsQueryResult[number] }) => {
  const { _id, title, slug, date, coverImage } = post;
  return (
    <article key={_id} className="relative group">
      <Link href={`/posts/${slug}`}>
        <span className="absolute inset-0 z-10" />
        <div className="flex gap-4 items-start">
          {coverImage && (
            <div className="flex-shrink-0 w-48 h-24 overflow-hidden rounded-md">
              <CoverImage
                image={coverImage}
                priority={false}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
          <div className="flex-grow min-w-0">
            <h3 className="text-lg font-semibold transition-colors group-hover:text-blue-600 line-clamp-2">
              {title}
            </h3>
            {date && (
              <time className="text-gray-500 text-xs font-mono" dateTime={date}>
                <DateComponent dateString={date} />
              </time>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

const Posts = ({
  children,
  heading,
  subHeading,
}: {
  children: React.ReactNode;
  heading?: string;
  subHeading?: string;
}) => (
  <div>
    {heading && (
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
    )}
    {subHeading && (
      <p className="mt-2 text-lg leading-8 text-gray-600">{subHeading}</p>
    )}
    <div className="pt-6">{children}</div>
  </div>
);

export const MorePosts = async ({
  skip,
  limit,
}: {
  skip: string;
  limit: number;
}) => {
  const { data } = await sanityFetch({
    query: morePostsQuery,
    params: { skip, limit },
  });

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Posts heading={`Other Chapters`}>
      {data?.map((post: any) => <Post key={post._id} post={post} />)}
    </Posts>
  );
};

export const AllPosts = async () => {
  const { data } = await sanityFetch({ query: allPostsQuery });

  if (!data || data.length === 0) {
    return <OnBoarding />;
  }

  const mainPosts = data.slice(0, 2);
  const otherPosts = data.slice(2);

  return (
    <Posts
      heading="Carnets de Voyage"
      subHeading="This is not quite a blog, not quite a travel guide.
      Just a series of fragments, thoughts, and observations collected along the way.
      From one place to another, between flights, ideas, and silences.
      Call it a nomadic notebook, an unfinished essay, or simply a space to breathe."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mainPosts.map((post: any) => (
            <Post key={post._id} post={post} vertical={true} />
          ))}
        </div>

        {otherPosts.length > 0 && (
          <div className="lg:col-span-1">
            <div className="p-6 bg-gray-50 rounded-sm h-full flex flex-col">
              <h3 className="text-xl font-bold mb-4">More posts</h3>
              <div className="space-y-6 flex-grow">
                {otherPosts.slice(0, 5).map((post: any) => (
                  <SmallPost key={post._id} post={post} />
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href="/posts"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-500"
                >
                  All posts
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Posts>
  );
};
