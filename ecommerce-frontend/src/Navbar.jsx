import React from 'react';
import { ShoppingBag, Users, ShoppingCart, SlidersHorizontal, Search } from 'lucide-react';

export default function Navbar({ cartCount, onCartClick, searchQuery, setSearchQuery }) {
  return (
    <nav style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4f46e5', fontWeight: 'bold' }}>
        <ShoppingBag size={24} />
        <span>CoShop</span>
      </div>

      {/* Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', padding: '6px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', width: '300px', gap: '8px' }}>
        <Search size={18} color="#64748b" />
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '14px' }}
        />
      </div>

      {/* Right Side: Filter, Active Pools, and Cart */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <SlidersHorizontal size={18} /> Filter
        </button>
        <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <Users size={18} /> Active Pools
        </button>
        <button onClick={onCartClick} style={{ background: 'none', border: 'none', position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <ShoppingCart size={22} />
          {cartCount > 0 && (
            <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ef4444', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '10px', fontWeight: 'bold' }}>
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}