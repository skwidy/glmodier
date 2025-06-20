import { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { sitemapData, photoCategorySlugs } from "@/sanity/lib/queries";
import { headers } from "next/headers";

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allPostsAndPages, photoCategories] = await Promise.all([
    sanityFetch({
      query: sitemapData,
    }),
    sanityFetch({
      query: photoCategorySlugs,
    }),
  ]);
  
  const headersList = await headers();
  const sitemap: MetadataRoute.Sitemap = [];
  const domain: String = headersList.get("host") as string;
  
  sitemap.push({
    url: domain as string,
    lastModified: new Date(),
    priority: 1,
    changeFrequency: "monthly",
  });

  // Add photos main page
  sitemap.push({
    url: `${domain}/photos`,
    lastModified: new Date(),
    priority: 0.8,
    changeFrequency: "monthly",
  });

  if (allPostsAndPages != null && allPostsAndPages.data.length != 0) {
    let priority: number;
    let changeFrequency:
      | "monthly"
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "yearly"
      | "never"
      | undefined;
    let url: string;

    for (const p of allPostsAndPages.data) {
      switch (p._type) {
        case "page":
          priority = 0.8;
          changeFrequency = "monthly";
          url = `${domain}/${p.slug}`;
          break;
        case "post":
          priority = 0.5;
          changeFrequency = "never";
          url = `${domain}/posts/${p.slug}`;
          break;
      }
      sitemap.push({
        lastModified: p._updatedAt || new Date(),
        priority,
        changeFrequency,
        url,
      });
    }
  }

  // Add photo category pages
  if (photoCategories != null && photoCategories.data.length != 0) {
    for (const category of photoCategories.data as { slug: string }[]) {
      sitemap.push({
        url: `${domain}/photos/${category.slug}`,
        lastModified: new Date(),
        priority: 0.6,
        changeFrequency: "monthly",
      });
    }
  }

  return sitemap;
}
