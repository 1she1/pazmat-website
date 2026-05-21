import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. HERO: Links to Gallery and Contact */}
      <section className="relative h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" /> 
          <img 
            src="hero.png" 
            alt="Pazmat Investments Hero" 
            className="w-full h-full object-cover scale-105 animate-pulse-slow"
          />
        </div>

        <div className="relative z-20 text-center text-white px-6">
          <span className="font-inter text-[10px] font-bold tracking-[0.6em] uppercase mb-6 block text-green-400">
            Pazmat Investments
          </span>
          <h1 className="text-6xl md:text-9xl font-playfair mb-10 tracking-tighter italic">
            Reliable Event Equipment & Tent Hire in Harare.
          </h1>
          <p className="font-inter text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto opacity-80 leading-relaxed">
            Architecting bespoke corporate events and luxury private celebrations where every detail is an investment in perfection.
          </p>

          <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
            <Link href="/gallery" className="btn-premium no-underline text-center min-w-[240px]">
              Explore the Portfolio
            </Link>
            <Link href="/contact" className="px-8 py-4 border border-white text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-all duration-500 no-underline text-center min-w-[240px]">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE PHILOSOPHY: Links to About */}
      <section className="py-32 bg-white px-10">
        <div className="max-w-4xl mx-auto text-center border-b pb-20">
          <h2 className="text-4xl md:text-5xl font-playfair italic mb-8 tracking-tight text-gray-900 leading-tight">
           Event Hire Made Simple.
          </h2>
          <div className="w-12 h-[1px] bg-gray-300 mx-auto mb-10"></div>
          <p className="text-gray-500 font-inter font-light text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            We don't just plan gatherings. We create environments that reflect prestige and 
            facilitate deep connection. 
          </p>
          {/* LINK TO ABOUT */}
          <Link href="/about" className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-800 border-b border-green-800 pb-2 hover:text-black hover:border-black transition-all">
            Read Our Full Story
          </Link>
        </div>
      </section>

      {/* 3. SERVICES SUMMARY: The Three Pillars */}
      <section className="py-32 bg-gray-50 border-t border-b border-gray-100 px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            
            {/* Pillar 01: Gathering */}
            <div className="group">
              <div className="aspect-[4/5] overflow-hidden mb-8 rounded-sm shadow-lg">
                <img 
                  src="plastic-chairs.jpg" 
                  alt="Gatherings" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest block mb-4"></span>
              <h3 className="text-2xl font-playfair mb-4 group-hover:italic transition-all">Gatherings</h3>
              <p className="text-gray-500 font-inter font-light text-sm leading-relaxed mb-8">Creating impactful experiences for corporate brands through precision planning.</p>
              <Link href="/services" className="text-[10px] font-bold uppercase border-b border-black pb-1 hover:text-green-700 hover:border-green-700 transition no-underline">View Service Details</Link>
            </div>

            {/* Pillar 02: Birthdays/Weddings */}
            <div className="group">
              <div className="aspect-[4/5] overflow-hidden mb-8 rounded-sm shadow-lg">
                <img 
                  src="event-support.jpg" 
                  alt="Birthday Celebrations" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest block mb-4"></span>
              <h3 className="text-2xl font-playfair mb-4 group-hover:italic transition-all">Birthday Celebrations</h3>
              <p className="text-gray-500 font-inter font-light text-sm leading-relaxed mb-8">Designing timeless celebrations with a focus on high-end decor and seamless flow.</p>
              <Link href="/services" className="text-[10px] font-bold uppercase border-b border-black pb-1 hover:text-green-700 hover:border-green-700 transition no-underline">View Service Details</Link>
            </div>

            {/* Pillar 03: Logistics */}
            <div className="group">
              <div className="aspect-[4/5] overflow-hidden mb-8 rounded-sm shadow-lg">
                <img 
                  src="transportservices.jpeg" 
                  alt="Event Logistics" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest block mb-4"></span>
              <h3 className="text-2xl font-playfair mb-4 group-hover:italic transition-all">Event Logistics</h3>
              <p className="text-gray-500 font-inter font-light text-sm leading-relaxed mb-8">Beyond design, we manage venue sourcing, equipment hire, and technical coordination.</p>
              <Link href="/services" className="text-[10px] font-bold uppercase border-b border-black pb-1 hover:text-green-700 hover:border-green-700 transition no-underline">View Service Details</Link>
            </div>

          </div>
        </div>
      </section>
{/* 4. GALLERY PREVIEW: Fixed Aspect Ratio */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-10">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b pb-8">
            <div>
              <span className="text-green-700 font-bold tracking-[.4em] text-[10px] uppercase mb-4 block font-inter">Visual Archive</span>
              <h2 className="text-5xl font-playfair italic tracking-tighter">Everything You Need For Your Event.</h2>
            </div>
            <Link href="/gallery" className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-green-700 hover:border-green-700 transition no-underline">
              Browse All Events
            </Link>
          </div>

          {/* THE FIXED IMAGE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             
             {/* Left Image Container */}
             <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-xl bg-gray-100">
                <img 
                  src="about.jpg"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  alt="Pazmat Branding"
                />
             </div>

             {/* Right Image Container */}
             <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-xl bg-gray-100">
                <img 
                  src="about.jpg" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  alt="Event Setup"
                />
             </div>

          </div>
        </div>
      </section>

      {/* 5. FINAL CTA: Links to Contact */}
      <section className="py-32 px-10 text-center bg-gray-50 border-t border-b">
        <h2 className="text-6xl font-playfair mb-10 italic tracking-tighter">Ready to start?</h2>
        <Link href="/contact" className="btn-premium no-underline inline-block shadow-2xl">
          Request a Quotation
        </Link>
      </section>

      {/* 6. FOOTER: Navigation Links for Convenience */}
     {/* 6. FOOTER */}
     {/* --- PREMIUM DARK FOOTER --- */}
      <footer className="bg-[#0b130e] text-white pt-24 pb-12 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Top Section: CTA */}
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-playfair mb-6 italic">Ready to host a memorable event?</h2>
            <p className="text-gray-400 font-inter mb-10 text-sm tracking-wide">Get in touch with our team today to secure your dates and equipment.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="https://wa.me/263772639622" className="bg-[#1ea335] text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-green-600 transition shadow-lg no-underline min-w-[200px]">
                Book on WhatsApp
              </a>
              <Link href="/contact" className="border border-gray-600 text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition no-underline min-w-[200px]">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Bottom Section: Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-gray-800 pt-16">
            
            {/* Column 1: Brand */}
            <div>
              <img src="/logo.svg" alt="Pazmat Logo" className="h-16 w-auto mb-8 bg-white p-2 rounded-sm" />
              <h3 className="text-xl font-playfair mb-4 italic">Pazmat Investments</h3>
              <p className="text-gray-400 text-sm font-inter leading-relaxed mb-8 max-w-sm">
                Your trusted partner for event equipment hire in Harare. Tents, chairs, tables, and transport to make your event perfect.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-700 transition">f</a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-700 transition">ig</a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-500 mb-8 underline underline-offset-8">Quick Links</h4>
              <ul className="space-y-4 font-inter text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition flex items-center gap-2"><span>›</span> Home</Link></li>
                <li><Link href="/about" className="hover:text-white transition flex items-center gap-2"><span>›</span> About Us</Link></li>
                <li><Link href="/services" className="hover:text-white transition flex items-center gap-2"><span>›</span> Our Services</Link></li>
                <li><Link href="/contact" className="hover:text-white transition flex items-center gap-2"><span>›</span> Make a Booking</Link></li>
                <li><Link href="/admin" className="text-gray-700 hover:text-white transition text-[10px] uppercase font-bold tracking-widest mt-4 block">Staff Dashboard</Link></li>
              </ul>
            </div>

            {/* Column 3: Contact Details */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-500 mb-8 underline underline-offset-8">Contact Details</h4>
              <ul className="space-y-6 font-inter text-sm text-gray-400">
                <li className="flex items-start gap-4">
                  <span className="text-green-500 font-bold">📞</span>
                  <span>+263 77 263 9622</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-green-500 font-bold">💬</span>
                  <span>0772 639 622</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-green-500 font-bold">📧</span>
                  <span>pazmatinvestments1@gmail.com</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-green-500 font-bold">📍</span>
                  <span>13264 Madokero, Harare</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="text-center mt-20 border-t border-gray-800 pt-8 opacity-20">
            <p className="text-[8px] font-bold uppercase tracking-[0.5em]">© {new Date().getFullYear()} Pazmat Investments • All Rights Reserved</p>
          </div>
        </div>
      </footer>

    </main>
  )
}
// This goes at the very bottom of the file, outside of the HomePage function
function PriceCard({ title, price }: { title: string; price: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 text-center group">
      <h3 className="font-playfair text-lg mb-6 group-hover:italic transition-all uppercase tracking-tight">{title}</h3>
      <div className="mb-8">
        <span className="text-xs font-bold text-gray-400">US$</span>
        <span className="text-4xl font-black text-black">{price}</span>
      </div>
      <Link 
        href="/contact" 
        className="block w-full border border-gray-200 text-gray-500 py-3 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-black hover:text-white hover:border-black transition no-underline"
      >
        Book This Size
      </Link>
    </div>
  )
}