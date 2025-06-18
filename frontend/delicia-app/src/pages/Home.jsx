import React, { useContext } from 'react';
import Catalogo from '../components/catalogo/Catalogo';
import { CarritoContext } from '../context/CarritoContext';

const Home = () => {
  const { agregarAlCarrito } = useContext(CarritoContext);

  return (
    <>
      {/* HERO SECTION */}
      <header className="relative bg-cover bg-center text-white py-24 px-6" style={{ backgroundImage: `url('/src/assets/hero-panaderia.jpg')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-5xl mx-auto text-center z-10">
          <p className="text-lg mb-2 text-orange-300 tracking-wide uppercase">Delicious Café</p>
          <h1 className="text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
            Dulces Momentos, <br /> Sabores Inolvidables
          </h1>
          <div className="flex justify-center gap-6 mt-6">
            <a href="#productos" className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition duration-300">
              Comprar Ahora
            </a>
            <a href="#nosotros" className="text-orange-200 underline hover:text-white transition duration-300">
              Conócenos
            </a>
          </div>
        </div>
      </header>

      {/* CATÁLOGO DE PRODUCTOS */}
      <section id="productos" className="py-20 px-6 bg-gray-100 text-gray-900">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-orange-700">Nuestros Productos</h2>
          <p className="text-gray-600 mt-2">Explora nuestras delicias recién horneadas</p>
        </div>
        <Catalogo agregarAlCarrito={agregarAlCarrito} />
      </section>

      {/* PROMOCIÓN */}
      <section className="py-20 px-6 bg-orange-50 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold text-orange-800 mb-4 animate-pulse">🎉 20% de Descuento en tu Primer Pedido</h3>
          <p className="text-gray-700 mb-6">
            Suscríbete y obtén un código exclusivo para disfrutar nuestras delicias.
          </p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full shadow-lg transition duration-300">
            Más Información
          </button>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="py-20 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-orange-700 mb-4">¿Quiénes Somos?</h3>
          <p className="text-gray-700 leading-relaxed">
            En <strong>Pastelería Delicia</strong>, nos apasiona endulzar tus momentos especiales. 
            Somos una panadería artesanal con más de 10 años de experiencia horneando con amor y tradición. 
            Cada producto es elaborado con ingredientes frescos, cuidando cada detalle para brindarte calidad y sabor en cada bocado.
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
