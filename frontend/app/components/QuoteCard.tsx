export function QuoteCard({
  text,
  author,
  company,
}: {
  text: string;
  author: string;
  company: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <blockquote className="space-y-4">
        <p className="italic text-gray-600 dark:text-gray-300">
          &ldquo;{text}&rdquo;
        </p>
        <footer className="text-sm font-medium not-italic text-gray-900 dark:text-white">
          — {author}, <cite>{company}</cite>
        </footer>
      </blockquote>
    </div>
  );
} 