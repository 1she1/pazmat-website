'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabase'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [innerImages, setInnerImages] = useState([]) 
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null) 
  const [inquiries, setInquiries] = useState([]) // Memory for messages
  const router = useRouter()

  useEffect(() => {
    fetchEvents()
    fetchInquiries() // Load messages when page opens
  }, [])

  // --- LOGIC: FETCH DATA ---
  async function fetchEvents() {
    const { data } = await supabase.from('events').select('*').order('created_at', { ascending: false })
    setEvents(data || [])
  }

  const fetchInquiries = async () => {
    const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })
    setInquiries(data || [])
  }

  // --- LOGIC: UPLOADS ---
  const uploadCover = async (e) => {
    e.preventDefault()
    setUploading(true)
    const fileName = `${Date.now()}-${file.name}`
    await supabase.storage.from('gallery').upload(fileName, file)
    const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(fileName)
    await supabase.from('events').insert([{ title, image_url: urlData.publicUrl }])
    setUploading(false); setTitle(''); setFile(null); fetchEvents()
    alert("Event Created!")
  }

  const uploadExtraPhotos = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0 || !selectedEvent) return
    setUploading(true)
    for (const file of files) {
      const fileName = `extra-${Date.now()}-${file.name}`
      await supabase.storage.from('gallery').upload(fileName, file)
      const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(fileName)
      await supabase.from('event_images').insert([{ event_id: selectedEvent.id, image_url: urlData.publicUrl }])
    }
    setUploading(false); alert("Photos added!"); viewEventPhotos(selectedEvent)
  }

  // --- LOGIC: DELETES ---
  const handleDelete = async (id) => {
    if (!confirm("Delete this event?")) return
    await supabase.from('events').delete().eq('id', id)
    fetchEvents()
  }

  const viewEventPhotos = async (event) => {
    setSelectedEvent(event)
    const { data } = await supabase.from('event_images').select('*').eq('event_id', event.id)
    setInnerImages(data || [])
  }

  const deleteSingleImage = async (imageId) => {
    if (!confirm("Remove this photo?")) return
    await supabase.from('event_images').delete().eq('id', imageId)
    setInnerImages(innerImages.filter(img => img.id !== imageId))
  }

  return (
    <div className="p-10 max-w-5xl mx-auto pb-40 font-inter">
      <h1 className="text-4xl font-playfair font-black mb-10 border-b pb-4">PAZMAT ADMIN</h1>

      {/* 1. CREATE NEW EVENT */}
      <section className="bg-white p-8 rounded-xl shadow-sm mb-12 border border-gray-100">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Create New Event</h2>
        <form onSubmit={uploadCover} className="flex flex-col md:flex-row gap-4">
          <input type="text" placeholder="EVENT TITLE" value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1 p-3 border-b focus:outline-none focus:border-green-600 text-xs tracking-widest uppercase" required />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className="p-3 text-xs" required />
          <button type="submit" className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-green-800 transition">
            {uploading ? '...' : 'Create Event'}
          </button>
        </form>
      </section>

      {/* 2. PHOTO MANAGER (Appears when "Manage Photos" is clicked) */}
      {selectedEvent && (
        <section className="mb-12 p-8 bg-gray-50 border-2 border-green-600 rounded-2xl animate-in fade-in zoom-in-95 duration-300">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-playfair italic">Managing: {selectedEvent.title}</h2>
            <button onClick={() => setSelectedEvent(null)} className="text-gray-400 text-xl hover:text-black">✕</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {innerImages.map((img) => (
              <div key={img.id} className="relative group aspect-square">
                <img src={img.image_url} className="w-full h-full object-cover rounded-lg shadow-sm" />
                <button onClick={() => deleteSingleImage(img.id)} className="absolute inset-0 bg-red-600/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity font-bold">REMOVE</button>
              </div>
            ))}
            <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-white transition aspect-square">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Add More</span>
              <input type="file" multiple className="hidden" onChange={uploadExtraPhotos} />
            </label>
          </div>
        </section>
      )}

      {/* 3. LIST OF EXISTING EVENTS */}
      <section className="mb-20">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Active Portfolio</h2>
        <div className="grid gap-4">
          {events.map(event => (
            <div key={event.id} className="p-5 border rounded-xl bg-white flex items-center justify-between hover:shadow-md transition">
              <div className="flex items-center gap-6">
                <img src={event.image_url} className="w-16 h-16 object-cover rounded-lg shadow-sm" />
                <span className="font-playfair text-lg">{event.title}</span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => viewEventPhotos(event)} className="text-[10px] font-bold uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition">Manage Photos</button>
                <button onClick={() => handleDelete(event.id)} className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INQUIRY INBOX (NEW SECTION) */}
      <section className="border-t pt-16">
        <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-playfair italic">Inquiry Inbox</h2>
            <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">{inquiries.length} New</span>
        </div>
        
        <div className="space-y-6">
          {inquiries.map((iq) => (
            <div key={iq.id} className="p-8 border-l-4 border-green-700 bg-white shadow-sm flex flex-col md:flex-row justify-between gap-6 animate-in slide-in-from-left-4 duration-500">
              <div className="flex-1">
                <div className="flex gap-3 items-center mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-green-700">{iq.event_type}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">{iq.event_date}</span>
                </div>
                <h3 className="text-xl font-playfair mb-1">{iq.name}</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">{iq.email}</p>
                <p className="text-gray-600 font-light leading-relaxed italic border-t pt-4">"{iq.message}"</p>
              </div>
              <button 
                onClick={async () => { if(confirm("Archive this message?")) { await supabase.from('inquiries').delete().eq('id', iq.id); fetchInquiries(); } }}
                className="text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-red-600 transition self-start"
              >
                Archive
              </button>
            </div>
          ))}
          {inquiries.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-xl">
               <p className="text-gray-300 font-bold uppercase tracking-[.3em] text-[10px]">Your inbox is empty</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}