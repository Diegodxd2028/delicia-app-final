import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useEffect, useState, useContext } from 'react';
import { CarritoContext } from "../../context/CarritoContext";



function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const { carrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  // Cargar usuario al montar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

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
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-xl font-bold text-orange-700">Panadería y Pastelería Delicia</h1>

      <ul className="flex gap-6 items-center text-gray-800">
        <li>
          <Link to="/" className="hover:text-orange-700">Inicio</Link>
        </li>
        <li>
          <Link to="/productos" className="hover:text-orange-700">Productos</Link>
        </li>
        <li className="relative">
          <Link to="/carrito" className="hover:text-orange-700 flex items-center gap-1">
            <FaShoppingCart />
            Carrito
          </Link>
          {totalProductos > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-2">
              {totalProductos}
            </span>
          )}
        </li>

        {usuario ? (
          <>
            <li className="text-orange-700 font-semibold">
              👋 {usuario.nombre}
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-orange-700"
              >
                Cerrar sesión
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="hover:text-orange-700 flex items-center gap-1">
                <FaUser />
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link to="/registro" className="hover:text-orange-700">
                Registrarse
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
