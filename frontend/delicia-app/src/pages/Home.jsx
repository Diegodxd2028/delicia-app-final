import React, { useContext } from 'react';
import Catalogo from '../components/catalogo/Catalogo';
import { CarritoContext } from '../context/CarritoContext';

const Home = () => {
  const { agregarAlCarrito } = useContext(CarritoContext);

  return (
    <>
      {/* HERO SECTION */}
      <header
        className="relative bg-cover bg-center text-white py-32 px-6"
        style={{ backgroundImage: `url('/src/assets/hero-panaderia.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-lg text-[#FFDAB9] uppercase tracking-widest mb-2">Panadería Artesanal</p>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg mb-6">
            Sabor que Inspira, <br /> Tradición que Enamora
          </h1>
          <p className="text-lg md:text-xl text-[#FFEFD5] mb-8">
            Delicias horneadas con pasión, para cada momento especial.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="#productos"
              className="bg-[#D2691E] hover:bg-[#A0522D] text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300"
            >
              Ver Productos
            </a>
            <a
              href="#nosotros"
              className="bg-[#D2691E] hover:bg-[#A0522D] text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300"
            >
              Nuestra Historia
            </a>
          </div>
        </div>
      </header>

      {/* CATÁLOGO DE PRODUCTOS */}
      <section id="productos" className="py-24 px-6" style={{ backgroundColor: '#FFF8F0' }}>
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-[#8B4513]">Nuestros Productos</h2>
          <p className="text-[#5C3A21] mt-3 text-lg">Recién salidos del horno, directo a tu mesa</p>
        </div>
        <Catalogo agregarAlCarrito={agregarAlCarrito} />
      </section>

      {/* PROMOCIÓN */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: '#FFE8D6' }}>
        <div className="max-w-xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-[#8B4513] mb-4 animate-pulse">
            🎉 20% de Descuento en tu Primer Pedido
          </h3>
          <p className="text-[#5C3A21] mb-6 text-lg">
            Suscríbete a nuestro boletín y recibe un cupón exclusivo para disfrutar nuestras delicias.
          </p>
          <button className="bg-[#D2691E] hover:bg-[#A0522D] text-white px-8 py-3 rounded-full shadow-lg transition duration-300 font-medium">
            Quiero mi Descuento
          </button>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="py-24 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-[#8B4513] mb-6">Nuestra Historia</h3>
          <p className="text-[#5C3A21] text-lg leading-relaxed">
            En <strong>Pastelería Delicia</strong>, llevamos más de <strong>10 años</strong> endulzando momentos con nuestras recetas tradicionales. 
            Cada producto es elaborado artesanalmente, utilizando ingredientes naturales y mucho amor.
            Nos esforzamos por ofrecer una experiencia única, llena de sabor, aroma y recuerdos felices en cada visita.
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
