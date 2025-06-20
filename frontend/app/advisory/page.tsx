import { sanityFetch } from "@/sanity/lib/live";
import { simplePageQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { ContactCard } from "../components/ContactCard";
import PortableText from "../components/PortableText";
import { QuoteCard } from "../components/QuoteCard";

const quotes = [
  {
    text: "I reached out to G when we were looking to hire our first sales rep. Given G's experience with hiring multiple reps during Captain Data's pivot, his insights were invaluable in deciding on the profiles and structure of the sales team.",
    author: "Vincent",
    company: "Fincome",
  },
  {
    text: "The first time I met G, we had just launched Loyoly, and he was very much in a 'pay it forward' mindset with his feedback. Since then, he has helped us with team structuring, fundraising, and pivoting our product. He's hands-on and knowledgeable on pretty much any topic, as far as I know.",
    author: "Joseph, Co-Founder",
    company: "Loyoly",
  },
  {
    text: "When you're starting out, the first thing you should do is talk to people who have already gone through what you're about to face, which I did by reaching out to G. Without expecting anything in return, G has helped me with strategy, refining my pitch deck for seed fundraising, and finding business angels.",
    author: "Jérôme, Founder",
    company: "Zola",
  },
];

export default async function SimplePage() {
  const { data: page } = await sanityFetch({
    query: simplePageQuery,
    params: { slug: "advisory" },
  });

  if (!page) {
    return notFound();
  }

  return (
    <div className="container mx-auto my-12 px-4 sm:px-6 lg:my-24 lg:px-8">
      <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-3">
        <div className="prose lg:prose-xl max-w-4xl lg:col-span-2">
          <h1>{page.title}</h1>
          {page.content && <PortableText value={page.content as any} />}
        </div>
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <QuoteCard {...quotes[0]} />
            <ContactCard />
            {quotes.slice(1).map((quote, i) => (
              <QuoteCard key={i} {...quote} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
} 