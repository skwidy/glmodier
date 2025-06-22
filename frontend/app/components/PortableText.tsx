/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
  PortableText as PortableTextComponent,
  PortableTextComponents,
} from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client-for-images";
import Image from "next/image";
import { stegaClean } from "@sanity/client/stega";

import ResolvedLink from "@/app/components/ResolvedLink";

const builder = imageUrlBuilder(client);

const components: PortableTextComponents = {
  block: {
    normal: ({ children, value }) => {
      // Check if the block is a lone asterisk
      if (
        value.children?.length === 1 &&
        value.children[0].text?.trim() === "*"
      ) {
        return (
          <div className="text-center text-2xl tracking-widest my-8">
            * * *
          </div>
        );
      }

      // Check for empty line used as a stanza break
      if (
        value.children?.length === 1 &&
        value.children[0].text?.trim() === ""
      ) {
        // Using a non-breaking space to force the paragraph to have height
        return <p>{"\u00A0"}</p>;
      }

      // Otherwise, render a normal paragraph
      return <p>{children}</p>;
    },
    h1: ({ children, value }) => {
      if (!value?._key) return <h1>{children}</h1>;
      return (
        <h1 id={value._key} className="group relative scroll-m-28">
          {children}
          <a
            href={`#${value._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </a>
        </h1>
      );
    },
    h2: ({ children, value }) => {
      if (!value?._key) return <h2>{children}</h2>;
      return (
        <h2 id={value._key} className="group relative scroll-m-28">
          {children}
          <a
            href={`#${value._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </a>
        </h2>
      );
    },
    h3: ({ children, value }) => {
      if (!value?._key) return <h3>{children}</h3>;
      return (
        <h3 id={value._key} className="group relative scroll-m-28">
          {children}
          <a
            href={`#${value._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </a>
        </h3>
      );
    },
  },
  marks: {
    link: ({ children, value: link }) => {
      return <ResolvedLink link={link}>{children}</ResolvedLink>;
    },
  },
  types: {
    image: ({ value }) => {
      if (!value || !value.asset || !value.asset._ref) {
        return null;
      }
      return (
        <div className="my-6">
          <Image
            src={builder
              .image(value)
              .width(1200)
              .height(800)
              .fit("max")
              .auto("format")
              .url()}
            alt={value.alt || ""}
            width={1200}
            height={800}
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              {value.caption}
            </figcaption>
          )}
        </div>
      );
    },
    htmlEmbed: ({ value }) => {
      const cleanHtml = stegaClean(value.html);
      return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
    },
  },
};

export default function PortableText({
  className,
  value,
}: {
  className?: string;
  value: any;
}) {
  return (
    <div
      className={[
        "prose prose-a:text-brand font-serif text-justify",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <PortableTextComponent components={components} value={value} />
    </div>
  );
}
