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
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h2 className="text-sm font-semibold mb-4 uppercase tracking-wider">
        Table of Contents
      </h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading._key}
            className={`
              border-l-2
              pl-4
              transition-colors
              ${
                activeId === heading._key
                  ? 'border-blue-500'
                  : 'border-transparent hover:border-gray-300'
              }
              ${heading.style === "h1" ? "font-semibold" : ""}
              ${heading.style === "h2" ? "ml-2" : ""}
              ${heading.style === "h3" ? "ml-4" : ""}
            `}
          >
            <a
              href={`#${heading._key}`}
              className={`
                text-sm 
                transition-colors
                ${
                  activeId === heading._key
                    ? 'font-semibold text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              {heading.children && (heading.children as any)[0].text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
} 