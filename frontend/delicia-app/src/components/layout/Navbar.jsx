import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Home, Cake } from 'lucide-react';
import { useEffect, useState, useContext } from 'react';
import { CarritoContext } from "../../context/CarritoContext";

function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { carrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  // Cargar usuario al montar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  // Efecto para hacer sticky el navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Calcular total de productos en el carrito
  const totalProductos = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/login');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-sm py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo y nombre */}
          <Link to="/" className="flex items-center gap-2 group">
            <Cake className="h-8 w-8 text-pink-600 group-hover:text-pink-700 transition-colors" />
            <span className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
              Panadería <span className="text-pink-600">Delicia</span>
            </span>
          </Link>

          {/* Menú principal */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="flex items-center gap-1 text-gray-700 hover:text-pink-600 transition-colors font-medium"
            >
              <Home size={18} /> Inicio
            </Link>
            
            <Link 
              to="/productos" 
              className="flex items-center gap-1 text-gray-700 hover:text-pink-600 transition-colors font-medium"
            >
              <Cake size={18} /> Productos
            </Link>

            <div className="relative">
              <Link 
                to="/carrito" 
                className="flex items-center gap-1 text-gray-700 hover:text-pink-600 transition-colors font-medium"
              >
                <ShoppingCart size={18} /> Carrito
                {totalProductos > 0 && (
                  <span className="absolute -top-2 -right-4 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalProductos}
                  </span>
                )}
              </Link>
            </div>

            {/* Menú usuario */}
            {usuario ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium flex items-center gap-1">
                  <User size={18} /> Hola, {usuario.nombre.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-gray-700 hover:text-pink-600 transition-colors font-medium"
                >
                  <LogOut size={18} /> Salir
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link 
                  to="/login" 
                  className="flex items-center gap-1 text-gray-700 hover:text-pink-600 transition-colors font-medium"
                >
                  <User size={18} /> Ingresar
                </Link>
                <Link 
                  to="/registro" 
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Menú móvil (icono hamburguesa) - Puedes implementarlo después */}
          <div className="md:hidden">
            <button className="text-gray-700">
              {/* Icono de menú hamburguesa */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;