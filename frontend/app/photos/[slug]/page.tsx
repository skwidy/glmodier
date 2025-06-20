import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import PhotoGrid from '@/app/components/PhotoGrid'
import { sanityFetch } from '@/sanity/lib/live'
import { photoCategoryQuery, photosByCategoryQuery } from '@/sanity/lib/queries'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data: category } = await sanityFetch({
    query: photoCategoryQuery,
    params: { slug },
  })

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${(category as any).title} - Photography Gallery`,
    description: (category as any).description || `Photos from ${(category as any).title}`,
  }
}

export default async function PhotoCategoryPage({ params }: Props) {
  const { slug } = await params
  const [{ data: category }, { data: photos }] = await Promise.all([
    sanityFetch({
      query: photoCategoryQuery,
      params: { slug },
    }),
    sanityFetch({
      query: photosByCategoryQuery,
      params: { categorySlug: slug },
    }),
  ])

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link
              href="/photos"
              className="hover:text-gray-700 transition-colors"
            >
              Gallery
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900">{(category as any).title}</li>
        </ol>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{(category as any).title}</h1>
        {(category as any).description && (
          <p className="text-gray-600 text-lg mb-4">
            {(category as any).description}
          </p>
        )}
        <p className="text-gray-500">
          {photos.length} photo{photos.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Photo Grid */}
      {photos.length > 0 ? (
        <PhotoGrid photos={photos} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No photos available in this category yet.
          </p>
        </div>
      )}
    </div>
  )
} 