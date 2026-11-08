import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductGrid from './components/ProductGrid';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function Storefront() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const WHATSAPP_NUMBER = "919495290188";

  // പ്രൊഡക്റ്റ് കൃത്യമായി ഐഡി നോക്കി കാർട്ടിൽ ആഡ് ചെയ്യാൻ
  const handleAddToCart = (product) => {
    const productId = product._id || product.id;
    const existing = cart.find(item => (item._id === productId || item.id === productId));
    
    if (existing) {
      setCart(cart.map(item => 
        (item._id === productId || item.id === productId) 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, uniqueKey: productId, quantity: 1 }]);
    }
    showToast(`Added "${product.name}" to cart!`);
  };

  // കാർട്ടിലെ ക്വാണ്ടിറ്റി കൂട്ടാനും കുറയ്ക്കാനും
  const updateQuantity = (productId, delta) => {
    setCart(cart.map(item => {
      if (item._id === productId || item.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) {
      showToast('Your cart is empty!');
      return;
    }

    let message = `Hello *Sreerudra by Nandu*,\n\nI would like to place an order for the following sacred items:\n\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    message += `\n*Total Amount:* ₹${subtotal}\n\nPlease share payment details and delivery timeframe. Thank you!`;

   const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
   window.location.href = url;
  };

  return (
    <div className="bg-[#0A0807] text-stone-200 font-sans antialiased min-h-screen flex flex-col selection:bg-[#C59A45] selection:text-black">

      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#8C621D] via-[#C59A45] to-[#8C621D] text-[#120F0D] text-xs font-semibold py-2 px-4 text-center tracking-widest uppercase">
        ⚡ Express Worldwide Shipping &nbsp;|&nbsp; 🕉️ Authenticity Guaranteed & 100% Energized Bracelets
      </div>

      {/* Header & Navigation */}
      <header className="sticky top-0 z-40 bg-[#120F0D]/90 backdrop-blur-md border-b border-[#C59A45]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex flex-col items-start group">
            <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest bg-gradient-to-r from-[#FAF4E5] via-[#E5CB92] to-[#B28230] bg-clip-text text-transparent">
              SREERUDRA
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#E5CB92]/80 -mt-1 font-sans">
              BY NANDU
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#hero" className="hover:text-[#E5CB92] transition-colors">Home</a>
            <a href="#collection" className="hover:text-[#E5CB92] transition-colors">Collection</a>
            <a href="#energy" className="hover:text-[#E5CB92] transition-colors">Sacred Energy</a>
            <a href="#reviews" className="hover:text-[#E5CB92] transition-colors">Testimonials</a>
  
          </nav>

          <div className="flex items-center space-x-4 sm:space-x-6">
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Sreerudra by Nandu, I have an inquiry about your spiritual bracelets.")}`} 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-full hover:bg-emerald-900/50 transition"
            >
              <i className="fa-brands fa-whatsapp text-emerald-400 text-sm"></i>
              <span>WhatsApp Us</span>
            </a>

            {/* Cart Button with Icon & Count */}
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="relative p-2 text-[#E5CB92] hover:text-white transition focus:outline-none flex items-center gap-1.5 bg-[#C59A45]/10 border border-[#C59A45]/30 rounded-lg px-3 py-1.5" 
              aria-label="Open Cart"
            >
              <i className="fa-solid fa-bag-shopping text-base"></i>
              <span className="text-xs font-bold">Cart</span>
              <span className="absolute -top-2 -right-2 bg-[#C59A45] text-[#120F0D] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#120F0D]">
                {totalCartCount}
              </span>
            </button>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-[#E5CB92] hover:text-white p-2">
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1C1814] border-b border-[#C59A45]/20 px-4 pt-2 pb-6 space-y-3 text-center">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-stone-300 hover:text-[#E5CB92]">Home</a>
            <a href="#collection" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-stone-300 hover:text-[#E5CB92]">Collection</a>
            <a href="#energy" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-stone-300 hover:text-[#E5CB92]">Sacred Energy</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-stone-300 hover:text-[#E5CB92]">Testimonials</a>
           
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative py-20 lg:py-28 overflow-hidden flex items-center" style={{ backgroundImage: 'radial-gradient(#c59a45 0.75px, transparent 0.75px), radial-gradient(#c59a45 0.75px, #0a0807 0.75px)', backgroundSize: '30px 30px' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#120F0D]/80 to-[#0A0807] pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C59A45]/10 border border-[#C59A45]/30 text-[#E5CB92] text-xs font-semibold uppercase tracking-wider">
              <i className="fa-solid fa-om text-[#C59A45]"></i> Energized Spiritual Adornments
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-cinzel font-bold leading-tight">
              Invoke Harmony, Protection & <span className="bg-gradient-to-r from-[#FAF4E5] via-[#E5CB92] to-[#B28230] bg-clip-text text-transparent">Divine Vibration</span>
            </h1>
            <p className="text-stone-400 text-base sm:text-lg max-w-xl font-light leading-relaxed">
              Hand-crafted spiritual bracelets by <b>Sreerudra by Nandu</b>. Ritualistically energized with sacred Vedic mantras to shield your aura and align your inner chakras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
              <a href="#collection" className="px-8 py-4 bg-gradient-to-r from-[#B28230] to-[#C59A45] text-[#120F0D] font-bold text-sm tracking-widest uppercase rounded-lg hover:brightness-110 transition shadow-lg text-center">
                Explore Collection
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Sreerudra by Nandu, I would like a personal bracelet recommendation!")}`} target="_blank" rel="noreferrer" className="px-6 py-4 bg-emerald-900/40 border border-emerald-500/50 text-emerald-300 font-semibold text-sm tracking-wider uppercase rounded-lg hover:bg-emerald-900/75 transition flex items-center justify-center gap-2">
                <i className="fa-brands fa-whatsapp text-lg text-emerald-400"></i> Direct Order Support
              </a>
            </div>

            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-stone-800 text-center md:text-left">
              <div>
                <div className="text-[#E5CB92] font-cinzel font-bold text-lg">100%</div>
                <div className="text-stone-500 text-xs">Authentic Gemstones</div>
              </div>
              <div>
                <div className="text-[#E5CB92] font-cinzel font-bold text-lg">Vedic</div>
                <div className="text-stone-500 text-xs">Mantras Energized</div>
              </div>
              <div>
                <div className="text-[#E5CB92] font-cinzel font-bold text-lg">Global</div>
                <div className="text-stone-500 text-xs">Secure Delivery</div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-2xl p-1 bg-gradient-to-tr from-[#B28230]/40 via-[#D97745]/20 to-transparent">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-[#1C1814] relative group">
                <img src="https://images.unsplash.com/photo-1611591475140-43a743419250?auto=format&fit=crop&w=800&q=80" alt="Sreerudra Sacred Bracelet" className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120F0D] via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#120F0D]/80 backdrop-blur-md border border-[#C59A45]/30">
                  <span className="text-xs text-[#C59A45] uppercase tracking-widest block font-medium">Signature Creation</span>
                  <span className="text-lg font-cinzel font-semibold text-white">Mahadeva Panchamukhi Rudraksha</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <ProductGrid onAddToCart={handleAddToCart} />

      {/* Why Choose Us Section */}
      <section id="energy" className="py-20 bg-[#1C1814] border-y border-[#C59A45]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-[#D97745] uppercase tracking-widest">The Sreerudra Difference</span>
              <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-white">Why Wear Our Energized Bracelets?</h2>
              <p className="text-stone-400 leading-relaxed font-light">
                At <b>Sreerudra by Nandu</b>, bracelets are not mere ornaments. Each bead is cleansed, consecrated, and infused with focused intention through traditional authentic puja rituals prior to dispatch.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#C59A45]/10 border border-[#C59A45]/30 flex items-center justify-center shrink-0 text-[#C59A45]">
                    <i className="fa-solid fa-fire"></i>
                  </div>
                  <div>
                    <h4 className="font-cinzel text-white font-semibold">Ritual Consecration</h4>
                    <p className="text-stone-400 text-xs mt-1">Imbued with positive acoustic vibrations of Vedic Suktams for maximum healing benefit.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#C59A45]/10 border border-[#C59A45]/30 flex items-center justify-center shrink-0 text-[#C59A45]">
                    <i className="fa-solid fa-gem"></i>
                  </div>
                  <div>
                    <h4 className="font-cinzel text-white font-semibold">100% Natural & Lab Certified</h4>
                    <p className="text-stone-400 text-xs mt-1">We source unheated gemstones, original Nepalese/Indonesian Rudraksha, and genuine Karungali wood.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#C59A45]/10 border border-[#C59A45]/30 flex items-center justify-center shrink-0 text-[#C59A45]">
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <div>
                    <h4 className="font-cinzel text-white font-semibold">Aura Protection & Balance</h4>
                    <p className="text-stone-400 text-xs mt-1">Designed to dispel negative energies, improve focus, stress relief, and ground your spirit.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80" alt="Sacred Beads" className="rounded-xl border border-[#C59A45]/20 object-cover h-64 w-full shadow-lg" />
              <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80" alt="Jewelry Design" className="rounded-xl border border-[#C59A45]/20 object-cover h-64 w-full mt-8 shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold text-[#C59A45] uppercase tracking-widest">Blessed Experiences</span>
          <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-white">Words From Our Devotees & Patrons</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#C59A45] to-transparent mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { quote: "I felt an immediate sense of calmness after wearing the Karungali Ebony bracelet. The craftsmanship by Nandu and team is exquisite.", name: "Rajesh K.", location: "Bengaluru" },
            { quote: "Ordering via WhatsApp was so fast and smooth! The Rudraksha bracelet arrived in a beautiful velvet pouch with a consecration certificate.", name: "Ananya M.", location: "Mumbai" },
            { quote: "The Amethyst Healing bracelet exceeded my expectations. High quality gemstone beads and strong durable elastic band. Pure spiritual energy!", name: "Dr. Vikram S.", location: "Kochi" }
          ].map((rev, i) => (
            <div key={i} className="bg-[#1C1814] p-6 rounded-2xl border border-[#C59A45]/20 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-[#C59A45] text-xs space-x-1">
                  {[...Array(5)].map((_, idx) => <i key={idx} className="fa-solid fa-star"></i>)}
                </div>
                <p className="text-stone-300 text-sm italic">"{rev.quote}"</p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">{rev.name}</div>
                  <div className="text-xs text-stone-500">Verified Purchaser ({rev.location})</div>
                </div>
                <i className="fa-solid fa-circle-check text-emerald-400 text-sm"></i>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-[#120F0D] border-t border-[#C59A45]/20 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
            <div className="space-y-4 md:col-span-1">
              <span className="font-cinzel text-xl font-bold tracking-widest bg-gradient-to-r from-[#FAF4E5] via-[#E5CB92] to-[#B28230] bg-clip-text text-transparent block">
                SREERUDRA
              </span>
              <span className="text-xs tracking-[0.25em] uppercase text-[#E5CB92]/80 -mt-3 block font-sans">
                BY NANDU
              </span>
              <p className="text-stone-400 text-xs leading-relaxed font-light">
                Authentic energized spiritual bracelets, malas, and sacred gemstone jewelry curated for inner transformation, protection, and peace.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-cinzel text-white text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li><a href="#collection" className="hover:text-[#E5CB92] transition">Rudraksha Collection</a></li>
                <li><a href="#collection" className="hover:text-[#E5CB92] transition">Karungali Ebony Wood</a></li>
                <li><a href="#collection" className="hover:text-[#E5CB92] transition">Gemstone Energy Malas</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-cinzel text-white text-sm font-semibold uppercase tracking-wider">Sacred Care</h4>
              <p className="text-stone-400 text-xs leading-relaxed">
                • Remove during bathing or swimming.<br />
                • Clean gently with soft natural oil (sandalwood/sesame) monthly.<br />
                • Re-energize in morning sunlight or under incense smoke.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-cinzel text-white text-sm font-semibold uppercase tracking-wider">Connect & Order</h4>
              <p className="text-stone-400 text-xs">For personalized astrological advice & custom sizes:</p>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs font-semibold hover:bg-emerald-800/60 transition">
                <i className="fa-brands fa-whatsapp text-emerald-400 text-base"></i> Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4">
            <p>&copy; {new Date().getFullYear()} Sreerudra by Nandu. All Sacred Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart Drawer Modal with Working Close Button */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#1C1814] h-full shadow-2xl border-l border-[#C59A45]/20 flex flex-col">
            <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-[#120F0D]">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-bag-shopping text-[#C59A45]"></i>
                <h3 className="font-cinzel text-lg font-bold text-white">Your Sacred Cart</h3>
              </div>
              {/* Working Close Button */}
              <button onClick={() => setIsCartOpen(false)} className="text-stone-400 hover:text-white p-2">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <i className="fa-solid fa-bag-shopping text-4xl text-stone-600"></i>
                  <p className="text-stone-400 text-sm">Your sacred cart is currently empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item._id || item.id} className="flex items-center gap-4 bg-[#120F0D] p-3 rounded-xl border border-stone-800">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border border-[#C59A45]/20" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-cinzel text-xs font-semibold text-white truncate">{item.name}</h4>
                      <div className="text-xs text-[#E5CB92] font-semibold mt-1">₹{item.price}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item._id || item.id, -1)} className="w-5 h-5 bg-stone-800 hover:bg-stone-700 rounded flex items-center justify-center text-xs text-stone-300">-</button>
                        <span className="text-xs font-semibold text-white px-2">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id || item.id, 1)} className="w-5 h-5 bg-stone-800 hover:bg-stone-700 rounded flex items-center justify-center text-xs text-stone-300">+</button>
                      </div>
                    </div>
                    <button onClick={() => updateQuantity(item._id || item.id, -item.quantity)} className="text-stone-500 hover:text-red-400 p-1">
                      <i className="fa-solid fa-trash text-xs"></i>
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-5 border-t border-stone-800 bg-[#120F0D] space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-400">Subtotal:</span>
                <span className="font-cinzel font-bold text-[#E5CB92] text-lg">₹{subtotal}</span>
              </div>
              <button onClick={handleWhatsAppCheckout} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition flex items-center justify-center gap-2">
                <i className="fa-brands fa-whatsapp text-lg"></i> Checkout via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Sreerudra by Nandu! I am interested in buying your spiritual bracelets.")}`} 
        target="_blank" 
        rel="noreferrer" 
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-400 text-white p-4 rounded-full shadow-2xl flex items-center justify-center group transition-all duration-300 hover:scale-110 border-2 border-[#120F0D]"
        aria-label="Order via WhatsApp"
      >
        <i className="fa-brands fa-whatsapp text-3xl"></i>
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
          Order via WhatsApp
        </span>
      </a>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#1C1814] border border-[#C59A45]/40 text-[#FAF4E5] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <i className="fa-solid fa-circle-check text-[#C59A45]"></i>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Storefront />} />
      <Route path="/nandu-secret-portal-login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}