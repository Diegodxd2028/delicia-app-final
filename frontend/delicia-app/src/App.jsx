import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Carrito from './components/carrito/Carrito';

function App() {
  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

