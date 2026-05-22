'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabase'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  // --- 1. SECURITY & LOADING STATES ---
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  
  // --- 2. DATA STATES ---
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [innerImages, setInnerImages] = useState([])
  const [inquiries, setInquiries] = useState([])
  
  // --- 3. FORM STATES ---
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  
  const router = useRouter()

  // --- 4. THE BOUNCER (Security Check) ---
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        // If no password session exists, send to login immediately
        window.location.href = "/login"
      } else {
        // If authorized, show the page and load the data
        setAuthorized(true)
        setLoading(false)
        fetchEvents()
        fetchInquiries()
      }
    }
    checkUser()
  }, [])

  // --- 5. LOGIC: FETCHING ---
  async function fetchEvents() {
    const { data } = await supabase.from('events').select('*').order('created_at', { ascending: false })
    setEvents(data || [])
  }

  async function fetchInquiries() {
    const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })
    setInquiries(data || [])
  }

  // --- 6. LOGIC: ACTIONS ---
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  const uploadCover = async (e) => {
    e.preventDefault()
    if (!file) return
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
    for (const f of files) {
      const fileName = `extra-${Date.now()}-${f.name}`
      await supabase.storage.from('gallery').upload(fileName, f)
      const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(fileName)
      await supabase.from('event_images').insert([{ event_id: selectedEvent.id, image_url: urlData.publicUrl }])
    }
    setUploading(false); alert("Photos added!"); viewEventPhotos(selectedEvent)
  }

  const handleDeleteEvent = async (id) => {
    if (!confirm("Delete entire event and all its photos?")) return
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

  // --- 7. THE LOADING SCREEN ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white font-inter">
        <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Verifying Credentials...</p>
      </div>
    )
  }

  // --- 8. THE DASHBOARD (Only shows if authorized) ---
  if (!authorized) return null

  return (
    <div className="p-6 md:p-20 max-w-6xl mx-auto pb-40 font-inter bg-white">
      
      {/* HEADER */}
      <header className="flex justify-between items-center mb-16 border-b pb-6">
        <div>
          <h1 className="text-4xl font-playfair font-black tracking-tighter">PAZMAT ADMIN</h1>
          <p className="text-[10px] font-bold text-green-700 uppercase tracking-widest mt-1">Management Dashboard</p>
        </div>
        <button 
          onClick={handleLogout}
          className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 px-6 py-3 rounded-full hover:bg-red-600 hover:text-white transition-all"
        >
          Secure Logout
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT COLUMN: CREATE & MANAGE */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* CREATE EVENT */}
          <section className="p-8 border border-gray-100 rounded-2xl shadow-sm">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">01. Create New Portfolio Entry</h2>
            <form onSubmit={uploadCover} className="space-y-6">
              <input 
                type="text" 
                placeholder="EVENT TITLE" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full p-4 border-b border-gray-100 focus:outline-none focus:border-green-600 text-xs tracking-widest uppercase font-bold" 
                required 
              />
              <div className="flex flex-col md:flex-row gap-4">
                <input type="file" onChange={(e) => setFile(e.target.files[0])} className="flex-1 text-xs p-2 bg-gray-50 rounded" required />
                <button type="submit" disabled={uploading} className="bg-black text-white px-10 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-green-800 transition">
                  {uploading ? 'Processing...' : 'Publish Event'}
                </button>
              </div>
            </form>
          </section>

          {/* PORTFOLIO LIST */}
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">02. Live Portfolio</h2>
            <div className="space-y-3">
              {events.map(event => (
                <div key={event.id} className="p-4 border rounded-xl flex items-center justify-between hover:bg-gray-50 transition group">
                  <div className="flex items-center gap-4">
                    <img src={event.image_url} className="w-12 h-12 object-cover rounded-lg" />
                    <span className="font-playfair text-lg">{event.title}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => viewEventPhotos(event)} className="text-[9px] font-bold uppercase tracking-widest px-4 py-2 border border-black hover:bg-black hover:text-white transition">Manage Content</button>
                    <button onClick={() => handleDeleteEvent(event.id)} className="text-[9px] font-bold uppercase tracking-widest px-4 py-2 text-red-500">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: INBOX */}
        <div className="lg:col-span-1">
          <section className="bg-gray-50 p-8 rounded-2xl sticky top-32">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">03. Inquiry Inbox</h2>
              <span className="bg-green-600 text-white text-[8px] font-bold px-2 py-1 rounded-full">{inquiries.length}</span>
            </div>
            
            <div className="space-y-6">
              {inquiries.map((iq) => (
                <div key={iq.id} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-600">
                  <p className="text-[9px] font-black text-green-700 uppercase tracking-widest mb-1">{iq.event_type}</p>
                  <h3 className="font-playfair text-md mb-2">{iq.name}</h3>
                  <p className="text-[10px] text-gray-400 mb-4">{iq.event_date}</p>
                  <p className="text-xs text-gray-600 leading-relaxed italic mb-4">"{iq.message}"</p>
                  <button 
                    onClick={async () => { if(confirm("Archive?")) { await supabase.from('inquiries').delete().eq('id', iq.id); fetchInquiries(); } }}
                    className="text-[9px] font-bold uppercase text-gray-300 hover:text-red-600"
                  >
                    Archive Message
                  </button>
                </div>
              ))}
              {inquiries.length === 0 && <p className="text-center py-10 text-gray-300 text-[10px] uppercase font-bold tracking-widest">No New Inquiries</p>}
            </div>
          </section>
        </div>
      </div>

      {/* FLOATING INNER PHOTO MANAGER */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <section className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 md:p-12 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-10 border-b pb-6">
              <div>
                <h2 className="text-3xl font-playfair italic">{selectedEvent.title}</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[.2em]">Manage inner images</p>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="text-gray-400 text-2xl hover:text-black transition">✕</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {innerImages.map((img) => (
                <div key={img.id} className="relative group aspect-square">
                  <img src={img.image_url} className="w-full h-full object-cover rounded-xl" />
                  <button onClick={() => deleteSingleImage(img.id)} className="absolute inset-0 bg-red-600/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl font-bold transition-opacity">REMOVE</button>
                </div>
              ))}
              <label className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition aspect-square">
                <span className="text-xl text-gray-300 mb-1">+</span>
                <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest text-center">Add Photos</span>
                <input type="file" multiple className="hidden" onChange={uploadExtraPhotos} />
              </label>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}