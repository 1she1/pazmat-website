import { supabase } from '../../../utils/supabase'
import ImageGrid from '../../components/ImageGrid' // Import the new component

export default async function EventDetailPage({ params }) {
  const { id } = await params 

  // Fetch the main event
  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  // Fetch all inner images
  const { data: images } = await supabase
    .from('event_images')
    .select('*')
    .eq('event_id', id)

  // Combine cover image and inner images into one array for the lightbox
  const allImages = event ? [{ image_url: event.image_url }, ...(images || [])] : []

  return (
    <div className="min-h-screen bg-white p-10 md:p-20">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20 text-center">
          <span className="text-green-700 font-bold tracking-[0.3em] text-[10px] uppercase block mb-4">
            Archive 
          </span>
          <h1 className="text-5xl md:text-7xl font-playfair italic mb-4">
            {event?.title}
          </h1>
          <div className="w-12 h-[1px] bg-gray-300 mx-auto"></div>
        </header>

        {/* Use the new ImageGrid component here */}
        <ImageGrid images={allImages} />

        {allImages.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-inter uppercase tracking-widest text-xs">
            Gallery coming soon.
          </div>
        )}
      </div>
    </div>
  )
}