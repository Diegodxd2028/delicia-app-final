import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ShoppingCart, Plus, Info } from 'lucide-react';

const Catalogo = ({ agregarAlCarrito }) => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [busquedaNombre, setBusquedaNombre] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Cargar productos filtrados
  useEffect(() => {
    const query = [];
    if (categoriaSeleccionada) query.push(`categoriaId=${categoriaSeleccionada}`);
    if (busquedaNombre) query.push(`nombre=${encodeURIComponent(busquedaNombre)}`);
    const url = `http://localhost:8080/api/productos${query.length ? '?' + query.join('&') : ''}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener productos');
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error cargando productos:', err);
        setError('No se pudieron cargar los productos.');
        setLoading(false);
      });
  }, [categoriaSeleccionada, busquedaNombre]);

  // Cargar categorías desde el backend
  useEffect(() => {
    fetch('http://localhost:8080/api/categorias')
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error('Error cargando categorías:', err));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <X className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const verDetalle = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarModal(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl p-8 mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Nuestros Productos</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubre las delicias que tenemos preparadas para ti
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-12">
        {/* Search Bar */}
        <div className="relative mb-8 max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar productos por nombre..."
            value={busquedaNombre}
            onChange={(e) => setBusquedaNombre(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
          />
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 text-center">
            Filtrar por categoría
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setCategoriaSeleccionada('')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                categoriaSeleccionada === ''
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Todas las categorías
            </button>
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaSeleccionada(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  categoriaSeleccionada === cat.id
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {productos.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="mx-auto h-24 w-24 bg-pink-50 rounded-full flex items-center justify-center mb-4">
            <Search className="h-12 w-12 text-pink-400" />
          </div>
          <h3 className="text-2xl font-medium text-gray-900 mb-2">No se encontraron productos</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Prueba ajustando tus filtros de búsqueda o explorando otras categorías
          </p>
          <button
            onClick={() => {
              setBusquedaNombre('');
              setCategoriaSeleccionada('');
            }}
            className="mt-6 bg-pink-600 text-white px-6 py-2.5 rounded-lg hover:bg-pink-700 transition-colors font-medium"
          >
            Mostrar todos los productos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productos.map((producto) => (
            <div 
              key={producto.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-pink-100 group"
            >
              <div className="relative pb-[75%] overflow-hidden">
                <img
                  src={producto.imagenUrl || 'https://via.placeholder.com/300x300?text=Producto'}
                  alt={producto.nombre}
                  className="absolute h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-3 right-3 bg-pink-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  S/ {producto.precio.toFixed(2)}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{producto.nombre}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">{producto.descripcion}</p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => verDetalle(producto)}
                    className="flex-1 border border-gray-200 text-gray-700 hover:bg-gray-50 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Info className="w-4 h-4" /> Detalles
                  </button>
                  <button
                    onClick={() => agregarAlCarrito(producto)}
                    className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Añadir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      {mostrarModal && productoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setMostrarModal(false)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            
            <div className="md:flex">
              <div className="md:w-1/2 h-full">
                <img
                  src={productoSeleccionado.imagenUrl || 'https://via.placeholder.com/800x800?text=Producto'}
                  alt={productoSeleccionado.nombre}
                  className="w-full h-full max-h-[400px] object-cover"
                />
              </div>
              
              <div className="p-8 md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">{productoSeleccionado.nombre}</h2>
                <div className="mb-6">
                  <span className="bg-pink-100 text-pink-800 text-xl font-bold px-4 py-2 rounded-lg inline-block">
                    S/ {productoSeleccionado.precio.toFixed(2)}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-8 text-lg">{productoSeleccionado.descripcion}</p>
                
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      agregarAlCarrito(productoSeleccionado);
                      setMostrarModal(false);
                      navigate('/carrito');
                    }}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3.5 px-4 rounded-lg font-medium flex items-center justify-center transition-colors gap-2 text-lg"
                  >
                    <ShoppingCart className="w-5 h-5" /> 
                    Agregar al carrito
                  </button>
                  
                  <button
                    onClick={() => setMostrarModal(false)}
                    className="w-full border border-gray-200 text-gray-700 hover:bg-gray-50 py-3.5 px-4 rounded-lg font-medium transition-colors"
                  >
                    Continuar explorando
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalogo;