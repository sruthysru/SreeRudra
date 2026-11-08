import React from 'react';

export default function Navbar({ cartCount, onOpenCart }) {
  return (
    <nav className="sticky top-0 z-50 bg-[#0A0807]/90 backdrop-blur-md border-b border-[#D4AF37]/20 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <span className="text-2xl font-cinzel font-bold text-[#D4AF37] tracking-wider">
          Sreerudra <span className="text-stone-300 text-sm font-sans font-light">by Nandu</span>
        </span>
      </div>

      <div className="flex items-center gap-6">
        <a href="/admin/login" className="text-sm text-stone-400 hover:text-[#D4AF37] transition">
          Admin Login
        </a>
        <button 
          onClick={onOpenCart}
          className="relative bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] px-4 py-2 rounded-lg hover:bg-[#D4AF37]/20 transition flex items-center gap-2"
        >
          <span>🛒 Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#0A0807] font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}