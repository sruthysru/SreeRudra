import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', category: 'rudraksha', price: '', originalPrice: '', image: '', description: '', tag: '' });
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchProducts();
  }, [navigate]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await API.post('/products', form);
      setForm({ name: '', category: 'rudraksha', price: '', originalPrice: '', image: '', description: '', tag: '' });
      fetchProducts();
      alert('Product added successfully!');
    } catch (err) {
      alert('Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0A0807] text-stone-200 p-6 md:p-12">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8 border-b border-stone-800 pb-4">
        <h1 className="text-3xl font-cinzel font-bold text-[#D4AF37]">Admin Dashboard</h1>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="text-stone-400 hover:text-white text-sm">View Store</button>
          <button onClick={handleLogout} className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm hover:bg-red-500/20">Logout</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Product Form */}
        <div className="bg-[#14100E] border border-[#D4AF37]/20 p-6 rounded-xl h-fit">
          <h2 className="text-xl font-cinzel text-[#D4AF37] mb-4">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <input type="text" placeholder="Product Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-[#0A0807] border border-stone-800 p-2.5 rounded text-sm" required />
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-[#0A0807] border border-stone-800 p-2.5 rounded text-sm text-stone-300">
              <option value="rudraksha">Rudraksha</option>
              <option value="ebony">Ebony</option>
              <option value="gemstone">Gemstone</option>
              <option value="tulsi">Tulsi</option>
            </select>
            <div className="grid grid-cols-2 gap-2">
              <input type="number" placeholder="Price (₹)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="bg-[#0A0807] border border-stone-800 p-2.5 rounded text-sm" required />
              <input type="number" placeholder="Original Price" value={form.originalPrice} onChange={e => setForm({...form, originalPrice: e.target.value})} className="bg-[#0A0807] border border-stone-800 p-2.5 rounded text-sm" />
            </div>
            <input type="text" placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full bg-[#0A0807] border border-stone-800 p-2.5 rounded text-sm" required />
            <input type="text" placeholder="Tag (e.g. Best Seller)" value={form.tag} onChange={e => setForm({...form, tag: e.target.value})} className="w-full bg-[#0A0807] border border-stone-800 p-2.5 rounded text-sm" />
            <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-[#0A0807] border border-stone-800 p-2.5 rounded text-sm" rows="3" />
            <button type="submit" className="w-full bg-[#D4AF37] text-[#0A0807] font-semibold py-2.5 rounded hover:bg-[#e6c158] transition">Add Product</button>
          </form>
        </div>

        {/* Product List Table */}
        <div className="lg:col-span-2 bg-[#14100E] border border-[#D4AF37]/20 p-6 rounded-xl">
          <h2 className="text-xl font-cinzel text-[#D4AF37] mb-4">Manage Products ({products.length})</h2>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {products.map(p => (
              <div key={p._id} className="flex items-center justify-between bg-[#0A0807] border border-stone-800 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <h4 className="text-sm font-medium text-stone-200 line-clamp-1">{p.name}</h4>
                    <span className="text-xs text-[#D4AF37]">₹{p.price} | {p.category}</span>
                  </div>
                </div>
                <button onClick={() => handleDelete(p._id)} className="bg-red-500/10 text-red-400 border border-red-500/30 text-xs px-3 py-1.5 rounded hover:bg-red-500/20">Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}