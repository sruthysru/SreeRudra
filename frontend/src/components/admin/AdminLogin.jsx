import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/auth/login', { username, password });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0807] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#14100E] border border-[#D4AF37]/30 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-cinzel font-bold text-[#D4AF37] text-center mb-6">Admin Portal</h2>
        
        {error && <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded mb-4 text-sm text-center">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#0A0807] border border-stone-800 rounded-lg p-3 text-stone-200 focus:border-[#D4AF37] outline-none"
              required 
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0A0807] border border-stone-800 rounded-lg p-3 text-stone-200 focus:border-[#D4AF37] outline-none"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#D4AF37] text-[#0A0807] font-semibold py-3 rounded-lg hover:bg-[#e6c158] transition mt-2"
          >
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}