'use client'

import { PortableTextBlock } from "next-sanity";
import { useEffect, useState } from "react";

export type Heading = PortableTextBlock;

type Props = {
  headings: Heading[];
};

function TableOfContentsContent({
  headings,
  activeId,
  onLinkClick,
}: {
  headings: Heading[];
  activeId: string | null;
  onLinkClick: () => void;
}) {
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
              onClick={onLinkClick}
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

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

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

  // Close modal when clicking on a link
  const handleLinkClick = () => {
    setIsMobileModalOpen(false);
  };

  return (
    <>
      {/* Desktop version - just the content */}
      <div className="hidden lg:block">
        <TableOfContentsContent
          headings={headings}
          activeId={activeId}
          onLinkClick={handleLinkClick}
        />
      </div>

      {/* Mobile floating action button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMobileModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full py-2 px-4 shadow-lg transition-colors duration-200"
          aria-label="Open table of contents"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span className="text-sm font-semibold">Contents</span>
        </button>
      </div>

      {/* Mobile modal */}
      {isMobileModalOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileModalOpen(false)}
          />
          
          {/* Modal */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[80vh] overflow-hidden">
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full" />
            </div>
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Table of Contents</h2>
                <button
                  onClick={() => setIsMobileModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(80vh-120px)]">
              <div className="p-6">
                <ul className="space-y-3">
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
                            : 'border-transparent'
                        }
                        ${heading.style === "h1" ? "font-semibold" : ""}
                        ${heading.style === "h2" ? "ml-2" : ""}
                        ${heading.style === "h3" ? "ml-4" : ""}
                      `}
                    >
                      <a
                        href={`#${heading._key}`}
                        onClick={handleLinkClick}
                        className={`
                          block
                          text-sm 
                          transition-colors
                          ${
                            activeId === heading._key
                              ? 'font-semibold text-blue-600'
                              : 'text-gray-600'
                          }
                        `}
                      >
                        {heading.children && (heading.children as any)[0].text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 