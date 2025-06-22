'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/utils'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import {
  getImageDimensions,
  type SanityImageSource as SanityImageSourceAsset,
} from '@sanity/asset-utils'
import CoverImage from './CoverImage'

interface Photo {
  _id: string
  title: string
  image: SanityImageSource
  caption?: string
  location?: string
  date?: string
  category?: {
    title: string
    slug: string
  }
  tags?: string[]
}

interface PhotoGridProps {
  photos: Photo[]
  className?: string
}

export default function PhotoGrid({ photos, className = '' }: PhotoGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo)
  }

  const closeModal = () => {
    setSelectedPhoto(null)
  }

  const goToNextPhoto = () => {
    if (!selectedPhoto) return
    const currentIndex = photos.findIndex((p) => p._id === selectedPhoto._id)
    const nextIndex = (currentIndex + 1) % photos.length
    setSelectedPhoto(photos[nextIndex])
  }

  const goToPreviousPhoto = () => {
    if (!selectedPhoto) return
    const currentIndex = photos.findIndex((p) => p._id === selectedPhoto._id)
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length
    setSelectedPhoto(photos[prevIndex])
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      } else if (event.key === 'ArrowRight') {
        goToNextPhoto()
      } else if (event.key === 'ArrowLeft') {
        goToPreviousPhoto()
      }
    }

    if (selectedPhoto) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedPhoto, photos])

  return (
    <>
      <div
        className={`grid grid-cols-1 items-start sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}
      >
        {photos.map((photo) => {
          const dimensions = getImageDimensions(
            photo.image as SanityImageSourceAsset,
          )
          const aspectRatio = dimensions.width / dimensions.height
          const isWide = aspectRatio > 1.25

          return (
            <div
              key={photo._id}
              className={`group relative cursor-pointer overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 hover:bg-gray-200 ${
                isWide ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
              onClick={() => handlePhotoClick(photo)}
            >
              <div className="relative">
                {photo.image ? (
                  <CoverImage image={photo.image} priority={false} />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
              </div>
              
              {/* Photo info overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-sm font-medium truncate">
                  {photo.title}
                </h3>
                {photo.location && (
                  <p className="text-white/80 text-xs truncate">
                    {photo.location}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-7xl max-h-[95vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Photo Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPreviousPhoto()
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 m-2 md:m-4 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
              aria-label="Previous photo"
            >
              &larr;
            </button>

            {/* Next Photo Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNextPhoto()
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 m-2 md:m-4 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
              aria-label="Next photo"
            >
              &rarr;
            </button>

            <div className="relative rounded-lg overflow-hidden">
              <button
                onClick={closeModal}
                className="absolute top-0 right-0 z-20 m-4 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                ×
              </button>

              <Image
                src={
                  urlForImage(selectedPhoto.image)
                    ?.width(2400)
                    .height(1600)
                    .fit('max')
                    .url() || ''
                }
                alt={selectedPhoto.title}
                width={2400}
                height={1600}
                className="w-auto h-auto max-w-full max-h-[95vh] object-contain"
                sizes="(max-width: 1024px) 100vw, 1800px"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white z-10 pointer-events-none">
                <h2 className="text-2xl font-semibold mb-2">
                  {selectedPhoto.title}
                </h2>
                <div className="text-sm space-y-1 text-gray-200">
                  {selectedPhoto.location && (
                    <p>
                      <span className="font-medium">Location:</span>{' '}
                      {selectedPhoto.location}
                    </p>
                  )}
                  {selectedPhoto.category && (
                    <p>
                      <span className="font-medium">Category:</span>{' '}
                      {selectedPhoto.category.title}
                    </p>
                  )}
                  {selectedPhoto.date && (
                    <p>
                      <span className="font-medium">Date:</span>{' '}
                      {new Date(selectedPhoto.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedPhoto.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/20 text-white text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 