import React, { useContext } from 'react';
import { CarritoContext } from '../../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const Carrito = () => {
  const {
    carrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
    actualizarCantidad,
    vaciarCarrito, // ✅ nuevo
  } = useContext(CarritoContext);

  const navigate = useNavigate();

  const calcularSubtotal = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const envio = carrito.length > 0 ? 10 : 0;
  const total = calcularSubtotal() + envio;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Carrito de Compras</h1>

      {carrito.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={vaciarCarrito}
              className="text-sm text-red-600 hover:underline"
            >
              🗑️ Vaciar carrito
            </button>
            <button
              onClick={() => navigate('/productos')}
              className="text-sm text-pink-600 hover:underline"
            >
              ← Seguir comprando
            </button>
          </div>

          <table className="w-full text-left mb-6">
            <thead>
              <tr className="border-b">
                <th className="py-2">Detalles del Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Precio Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id} className="border-b align-top">
                  <td className="py-3">
                    <div className="flex items-start gap-2">
                      <img
                        src={item.imagen_url}
                        alt={item.nombre}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold text-sm">{item.nombre}</p>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {item.descripcion}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>S/ {item.precio.toFixed(2)}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => disminuirCantidad(item.id)}
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.cantidad}
                        onChange={(e) =>
                          actualizarCantidad(item.id, parseInt(e.target.value) || 1)
                        }
                        className="w-12 text-center border rounded"
                      />
                      <button
                        onClick={() => aumentarCantidad(item.id)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>S/ {(item.precio * item.cantidad).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => eliminarProducto(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right space-y-1">
            <p>
              <strong>Subtotal:</strong> S/ {calcularSubtotal().toFixed(2)}
            </p>
            <p>
              <strong>Envío:</strong> S/ {envio.toFixed(2)}
            </p>
            <p className="text-pink-600 font-bold text-lg">
              Total: S/ {total.toFixed(2)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
