"use client";

export function ContactCard() {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Get in touch
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Don&rsquo;t spend another quarter figuring out your growth alone.
        </p>
        <button
          data-tally-open="nrrkgN"
          data-tally-emoji-text="👋"
          data-tally-emoji-animation="wave"
          className="inline-flex h-10 items-center justify-center rounded-md bg-black px-8 text-sm font-medium text-white shadow transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90 dark:focus-visible:ring-gray-300"
        >
          Book with me
        </button>
      </div>
    </div>
  );
} 