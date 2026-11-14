import React, { useEffect, useState, useRef } from 'react';
import API from '../services/api';

export default function ProductGrid({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { id: 'all', label: 'All Sacred Items' },
    { id: 'rudraksha', label: 'Rudraksha' },
    { id: 'ebony', label: 'Karungali' },
    { id: 'gemstone', label: 'Rosery' },
    { id: 'redsandel', label: 'Red Sandel'},
    { id: 'tulsi', label: 'Tulsi' }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleWhatsAppOrder = (product) => {
    const phoneNumber = "918891241035"; 
    const message = `Namaste, I want to order this sacred item:\n*Name:* ${product.name}\n*Price:* ₹${product.price}\n*Category:* ${product.category}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.location.href = url;
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-[#E5CB92]">
        <i className="fa-solid fa-spinner fa-spin text-3xl"></i>
        <p className="text-xs mt-2 uppercase tracking-widest">Loading Sacred Collection...</p>
      </div>
    );
  }

  return (
    <section id="collection" className="py-8 md:py-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-8 md:mb-10 gap-4 md:gap-6">
        <div>
          <span className="text-xs font-semibold text-[#C59A45] uppercase tracking-widest">Sacred Catalog</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-white mt-1">Explore Our Energized Collection</h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-2 max-w-xl mx-auto">Select your divine wrist mala tailored for aura protection, peace, and meditation.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-row overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-2 w-full max-w-full pb-2 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider shrink-0 transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#B28230] to-[#C59A45] text-[#120F0D] shadow-lg font-bold'
                  : 'bg-[#1C1814] text-stone-400 border border-[#C59A45]/20 hover:text-white hover:border-[#C59A45]/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Display Section */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-[#1C1814] rounded-2xl border border-stone-800">
          <i className="fa-solid fa-box-open text-4xl text-stone-600 mb-3"></i>
          <p className="text-stone-400 text-sm">No sacred items found in this category yet.</p>
        </div>
      ) : (
        <div className="relative group w-full">
          {/* Left & Right Scroll Buttons (Desktop) */}
          <button 
            onClick={() => scroll('left')} 
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-[#1C1814] border border-[#C59A45]/40 text-[#E5CB92] w-10 h-10 rounded-full shadow-2xl items-center justify-center hidden md:flex hover:bg-[#C59A45] hover:text-[#120F0D] transition"
            aria-label="Scroll Left"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <button 
            onClick={() => scroll('right')} 
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-[#1C1814] border border-[#C59A45]/40 text-[#E5CB92] w-10 h-10 rounded-full shadow-2xl items-center justify-center hidden md:flex hover:bg-[#C59A45] hover:text-[#120F0D] transition"
            aria-label="Scroll Right"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>

          {/* Clean Horizontal Scroll Container */}
          <div 
            ref={scrollRef}
            className="flex flex-row gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 px-1 scroll-smooth w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {filteredProducts.map((product) => (
              <div 
                key={product._id} 
                className="w-[260px] sm:w-[280px] md:w-[300px] shrink-0 bg-[#1C1814] rounded-2xl border border-[#C59A45]/20 overflow-hidden flex flex-col justify-between group/card hover:border-[#C59A45]/60 transition duration-300 shadow-xl"
              >
                <div>
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-[#120F0D]">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover/card:scale-105 transition duration-500 ease-out" 
                    />
                    {product.tag && (
                      <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#120F0D]/85 backdrop-blur-md border border-[#C59A45]/40 text-[#E5CB92] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2 sm:px-2.5 py-1 rounded-full z-10 shadow">
                        {product.tag}
                      </span>
                    )}
                  </div>

                  <div className="p-3 sm:p-4 space-y-1">
                    <span className="text-[9px] sm:text-[10px] text-[#C59A45] uppercase tracking-widest block font-medium">
                      {product.category}
                    </span>
                    <h3 className="font-cinzel text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover/card:text-[#E5CB92] transition">
                      {product.name}
                    </h3>
                    <p className="text-stone-400 text-[10px] sm:text-[11px] line-clamp-2 font-light leading-relaxed">
                      {product.description || 'Energized sacred accessory for spiritual well-being.'}
                    </p>
                  </div>
                </div>

                {/* Footer Price & Buttons */}
                <div className="p-3 sm:p-4 pt-0 border-t border-stone-800/80 mt-auto space-y-2">
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[10px] sm:text-[11px] text-stone-500 line-through mr-1.5">
                        {product.originalPrice ? `₹${product.originalPrice}` : ''}
                      </span>
                      <span className="font-cinzel font-bold text-[#E5CB92] text-xs sm:text-sm">
                        ₹{product.price}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="py-1.5 sm:py-2 bg-gradient-to-r from-[#B28230] to-[#C59A45] text-[#120F0D] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider rounded-lg hover:brightness-110 transition shadow-md flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <i className="fa-solid fa-bag-shopping text-[9px]"></i> Add
                    </button>
                    <button 
                      onClick={() => handleWhatsAppOrder(product)}
                      className="py-1.5 sm:py-2 bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-bold text-[10px] sm:text-[11px] uppercase tracking-wider rounded-lg hover:bg-emerald-600/30 transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <i className="fa-brands fa-whatsapp text-xs"></i> WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}