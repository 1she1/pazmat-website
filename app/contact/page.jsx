'use client'
import { useState } from 'react'
import { supabase } from '../../utils/supabase'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    // 1. Save to Supabase (so it shows in your Admin Dashboard)
    const { error } = await supabase.from('inquiries').insert([data])

    if (error) {
      alert("Error: " + error.message)
      setLoading(false)
      return
    }

    // 2. Prepare the WhatsApp Message
    const pazmatWhatsApp = "263772639622" // Pazmat's official number
    const message = `*NEW EVENT INQUIRY*%0A
*Name:* ${data.name}%0A
*Phone:* ${data.phone}%0A
*Email:* ${data.email}%0A
*Event:* ${data.event_type}%0A
*Date:* ${data.event_date}%0A
*Message:* ${data.message}`

    // 3. Open WhatsApp in a new tab
    window.open(`https://wa.me/${pazmatWhatsApp}?text=${message}`, '_blank')

    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-10">
        <div className="text-center">
          <h1 className="text-5xl font-playfair italic mb-4">Message Sent.</h1>
          <p className="text-gray-500 font-inter uppercase tracking-widest text-[10px]">We have redirected you to WhatsApp. Thank you for choosing Pazmat.</p>
          <a href="/" className="mt-8 inline-block border-b border-black pb-1 font-bold text-[10px] uppercase no-underline text-black">Return Home</a>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="py-24 px-6 md:px-10 max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <span className="text-green-800 font-bold tracking-[.4em] text-[10px] uppercase block mb-4 font-inter">Booking Request</span>
          <h1 className="text-5xl md:text-7xl font-playfair italic mb-4 tracking-tighter">Reserve Your Date.</h1>
          <div className="w-12 h-[1px] bg-gray-300 mx-auto"></div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8 font-inter">
          {/* Row 1: Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
              <input name="name" type="text" placeholder="e.g. John Doe" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-green-700 text-xs tracking-widest uppercase" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
              <input name="email" type="email" placeholder="e.g. john@gmail.com" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-green-700 text-xs tracking-widest uppercase" required />
            </div>
          </div>

          {/* Row 2: Phone and Event Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
              <input name="phone" type="tel" placeholder="e.g. +263 77..." className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-green-700 text-xs tracking-widest uppercase" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Event Type</label>
              <select name="event_type" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-green-700 text-xs tracking-widest uppercase bg-transparent text-gray-800" required>
                <option value="">Select Category</option>
                <option value="Corporate Gala">Corporate Gala</option>
                <option value="Luxury Wedding">Luxury Wedding</option>
                <option value="Private Party">Private Party</option>
                <option value="Funeral Service">Funeral Service</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Row 3: Date */}
          <div className="flex flex-col gap-2">
            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Event Date</label>
            <input name="event_date" type="date" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-green-700 text-xs tracking-widest uppercase text-gray-800" required />
          </div>

          {/* Row 4: Message */}
          <div className="flex flex-col gap-2">
            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Tell us about your event</label>
            <textarea name="message" rows="3" placeholder="HOW CAN WE ASSIST YOU?" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-green-700 text-xs tracking-widest uppercase" required></textarea>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-black text-white py-6 font-bold uppercase tracking-[.3em] text-[10px] hover:bg-green-800 transition duration-500">
            {loading ? 'Processing...' : 'Send Inquiry to WhatsApp'}
          </button>
        </form>
      </section>
    </main>
  )
}