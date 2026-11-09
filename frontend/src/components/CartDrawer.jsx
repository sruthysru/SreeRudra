import React from 'react';

export default function CartDrawer({ isOpen, onClose, cart, onRemoveFromCart }) {
  if (!isOpen) return null;

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  // Handle WhatsApp Checkout
  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message = "*New Order from Sreerudra Website*%0A%0A";
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ₹${item.price}%0A`;
    });
    message += `%0A*Total Amount: ₹${totalPrice}*%0A%0APlease confirm my order!`;

    // Replace with your actual WhatsApp business/personal number (with country code, e.g., 919876543210)
    const phoneNumber = "918891241035"; 
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#14100E] border-l border-[#D4AF37]/20 h-full flex flex-col p-6 text-stone-200">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-stone-800 pb-4 mb-4">
          <h2 className="text-xl font-cinzel font-bold text-[#D4AF37]">Your Sacred Cart</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-white text-xl">✕</button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {cart.length === 0 ? (
            <p className="text-center text-stone-500 py-20 font-light">Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-[#0A0807] border border-[#D4AF37]/10 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <h4 className="text-sm font-medium text-stone-200 line-clamp-1">{item.name}</h4>
                    <span className="text-xs text-[#D4AF37]">₹{item.price}</span>
                  </div>
                </div>
                <button 
                  onClick={() => onRemoveFromCart(index)}
                  className="text-stone-500 hover:text-red-400 text-xs px-2 py-1"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-stone-800 pt-4 mt-4">
            <div className="flex justify-between items-center mb-4 text-lg font-semibold">
              <span className="text-stone-400">Total:</span>
              <span className="text-[#D4AF37]">₹{totalPrice}</span>
            </div>
            
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
            >
              <span>💬 Order via WhatsApp</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}