function MarketplaceHome({ products, cart, setCart, activeUserPools, setActiveUserPools, setIsDrawerOpen }) {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [splitCount, setSplitCount] = useState(3);
  const [linkCopied, setLinkCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const handleCreatePoolLink = () => {
    const prodId = selectedProduct._id || selectedProduct.id;
    const shareableUrl = `${window.location.origin}/invite/${prodId}/${splitCount}`;
    navigator.clipboard.writeText(shareableUrl).then(() => {
      setLinkCopied(true);
      const newPoolEntry = { id: Date.now(), product: selectedProduct, splits: splitCount, filled: 1, status: "Awaiting Friends" };
      setActiveUserPools([newPoolEntry, ...activeUserPools]);
      setTimeout(() => { setLinkCopied(false); setSelectedProduct(null); navigate(`/invite/${prodId}/${splitCount}`); }, 1200);
    });
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{ padding: '40px 30px' }}>
        <div style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)', padding: '35px 40px', borderRadius: '24px', color: '#fff', marginBottom: '40px', boxShadow: '0 10px 20px -5px rgba(2,132,199,0.15)' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '32px', fontWeight: '800', letterSpacing: '-0.5px' }}>India's First Social Co-Buying Store</h1>
          <p style={{ margin: '0', opacity: 0.9, fontSize: '15px' }}>Skip full retail markups. Build dynamic group buying pools instantly to save big.</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ color: '#0f172a', margin: 0, fontSize: '22px', fontWeight: '700' }}>Trending Electronics Catalog</h2>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', width: '280px', outline: 'none' }}
          />
        </div>
        
        {filteredProducts.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No products found matching "{searchTerm}"</div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', marginBottom: '40px' }}>
            {filteredProducts.map((product) => (
              <div key={product._id || product.id} style={{ width: '290px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '20px' }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#0f172a' }}>{product.name}</h3>
                  <p style={{ fontSize: '14px', color: '#64748b', height: '40px', overflow: 'hidden' }}>{product.description || product.desc}</p>
                  <div style={{ fontWeight: '800', fontSize: '18px', margin: '10px 0', color: '#0284c7' }}>{formatINR(product.price)}</div>
                  <button onClick={() => setSelectedProduct(product)} style={{ width: '100%', padding: '10px', cursor: 'pointer', marginBottom: '8px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', borderRadius: '8px', fontWeight: '600' }}>
                    Configure Split Options
                  </button>
                  <button onClick={() => addToCart(product)} style={{ width: '100%', padding: '10px', cursor: 'pointer', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600' }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
          <Flame size={20} color="#f97316" fill="#f97316" />
          <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '700' }}>Live Co-Buy Stream</h3>
        </div>
        {INITIAL_LIVE_POOLS.map(pool => (
          <div key={pool.id} style={{ border: '1px solid #f1f5f9', background: '#f8fafc', padding: '16px', borderRadius: '14px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><strong>{pool.userName}</strong><span style={{ fontSize: '11px', color: '#ef4444', background: '#fee2e2', padding: '2px 6px', borderRadius: '4px' }}>⏱ {pool.timeLeft}</span></div>
            <div style={{ fontSize: '13px', marginBottom: '10px' }}>Splitting: <span style={{ color: '#0284c7', fontWeight: '600' }}>{pool.item}</span></div>
            <button onClick={() => setIsDrawerOpen(true)} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>Join Pool →</button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '24px', width: '420px', position: 'relative' }}>
            <button onClick={() => setSelectedProduct(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={22} /></button>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: '700' }}>Set Up a Buying Pool</h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>{selectedProduct.name}</p>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Total split shares:</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <button disabled={splitCount <= 2} onClick={() => setSplitCount(splitCount - 1)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #cbd5e1', cursor: 'pointer', fontSize: '18px' }}>-</button>
              <span style={{ fontSize: '22px', fontWeight: '700' }}>{splitCount}</span>
              <button disabled={splitCount >= 6} onClick={() => setSplitCount(splitCount + 1)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #cbd5e1', cursor: 'pointer', fontSize: '18px' }}>+</button>
            </div>
            <button onClick={handleCreatePoolLink} style={{ width: '100%', background: linkCopied ? '#10b981' : '#0284c7', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              {linkCopied ? <Check size={18} /> : <LinkIcon size={18} />}
              {linkCopied ? "Link Copied to Clipboard!" : "Generate & Copy Pool Link"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}