export default function ServicesPage() {
  const services = [
    {
      title: "Tent Hire",
      desc: "High-quality, weather-resistant tents available in various sizes to accommodate any guest list.",
      image: "tent-hire.jpg", // Placeholder
      
    },
    {
      title: "Plastic Chairs",
      desc: "Clean, sturdy armless plastic chairs perfect for neat seating arrangements.",
      image: "plastic-chairs.jpg",
      
    },
    {
      title: "Foldable Tables",
      desc: "Strong rectangular tables ideal for catering, gifts, or guest seating.",
      image: "foldabletables.jpg",
      
    },
    {
      title: "Stanchions",
      desc: "VIP rope barriers to create an exclusive entrance or guide your guests.",
      image: "stanchions.jpg",
      
    },
    {
      title: "Red Runner Carpet",
      desc: "Add a touch of Hollywood elegance to your wedding aisle or event entrance.",
      image: "red-carpet.jpg",
      
    },
    {
      title: "Chafing Dishes",
      desc: "Keep your catered food warm and professionally presented for your guests.",
      image: "chafing-dishes.jpg",
      
    },
    {
      title: "Transport Service",
      desc: "Hassle-free delivery and collection of all hired equipment in Harare and surrounding areas.",
      image: "transportservices.jpeg",
      
    },
    {
      title: "Event Support Equipment",
      desc: "Miscellaneous items including lighting and extensions to ensure everything runs smoothly.",
      image: "event-support.jpg",
      
    },
    {
      title: "Balloon Decor",
      desc: "Elevate your event with custom balloon arches, beautiful garlands, and creative balloon centerpieces.",
      image: "event-support.jpg",
      
    },
    {
      title: "Artificial Turf",
      desc: "High-quality artificial green grass to create a clean, vibrant, and luxurious floor setting.",
      image: "artficialturf.jpg",
      
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="py-24 px-10 text-center bg-[#064e3b] text-white">
        <span className="text-green-400 font-bold tracking-[.4em] text-[10px] uppercase block mb-4 font-inter">Equipment & Hire</span>
        <h1 className="text-5xl md:text-7xl font-playfair italic mb-6">Our Services.</h1>
        <p className="max-w-2xl mx-auto font-inter font-light opacity-80 text-sm md:text-base leading-relaxed">
          From high-end logistics to custom event styling, Pazmat Investments provides the infrastructure 
          needed to execute perfect events in Harare and beyond.
        </p>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div key={index} className="group border border-gray-100 rounded-sm overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white">
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"                />
                <div className="absolute top-4 left-4 bg-white text-black text-[10px] font-bold px-3 py-1 tracking-widest uppercase">
                  {service.num}
                </div>
              </div>
              
              {/* Text Content */}
              <div className="p-8">
                <h2 className="text-2xl font-playfair mb-4 group-hover:text-green-800 transition-colors">{service.title}</h2>
                <p className="text-gray-500 font-inter font-light text-sm leading-relaxed">
                  {service.desc}
                </p>
                <div className="mt-6 w-8 h-[1px] bg-gray-300 group-hover:w-full group-hover:bg-green-800 transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50 text-center px-10">
        <h2 className="text-4xl font-playfair mb-8 italic">Ready to hire?</h2>
        <a href="/contact" className="btn-premium no-underline inline-block">
          Get a Quote Now
        </a>
      </section>
    </main>
  );
}