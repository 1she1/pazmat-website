export default function WhatsApp() {
  return (
    <a 
      href="https://wa.me/263700000000" 
      target="_blank"
      className="fixed bottom-10 right-10 bg-green-600 text-white px-6 py-4 rounded-full shadow-2xl z-[999] font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform no-underline flex items-center gap-2"
    >
      <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
      Chat with us
    </a>
  )
}