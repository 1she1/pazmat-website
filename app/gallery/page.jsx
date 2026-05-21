import Link from 'next/link'
import { supabase } from '../../utils/supabase'

export const revalidate = 0 

export default async function GalleryPage() {
  // Fetch all events from the database
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        <header className="text-center mb-16">
          <h1 className="text-5xl font-black text-gray-900 mb-4">EVENT PORTFOLIO</h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">Pazmat Investments</p>
          <div className="w-16 h-1 bg-green-600 mx-auto mt-4"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events?.map((event) => (
            /* --- THIS LINK IS THE IMPORTANT PART --- */
            <Link key={event.id} href={`/gallery/${event.id}`}>
              <div className="group cursor-pointer">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl bg-gray-200 aspect-[4/5] shadow-md group-hover:shadow-2xl transition-all duration-500">
                  <img 
                    src={event.image_url} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                  
                  {/* "View Event" text that appears on hover */}
                  <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold uppercase shadow-lg">
                      View Full Event
                    </span>
                  </div>
                </div>

                {/* Text below the image */}
                <div className="mt-4">
                  <h2 className="text-lg font-bold text-gray-900 uppercase tracking-tight group-hover:text-green-600 transition-colors">
                    {event.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {events?.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No events have been uploaded to the gallery yet.
          </div>
        )}
      </div>
    </div>
  )
}