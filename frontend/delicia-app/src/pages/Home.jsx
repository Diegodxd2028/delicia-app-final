import React, { useContext } from 'react';
import Catalogo from '../components/catalogo/Catalogo';
import { CarritoContext } from '../context/CarritoContext';
import { Cake, Heart, Award, Clock, Truck, Gift, Star, ShoppingBag } from 'lucide-react';

// Importa tus imágenes (asegúrate de que están en la carpeta correcta)
import heroVideo from '../assets/hero/bakery-video.mp4';
import heroFallback from '../assets/hero/hero-panaderia.jpg';
import aboutImage from '../assets/about/nosotros-panaderia.jpg';

const Home = () => {
  const { agregarAlCarrito } = useContext(CarritoContext);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-0" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute z-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
          {/* Fallback image */}
          <img src={heroFallback} alt="Panadería Delicia" className="w-full h-full object-cover" />
        </video>
        
        <div className="relative z-10 px-6 max-w-6xl mx-auto text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Cake className="h-5 w-5" />
            <span className="text-sm font-medium tracking-widest">PANADERÍA DELICIA</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-pink-300">Sabor</span> que Inspira, <br />
            <span className="text-amber-200">Tradición</span> que Enamora
          </h1>
          
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-100">
            Delicias artesanales horneadas con pasión para endulzar tus momentos especiales
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#productos"
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <ShoppingBag className="h-5 w-5" /> Ver Productos
            </a>
            <a
              href="#nosotros"
              className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
            >
              Nuestra Historia
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="h-10 w-10 text-pink-600" />,
                title: "Hecho con Amor",
                description: "Cada producto elaborado artesanalmente con ingredientes naturales"
              },
              {
                icon: <Award className="h-10 w-10 text-amber-600" />,
                title: "Calidad Premium",
                description: "Materias primas seleccionadas para el mejor sabor"
              },
              {
                icon: <Clock className="h-10 w-10 text-blue-600" />,
                title: "Horario Extendido",
                description: "Abiertos de 7AM hasta las 10 PM para satisfacer tus antojos"
              },
              {
                icon: <Truck className="h-10 w-10 text-green-600" />,
                title: "Delivery Rápido",
                description: "Entregamos tus pedidos calientitos y a tiempo"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-amber-50 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catálogo de Productos */}
      <section id="productos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestras <span className="text-pink-600">Delicias</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Recién salidos del horno, listos para endulzar tu día
            </p>
          </div>
          <Catalogo agregarAlCarrito={agregarAlCarrito} />
        </div>
      </section>

      {/* Promoción */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-amber-500 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Gift className="h-5 w-5" />
            <span className="text-sm font-medium tracking-widest">OFERTA ESPECIAL</span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            ¡20% de descuento en tu primer pedido!
          </h3>
          
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Suscríbete a nuestro newsletter y recibe un cupón exclusivo para disfrutar de nuestras delicias
          </p>
          
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-pink-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-full shadow transition-all duration-300 hover:scale-105">
              Quiero mi descuento
            </button>
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img 
                src={aboutImage}
                alt="Nuestra panadería" 
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Más de <span className="text-pink-600">10 años</span> endulzando momentos
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                En <strong className="text-gray-800">Panadería Delicia</strong>, hemos perfeccionado el arte de la repostería tradicional combinándola con toques innovadores. Cada uno de nuestros productos cuenta una historia de dedicación y pasión por la buena pastelería.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nuestro equipo de maestros panaderos trabaja con ingredientes de la más alta calidad, asegurando que cada bocado sea una experiencia memorable que te transporte a los sabores de la infancia.
              </p>
              <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300">
                Conoce nuestro equipo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros <span className="text-pink-600">clientes</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Historias dulces de nuestros clientes satisfechos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                comment: "El mejor pan dulce que he probado en mi vida. Cada sábado es tradición venir por nuestros favoritos.",
                rating: 5
              },
              {
                name: "Carlos Mendoza",
                comment: "Increíble atención y productos frescos. El croissant de almendras es simplemente perfecto.",
                rating: 5
              },
              {
                name: "Lucía Fernández",
                comment: "Pedí un pastel para el cumpleaños de mi hija y quedó encantada. ¡Volveremos pronto!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.comment}"</p>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;