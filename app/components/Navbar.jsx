import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-100 px-8 py-6 flex justify-between items-center sticky top-0 z-[100]">
      {/* Brand Logo */}
      <Link href="/" className="no-underline decoration-transparent">
        <div className="flex flex-col leading-none">
          <span className="font-playfair text-2xl font-black tracking-tighter text-black uppercase">
            PAZMAT
          </span>
          <span className="text-[10px] font-inter font-bold tracking-[0.3em] text-green-700 mt-1 uppercase">
            INVESTMENTS
          </span>
        </div>
      </Link>

      {/* Links */}
      <div className="flex items-center gap-8">
        <Link href="/gallery" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition no-underline">
          Gallery
        </Link>
        <Link href="/login" className="text-xs font-bold uppercase tracking-widest bg-black text-white px-4 py-2 hover:bg-green-800 transition no-underline">
          Staff Login
        </Link>
      </div>
    </nav>
  )
}