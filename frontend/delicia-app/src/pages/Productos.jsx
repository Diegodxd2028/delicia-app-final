import React, { useEffect, useState } from 'react';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar productos:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Cargando productos...</p>;
  }

  return (
    <div className="bg-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Catálogo</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {productos.map(p => (
          <div key={p.id} className="bg-white border rounded-lg shadow p-4">
            <img src={p.imagenUrl} alt={p.nombre} className="rounded-lg h-48 w-full object-cover" />
            <h2 className="font-semibold mt-4">{p.nombre}</h2>
            <p className="text-sm text-gray-500">{p.descripcion}</p>
            <div className="flex justify-between items-center mt-3">
              <span className="font-bold text-red-600">S/ {p.precio.toFixed(2)}</span>
              <button className="border border-red-500 text-red-500 px-4 py-1 rounded hover:bg-red-500 hover:text-white transition">
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
