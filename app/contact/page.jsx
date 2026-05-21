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

    const { error } = await supabase.from('inquiries').insert([data])

    if (error) {
      alert("Error: " + error.message)
    } else {
      setSubmitted(true)
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-10">
        <div className="text-center">
          <h1 className="text-5xl font-playfair italic mb-4">Thank You.</h1>
          <p className="text-gray-500 font-inter uppercase tracking-widest text-xs">Our consultants will contact you shortly.</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="py-24 px-10 max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <span className="text-green-800 font-bold tracking-[.4em] text-[10px] uppercase block mb-4 font-inter">Inquiry</span>
          <h1 className="text-6xl font-playfair italic mb-4 tracking-tighter">Reserve Your Date.</h1>
          <div className="w-12 h-[1px] bg-gray-300 mx-auto"></div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8 font-inter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input name="name" type="text" placeholder="FULL NAME" className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-green-700 text-xs tracking-widest uppercase" required />
            <input name="email" type="email" placeholder="EMAIL ADDRESS" className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-green-700 text-xs tracking-widest uppercase" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <select name="event_type" className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-green-700 text-xs tracking-widest uppercase bg-transparent text-gray-500">
              <option value="">Select Event Type</option>
              <option value="corporate">Corporate Gala</option>
              <option value="wedding">Luxury Wedding</option>
              <option value="private">Private Celebration</option>
              <option value="other">Other</option>
            </select>
            <input name="event_date" type="date" className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-green-700 text-xs tracking-widest uppercase text-gray-500" required />
          </div>

          <textarea name="message" rows="4" placeholder="HOW CAN WE ASSIST YOU?" className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-green-700 text-xs tracking-widest uppercase" required></textarea>

          <button type="submit" disabled={loading} className="w-full bg-black text-white py-6 font-bold uppercase tracking-[.3em] text-[10px] hover:bg-green-900 transition duration-500">
            {loading ? 'Sending Inquiry...' : 'Submit Request'}
          </button>
        </form>
      </section>
    </main>
  )
}