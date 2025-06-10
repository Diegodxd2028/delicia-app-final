import React from 'react';
import Catalogo from '../components/catalogo/Catalogo';

const Home = () => {
  return (
    <>
      {/* HERO SECTION */}
      <header className="bg-[url('/src/assets/hero-panaderia.jpg')] bg-cover bg-center text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-lg mb-2 text-orange-200">Delicious Cafe</p>
          <h1 className="text-5xl font-bold mb-4 leading-tight drop-shadow-md">
            Dulces Momentos, <br /> Sabores Inolvidables
          </h1>
          <div className="flex justify-center gap-6 mt-6">
            <a href="#productos" className="bg-orange-700 hover:bg-orange-800 text-white font-semibold px-6 py-3 rounded-md">
              Comprar Ahora
            </a>
            <a href="#nosotros" className="text-orange-200 underline hover:text-white">
              Conócenos
            </a>
          </div>
        </div>
      </header>

      {/* CATÁLOGO DE PRODUCTOS */}
      <section id="productos" className="py-16 px-6 bg-black text-white">
        <h2 className="text-center text-4xl font-bold mb-10">Top Productos</h2>
        <Catalogo />
      </section>

      {/* PROMOCIÓN */}
      <section className="py-16 px-6 bg-orange-50 text-center">
        <h3 className="text-3xl font-bold text-orange-800 mb-4">20% de Descuento en tu Primer Pedido</h3>
        <p className="text-gray-600 mb-6">
          Suscríbete y obtén un descuento exclusivo
        </p>
        <button className="bg-orange-700 text-white px-6 py-3 rounded-md hover:bg-orange-800">
          Más Información
        </button>
      </section>
    </>
  );
};

export default Home;
