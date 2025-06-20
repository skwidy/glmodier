'use client'

import { PortableTextBlock } from "next-sanity";
import { useEffect, useState } from "react";

export type Heading = PortableTextBlock;

type Props = {
  headings: Heading[];
};

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" },
    );

    headings.forEach((heading) => {
      if (!heading._key) return;
      const el = document.getElementById(heading._key);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      headings.forEach((heading) => {
        if (!heading._key) return;
        const el = document.getElementById(heading._key);
        if (el) {
          observer.unobserve(el);
        }
      });
    };
  }, [headings]);

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
      <ul>
        {headings.map((heading) => (
          <li
            key={heading._key}
            className={`
              ${heading.style === "h1" ? "font-bold" : ""}
              ${heading.style === "h2" ? "ml-4" : ""}
              ${heading.style === "h3" ? "ml-8" : ""}
            `}
          >
            <a
              href={`#${heading._key}`}
              className={`hover:underline ${
                activeId === heading._key ? "text-blue-600 font-semibold" : ""
              }`}
            >
              {heading.children && (heading.children as any)[0].text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
} 