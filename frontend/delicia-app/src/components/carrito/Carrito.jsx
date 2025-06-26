import React, { useContext, useEffect } from 'react';
import { CarritoContext } from '../../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingCart, X } from 'lucide-react';
import axios from 'axios';

const Carrito = () => {
  const {
    carrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
    actualizarCantidad,
    vaciarCarrito,
  } = useContext(CarritoContext);

  const navigate = useNavigate();

  // Verificar si el usuario está logueado
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) {
      alert("Debes iniciar sesión para acceder al carrito");
      navigate('/login');
    }
  }, [navigate]);

  const calcularSubtotal = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const envio = carrito.length > 0 ? 10 : 0;
  const total = calcularSubtotal() + envio;

  const handleComprarAhora = async () => {
    if (carrito.length === 0) return alert("Tu carrito está vacío");

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario || !usuario.id) {
      alert("Sesión inválida. Por favor, inicia sesión nuevamente.");
      navigate('/login');
      return;
    }

    const venta = {
      usuario: { id: usuario.id },
      total,
      tipoPago: 'efectivo',
      estado: 'completado',
      formaEntrega: 'recojo',
      detalle: carrito.map(item => ({
        producto: { id: item.id },
        cantidad: item.cantidad,
        precioUnitario: item.precio
      }))
    };

    try {
      await axios.post('http://localhost:8080/api/ventas', venta);
      alert("Compra realizada con éxito ✅");
      vaciarCarrito();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error al realizar la compra ❌");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
        <ShoppingCart size={28} className="text-pink-600" />
        Carrito de Compras
      </h1>

      {carrito.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingCart size={40} className="text-gray-400" />
          </div>
          <p className="text-gray-600 text-lg mb-4">Tu carrito está vacío</p>
          <button 
            onClick={() => navigate('/productos')}
            className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={18} /> Ir a Productos
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={vaciarCarrito} 
              className="text-sm text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
            >
              <X size={16} /> Vaciar carrito
            </button>
            <button 
              onClick={() => navigate('/productos')} 
              className="text-sm text-pink-600 hover:text-pink-800 transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={16} /> Seguir comprando
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left mb-8">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 font-medium text-gray-700">Producto</th>
                  <th className="py-3 font-medium text-gray-700">Precio</th>
                  <th className="py-3 font-medium text-gray-700">Cantidad</th>
                  <th className="py-3 font-medium text-gray-700">Total</th>
                  <th className="py-3 font-medium text-gray-700"></th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.imagenUrl} 
                          alt={item.nombre} 
                          className="w-20 h-20 object-cover rounded-lg border border-gray-200" 
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{item.nombre}</p>
                          <p className="text-sm text-gray-500 line-clamp-2">{item.descripcion}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-gray-700">S/ {item.precio.toFixed(2)}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => disminuirCantidad(item.id)} 
                          className="px-3 py-1 border rounded-md hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.cantidad}
                          onChange={(e) => actualizarCantidad(item.id, parseInt(e.target.value) || 1)}
                          className="w-12 text-center border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                        <button 
                          onClick={() => aumentarCantidad(item.id)} 
                          className="px-3 py-1 border rounded-md hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-gray-700 font-medium">S/ {(item.precio * item.cantidad).toFixed(2)}</td>
                    <td>
                      <button 
                        onClick={() => eliminarProducto(item.id)} 
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="max-w-md ml-auto space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-800">S/ {calcularSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Envío:</span>
                <span className="text-gray-800">S/ {envio.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-800">Total:</span>
                <span className="text-pink-600">S/ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <button
              onClick={handleComprarAhora}
              className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium flex items-center gap-2 ml-auto"
            >
              <ShoppingCart size={20} /> Comprar Ahora
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;