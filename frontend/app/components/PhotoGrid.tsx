'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/utils'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

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

  return (
    <>
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ${className}`}>
        {photos.map((photo) => (
          <div
            key={photo._id}
            className="group relative cursor-pointer overflow-hidden rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300"
            onClick={() => handlePhotoClick(photo)}
          >
            <div className="aspect-square relative">
              <Image
                src={urlForImage(photo.image)
                  ?.width(400)
                  .height(400)
                  .fit('crop')
                  .crop('center')
                  .url() || ''}
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
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
        ))}
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              ×
            </button>
            
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 relative">
                <Image
                  src={urlForImage(selectedPhoto.image)
                    ?.width(800)
                    .height(800)
                    .fit('max')
                    .url() || ''}
                  alt={selectedPhoto.title}
                  width={800}
                  height={800}
                  className="w-full h-auto max-h-[70vh] object-contain"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>
              
              <div className="w-full lg:w-80 p-6 bg-gray-50">
                <h2 className="text-xl font-semibold mb-2">
                  {selectedPhoto.title}
                </h2>
                
                {selectedPhoto.caption && (
                  <p className="text-gray-600 mb-4">
                    {selectedPhoto.caption}
                  </p>
                )}
                
                <div className="space-y-2 text-sm text-gray-500">
                  {selectedPhoto.location && (
                    <div>
                      <span className="font-medium">Location:</span> {selectedPhoto.location}
                    </div>
                  )}
                  
                  {selectedPhoto.date && (
                    <div>
                      <span className="font-medium">Date:</span> {new Date(selectedPhoto.date).toLocaleDateString()}
                    </div>
                  )}
                  
                  {selectedPhoto.category && (
                    <div>
                      <span className="font-medium">Category:</span> {selectedPhoto.category.title}
                    </div>
                  )}
                </div>
                
                {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                  <div className="mt-4">
                    <span className="text-sm font-medium text-gray-500">Tags:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedPhoto.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full"
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