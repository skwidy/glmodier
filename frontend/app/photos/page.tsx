import { Metadata } from 'next'
import Link from 'next/link'

import { sanityFetch } from '@/sanity/lib/live'
import { allPhotoCategoriesQuery } from '@/sanity/lib/queries'
import { AllPhotoCategoriesQueryResult } from '@/sanity.types'
import CoverImage from '../components/CoverImage'

export const metadata: Metadata = {
  title: 'Photography Gallery',
  description: 'Explore my photography collection organized by location and theme.',
}

export default async function PhotosPage() {
  const { data: categories } = await sanityFetch({
    query: allPhotoCategoriesQuery,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Photography Gallery</h1>
        <p className="text-gray-600 text-lg">
          A collection of my favorite shots organized by location and theme.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((category: any) => (
          <Link
            key={category._id}
            href={`/photos/${category.slug}`}
            className="group block"
          >
            <div className="relative overflow-hidden rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300">
              <div className="aspect-[4/3] relative">
                  <CoverImage image={category.coverImage} priority={false} />
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-black/20 transition-all duration-300" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h2 className="text-white text-xl font-semibold mb-2">
                  {category.title}
                </h2>
                {category.description && (
                  <p className="text-white/80 text-sm line-clamp-2">
                    {category.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {(categories?.length ?? 0) === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No photo categories available yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  )
}
