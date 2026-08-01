import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { Users, X, Link as LinkIcon, Check, Flame, ArrowRight, Sparkles, ShieldCheck, ShoppingCart, CreditCard, CheckCircle, AlertTriangle, SlidersHorizontal } from 'lucide-react';

const INITIAL_LIVE_POOLS = [
  { id: 101, userName: "Arjun M.", item: "Mechanical Gaming Keyboard", currentPeers: 2, targetPeers: 3, timeLeft: "4m" },
  { id: 102, userName: "Priya K.", item: "Ergonomic Office Chair", currentPeers: 1, targetPeers: 2, timeLeft: "12m" },
  { id: 103, userName: "Rohan S.", item: "Premium Wireless Headphones", currentPeers: 3, targetPeers: 4, timeLeft: "7m" }
];

const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export default function AppRouter() {
  const [activeUserPools, setActiveUserPools] = useState(() => {
    const saved = localStorage.getItem('coshop_pools');
    return saved ? JSON.parse(saved) : [];
  });
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // State to hold products from backend
  const [products, setProducts] = useState([]);

  useEffect(() => {
    localStorage.setItem('coshop_pools', JSON.stringify(activeUserPools));
  }, [activeUserPools]);

  // Fetch products from backend using Vercel environment variable
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', position: 'relative', overflowX: 'hidden' }}>
        
        <nav style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{ background: '#0284c7', color: '#fff', padding: '8px 12px', borderRadius: '10px', fontWeight: '800', fontSize: '18px' }}>Co</div>
            <span style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>Shop</span>
          </Link>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button onClick={() => setIsFilterOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: '#475569', fontWeight: '600' }}><SlidersHorizontal size={16}/> Filter</button>
            <button onClick={() => setIsCartOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', fontWeight: '600' }}>Cart ({cart.length})</button>
            <Link to="/" style={{ textDecoration: 'none', color: '#475569', fontWeight: '600', fontSize: '14px' }}>Marketplace</Link>
            
            <button 
              onClick={() => setIsDrawerOpen(true)}
              style={{ background: '#f1f5f9', border: 'none', padding: '10px 16px', borderRadius: '10px', color: '#0f172a', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', position: 'relative' }}
            >
              <ShoppingCart size={16} color="#0284c7" />
              Active Co-Pools
              {activeUserPools.length > 0 && (
                <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#ef4444', color: '#fff', fontSize: '11px', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '700' }}>
                  {activeUserPools.length}
                </span>
              )}
            </button>
          </div>
        </nav>

        {isCartOpen && (
          <div style={{ position: 'fixed', top: 0, right: 0, width: '360px', height: '100vh', background: '#fff', zIndex: 9999, padding: '30px', boxShadow: '-10px 0 30px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><h3>Your Cart</h3><button onClick={() => setIsCartOpen(false)}><X /></button></div>
            {cart.map((item, i) => <div key={i}>{item.name}</div>)}
          </div>
        )}

        {isFilterOpen && (
          <div style={{ position: 'fixed', top: 0, right: 0, width: '360px', height: '100vh', background: '#fff', zIndex: 9999, padding: '30px', boxShadow: '-10px 0 30px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><h3>Filter</h3><button onClick={() => setIsFilterOpen(false)}><X /></button></div>
          </div>
        )}

        <Routes>
          <Route path="/" element={<MarketplaceHome products={products} cart={cart} setCart={setCart} activeUserPools={activeUserPools} setActiveUserPools={setActiveUserPools} setIsDrawerOpen={setIsDrawerOpen} />} />
          <Route path="/invite/:productId/:splits" element={<InviteLandingPage products={products} />} />
          <Route path="/checkout-success" element={<CheckoutSuccessPage setActiveUserPools={setActiveUserPools} />} />
          <Route path="*" element={<ErrorFallbackPage />} />
        </Routes>

        {isDrawerOpen && (
          <div style={{ position: 'fixed', top: 0, right: 0, width: '360px', height: '100vh', backgroundColor: '#fff', boxShadow: '-10px 0 30px rgba(0,0,0,0.08)', zIndex: 2000, padding: '30px 24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>My Active Shared Pools</h3>
              <button onClick={() => setIsDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
            </div>
            <div style={{ flex: '1', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {activeUserPools.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '40px', fontSize: '14px' }}>
                  <p>No active team buying links generated yet.</p>
                </div>
              ) : (
                activeUserPools.map(pool => (
                  <div key={pool.id} style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '15px' }}>
                    <div style={{ fontWeight: '700', fontSize: '14px', color: '#1e293b', marginBottom: '4px' }}>{pool.product.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>Your cost: {formatINR(pool.product.price / pool.splits)}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#0284c7', fontWeight: '600' }}>Status: {pool.status}</span>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>{pool.filled}/{pool.splits} paid</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            {activeUserPools.length > 0 && (
              <Link to="/checkout-success" onClick={() => setIsDrawerOpen(false)} style={{ textDecoration: 'none' }}>
                <button style={{ width: '100%', background: '#0f172a', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px', marginTop: '20px' }}>
                  <CreditCard size={16} /> Proceed to Group Escrow
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

function MarketplaceHome({ products, cart, setCart, activeUserPools, setActiveUserPools, setIsDrawerOpen }) {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [splitCount, setSplitCount] = useState(3);
  const [linkCopied, setLinkCopied] = useState(false);

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

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1', padding: '40px 30px' }}>
        <div style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)', padding: '35px 40px', borderRadius: '24px', color: '#fff', marginBottom: '40px', boxShadow: '0 10px 20px -5px rgba(2,132,199,0.15)' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '32px', fontWeight: '800', letterSpacing: '-0.5px' }}>India's First Social Co-Buying Store</h1>
          <p style={{ margin: '0', opacity: 0.9, fontSize: '15px' }}>Skip full retail markups. Build dynamic group buying pools instantly to save big.</p>
        </div>

        <h2 style={{ color: '#0f172a', marginBottom: '24px', fontSize: '22px', fontWeight: '700' }}>Trending Electronics Catalog</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', padding: '20px' }}>
          {products.map((product) => (
            <div key={product._id || product.id} style={{ width: '290px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', overflow: 'hidden' }}>
              <img src={product.img} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 10px 0' }}>{product.name}</h3>
                <p style={{ fontSize: '14px', color: '#64748b' }}>{product.desc}</p>
                <div style={{ fontWeight: '800', fontSize: '18px', margin: '10px 0' }}>{formatINR(product.price)}</div>
                <button onClick={() => setSelectedProduct(product)} style={{ width: '100%', padding: '10px', cursor: 'pointer', marginBottom: '8px' }}>
                  Configure Split Options
                </button>
                <button onClick={() => addToCart(product)} style={{ width: '100%', padding: '10px', cursor: 'pointer', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px' }}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

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

function InviteLandingPage({ products }) {
  const { productId, splits } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => (p._id || p.id) === productId || (p._id || p.id) === parseInt(productId));
  const totalSplits = parseInt(splits) || 3;

  const handlePayment = () => {
    const cost = product ? (product.price / totalSplits) : 0;
    const isConfirmed = window.confirm("Proceed to pay your share of " + formatINR(cost) + " via UPI?");
    
    if (isConfirmed) {
      alert("Payment successful! Your slot is booked.");
      navigate('/checkout-success');
    }
  };

  if (!product || isNaN(totalSplits) || totalSplits < 2) return <ErrorFallbackPage />;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 20px' }}>
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '24px', width: '540px', padding: '40px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.03)', textAlign: 'center' }}>
        <div style={{ background: '#e0f2fe', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px auto', color: '#0284c7' }}>
          <Sparkles size={28} />
        </div>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '24px', color: '#0f172a', fontWeight: '800' }}>Co-Buy Invitation Active!</h2>
        <p style={{ margin: '0 0 30px 0', color: '#64748b', fontSize: '15px' }}>Your colleague added you to this secure checkout link.</p>
        <div style={{ border: '1px solid #f1f5f9', background: '#f8fafc', borderRadius: '16px', padding: '20px', display: 'flex', gap: '20px', textAlign: 'left', marginBottom: '30px' }}>
          <img src={product.img} alt={product.name} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '12px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#1e293b', fontWeight: '700' }}>{product.name}</h4>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>Retail Evaluation: {formatINR(product.price)}</div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#15803d' }}>Your Divided Cost: {formatINR(product.price / totalSplits)}</div>
          </div>
        </div>
        <div style={{ marginBottom: '35px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '10px' }}>
            <span>Group Progress Status:</span>
            <span style={{ color: '#0284c7' }}>{totalSplits - 1} of {totalSplits} slots booked</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {Array.from({ length: totalSplits }).map((_, idx) => (
              <div key={idx} style={{ flex: '1', height: '8px', borderRadius: '9px', background: idx < totalSplits - 1 ? '#10b981' : '#e2e8f0', border: idx < totalSplits - 1 ? 'none' : '1px dashed #cbd5e1' }} />
            ))}
          </div>
        </div>

        <button 
          onClick={handlePayment} 
          style={{ width: '100%', background: '#10b981', color: '#fff', border: 'none', padding: '16px', borderRadius: '14px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(16,185,129,0.15)' }}
        >
          Accept Invite & Pay Your Share
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '12px', marginTop: '20px' }}>
          <ShieldCheck size={16} color="#10b981" /> 100% Secure Refund Escrow. Funds automatically return if pool expires.
        </div>
      </div>
    </div>
  );
}

function CheckoutSuccessPage({ setActiveUserPools }) {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '80px 20px' }}>
      <div style={{ background: '#fff', borderRadius: '24px', width: '480px', padding: '40px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.02)', textAlign: 'center', border: '1px solid #e2e8f0' }}>
        <div style={{ color: '#10b981', marginBottom: '20px' }}><CheckCircle size={64} style={{ marginLeft: 'auto', marginRight: 'auto' }} /></div>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '0 0 10px 0' }}>Split Payment Authorized!</h2>
        <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 30px 0' }}>Your escrow token is secured. The store will automatically process delivery routing code sequence once your partners execute their slots!</p>
        <button onClick={() => { setActiveUserPools([]); localStorage.removeItem('coshop_pools'); navigate('/'); }} style={{ background: '#0f172a', color: '#fff', padding: '14px 28px', borderRadius: '12px', fontWeight: '600', border: 'none', cursor: 'pointer' }}>Return to Marketplace</button>
      </div>
    </div>
  );
}

function ErrorFallbackPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '100px 20px', textAlign: 'center' }}>
      <div style={{ maxWidth: '400px' }}>
        <AlertTriangle size={54} color="#ef4444" style={{ margin: '0 auto 16px auto' }} />
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>Co-Buy Pool Not Found</h2>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>This specific invite path link does not contain a valid configured asset ID sequence or split quantity value inside our storefront records.</p>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={{ background: '#0284c7', color: '#fff', padding: '12px 24px', borderRadius: '10px', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Go Back to Catalog</button>
        </Link>
      </div>
    </div>
  );
}