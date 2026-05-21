export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-24 px-10 text-center bg-gray-50">
        <span className="text-green-800 font-bold tracking-[.4em] text-[10px] uppercase block mb-4 font-inter">Who We Are</span>
        <h1 className="text-5xl md:text-7xl font-playfair italic mb-8 tracking-tighter">Committed to Quality and Reliability.</h1>
        <div className="w-16 h-[1px] bg-gray-300 mx-auto"></div>
      </section>

      <section className="py-24 px-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <img src="about.jpg" />
          <div className="space-y-6 font-inter text-gray-600 font-light leading-relaxed">
             <p>Pazmat Investments is a premier events and equipment hire company located in Madokero, Harare. We understand that organizing an event can be overwhelming, which is why we step in to handle the logistics of your seating, shelter, and presentation.</p>
             <p> Our Mission: To provide clean, modern, and reliable event equipment accompanied by excellent customer service, ensuring every event we supply is a resounding success.

            <p></p> Our Promise: No hidden fees, punctual delivery via our dedicated transport service, and equipment that looks exactly as advertised.</p>
             <p className="font-playfair text-2xl text-black italic">"Your trusted local partner for event perfection."</p>
          </div>
        </div>
      </section>
    </main>
  )
}