import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductCatalog from './pages/ProductCatalog';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeUserPools, setActiveUserPools] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "https://coshop-rk47.onrender.com";
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProductCatalog 
              products={products} 
              cart={cart} 
              setCart={setCart} 
              activeUserPools={activeUserPools} 
              setActiveUserPools={setActiveUserPools} 
              setIsDrawerOpen={setIsDrawerOpen} 
            />
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

