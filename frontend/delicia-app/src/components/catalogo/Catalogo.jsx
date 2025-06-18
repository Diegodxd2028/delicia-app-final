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
    return <p className="text-center text-gray-500">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  //Modal ver detalle de producto
  const verDetalle = (producto) => {
  setProductoSeleccionado(producto);
  setMostrarModal(true);
  };


  return (
  <div className="p-6">
    {/* Filtros */}
    <div className="mb-6 flex flex-col gap-4 items-center">
      {/* Filtros por categoría con botones */}
      <div className="flex gap-2 flex-wrap justify-center overflow-x-auto">
        <button
          onClick={() => setCategoriaSeleccionada('')}
          className={`px-4 py-2 rounded-full border text-sm ${
            categoriaSeleccionada === ''
              ? 'bg-red-500 text-white'
              : 'bg-white text-red-500'
          } hover:bg-red-100 transition`}
        >
          Todas
        </button>
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoriaSeleccionada(cat.id)}
            className={`px-4 py-2 rounded-full border text-sm ${
              categoriaSeleccionada === cat.id
                ? 'bg-red-500 text-white'
                : 'bg-white text-red-500'
            } hover:bg-red-100 transition`}
          >
            {cat.nombre}
          </button>
        ))}
      </div>

      {/* Filtro por nombre */}
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={busquedaNombre}
        onChange={(e) => setBusquedaNombre(e.target.value)}
        className="border rounded px-4 py-2 w-full max-w-md"
      />
    </div>

    {/* Lista de productos */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {productos.map((producto) => (
        <div key={producto.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-200">
          <img
            src={producto.imagen_url || 'https://via.placeholder.com/150'}
            alt={producto.nombre}
            className="w-full h-40 object-cover rounded-md mb-3"
          />
          <h3 className="text-lg font-semibold">{producto.nombre}</h3>
          <p className="text-sm text-gray-600">{producto.descripcion}</p>
          <p className="text-red-600 font-bold mt-2">S/ {producto.precio.toFixed(2)}</p>

          <div className="flex flex-col gap-2 mt-3">
            {agregarAlCarrito && (
              <button
                onClick={() => agregarAlCarrito(producto)}
                className="border border-gray-400 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-md"
              >
                Agregar al carrito
              </button>
            )}
            <button
              onClick={() => verDetalle(producto)}
              className="border border-gray-400 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-md"
            >
              Ver detalle
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Modal de detalle del producto */}
    {mostrarModal && productoSeleccionado && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg max-w-md w-full p-6 relative shadow-lg">
      <button
        onClick={() => setMostrarModal(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
      >
        ×
      </button>
      <img
        src={productoSeleccionado.imagen_url}
        alt={productoSeleccionado.nombre}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold">{productoSeleccionado.nombre}</h2>
      <p className="text-gray-600">{productoSeleccionado.descripcion}</p>
      <p className="text-red-600 font-bold mt-2">
        Precio: S/ {productoSeleccionado.precio.toFixed(2)}
      </p>

      {/* Botón Agregar al carrito desde el modal */}
      <button
        onClick={() => {
          agregarAlCarrito(productoSeleccionado);
          setMostrarModal(false); // opcional: cierra el modal luego
          navigate('/carrito'); //  Redirige al carrito
        }}
        className="mt-4 w-full bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded-md"
      >
        Agregar al carrito
      </button>
    </div>
  </div>
)}

  </div>
);





};

export default Catalogo;
