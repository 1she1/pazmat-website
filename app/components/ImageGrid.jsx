'use client'
import { useState } from 'react'

export default function ImageGrid({ images }) {
  const [selectedImg, setSelectedImg] = useState(null)

  return (
    <>
      {/* 1. THE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images?.map((img, index) => (
          <div 
            key={index} 
            className="aspect-[4/5] overflow-hidden rounded-sm bg-gray-100 cursor-zoom-in group relative"
            onClick={() => setSelectedImg(img.image_url)}
          >
            <img 
              src={img.image_url} 
className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"              alt="Event detail"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* 2. THE LIGHTBOX MODAL (Only shows when an image is clicked) */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-10 right-10 text-white text-4xl font-light">✕</button>
          <img 
            src={selectedImg} 
            className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300"
            alt="Full screen view" 
          />
        </div>
      )}
    </>
  )
}