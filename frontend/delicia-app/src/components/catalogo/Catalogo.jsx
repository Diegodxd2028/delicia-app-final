import React, { useEffect, useState } from 'react';

const Catalogo = ({ agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
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
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-200"
        >
          <img
            src={producto.imagen_url || 'https://via.placeholder.com/150'}
            alt={producto.nombre}
            className="w-full h-40 object-cover rounded-md mb-3"
          />
          <h3 className="text-lg font-semibold">{producto.nombre}</h3>
          <p className="text-sm text-gray-600">{producto.descripcion}</p>
          <p className="text-red-600 font-bold mt-2">S/ {producto.precio.toFixed(2)}</p>
          {agregarAlCarrito && (
            <button
              onClick={() => agregarAlCarrito(producto)}
              className="mt-3 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md w-full"
            >
              Agregar al carrito
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Catalogo;
