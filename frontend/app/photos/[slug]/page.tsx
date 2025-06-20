import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import PhotoGrid from '@/app/components/PhotoGrid'
import { sanityFetch } from '@/sanity/lib/live'
import { photoCategoryQuery, photosByCategoryQuery } from '@/sanity/lib/queries'
import type {
  PhotoCategoryQueryResult,
  PhotosByCategoryQueryResult,
} from '@/sanity.types'

interface PhotoCategory {
  _id: string
  title: string
  slug: string
  description?: string
  coverImage: any
  order?: number
  isPublished: boolean
}

interface Photo {
  _id: string
  title: string
  image: any
  caption?: string
  location?: string
  date?: string
  category?: {
    title: string
    slug: string
  }
  order?: number
  isPublished: boolean
  tags?: string[]
}

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
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
    title: `${category.title} - Photography Gallery`,
    description: category.description || `Photos from ${category.title}`,
  }
}

export default async function PhotoCategoryPage({ params }: Props) {
  const { slug } = params
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
          <li className="text-gray-900">{category.title}</li>
        </ol>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{category.title}</h1>
        {category.description && (
          <p className="text-gray-600 text-lg mb-4">
            {category.description}
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