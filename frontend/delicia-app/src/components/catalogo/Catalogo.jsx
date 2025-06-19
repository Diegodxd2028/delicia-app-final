import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md mx-auto" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  const verDetalle = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarModal(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Filtros */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Explora nuestro catálogo</h2>
        
        {/* Filtro por nombre */}
        <div className="relative mb-6 max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busquedaNombre}
            onChange={(e) => setBusquedaNombre(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Filtros por categoría */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Filtrar por categoría</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategoriaSeleccionada('')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                categoriaSeleccionada === ''
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas
            </button>
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaSeleccionada(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  categoriaSeleccionada === cat.id
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de productos */}
      {productos.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No se encontraron productos</h3>
          <p className="mt-1 text-gray-500">Intenta con otros filtros de búsqueda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productos.map((producto) => (
            <div 
              key={producto.id} 
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="relative pb-[75%] overflow-hidden">
                <img
                  src={producto.imagenUrl || 'https://via.placeholder.com/300x300?text=Delicia+Bakery'}
                  alt={producto.nombre}
                  className="absolute h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{producto.nombre}</h3>
                  <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    S/ {producto.precio.toFixed(2)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{producto.descripcion}</p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => verDetalle(producto)}
                    className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    Ver más
                  </button>
                  <button
                    onClick={() => agregarAlCarrito(producto)}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Añadir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de detalle del producto */}
      {mostrarModal && productoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setMostrarModal(false)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={productoSeleccionado.imagenUrl || 'https://via.placeholder.com/500x500?text=Delicia+Bakery'}
                  alt={productoSeleccionado.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 md:w-1/2">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{productoSeleccionado.nombre}</h2>
                <div className="flex items-center mb-4">
                  <span className="bg-orange-100 text-orange-800 text-lg font-bold px-3 py-1 rounded">
                    S/ {productoSeleccionado.precio.toFixed(2)}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-6">{productoSeleccionado.descripcion}</p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      agregarAlCarrito(productoSeleccionado);
                      setMostrarModal(false);
                      navigate('/carrito');
                    }}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Agregar al carrito
                  </button>
                  
                  <button
                    onClick={() => setMostrarModal(false)}
                    className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    Seguir explorando
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