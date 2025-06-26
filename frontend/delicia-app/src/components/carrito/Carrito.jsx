import React, { useContext, useEffect, useState } from 'react';
import { CarritoContext } from '../../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingCart, Plus, Minus, X, Info } from 'lucide-react';
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
  const [observacion, setObservacion] = useState("");
  const [formaEntrega, setFormaEntrega] = useState("recojo");

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

  const envio = formaEntrega === 'delivery' && carrito.length > 0 ? 8 : 0;
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
      formaEntrega,
      observaciones: observacion,
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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <ShoppingCart size={28} className="text-pink-600" />
            Mi Carrito
          </h1>
          
          {carrito.length > 0 && (
            <div className="flex gap-4">
              <button 
                onClick={vaciarCarrito} 
                className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                <X size={16} /> Vaciar carrito
              </button>
              <button 
                onClick={() => navigate('/productos')} 
                className="flex items-center gap-1 text-sm text-pink-600 hover:text-pink-800 transition-colors"
              >
                <ArrowLeft size={16} /> Seguir comprando
              </button>
            </div>
          )}
        </div>

        {carrito.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart size={40} className="text-pink-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Tu carrito está vacío</h3>
            <p className="text-gray-500 mb-6">Agrega productos para continuar</p>
            <button
              onClick={() => navigate('/productos')}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2.5 rounded-lg transition-colors font-medium flex items-center gap-2 mx-auto"
            >
              <ArrowLeft size={16} /> Explorar Productos
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-4 font-medium text-gray-700 text-left">Producto</th>
                    <th className="pb-4 font-medium text-gray-700 text-center">Precio Unit.</th>
                    <th className="pb-4 font-medium text-gray-700 text-center">Cantidad</th>
                    <th className="pb-4 font-medium text-gray-700 text-center">Subtotal</th>
                    <th className="pb-4 font-medium text-gray-700 text-right"></th>
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
                      <td className="text-center text-gray-700">S/ {item.precio.toFixed(2)}</td>
                      <td>
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => disminuirCantidad(item.id)} 
                            className="p-2 border rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                          >
                            <Minus size={16} />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.cantidad}
                            onChange={(e) => actualizarCantidad(item.id, parseInt(e.target.value) || 1)}
                            className="w-14 text-center border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent py-1.5"
                          />
                          <button 
                            onClick={() => aumentarCantidad(item.id)} 
                            className="p-2 border rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="text-center font-medium text-gray-800">S/ {(item.precio * item.cantidad).toFixed(2)}</td>
                      <td className="text-right">
                        <button 
                          onClick={() => eliminarProducto(item.id)} 
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Info size={18} /> Información de Entrega
                </h3>
                
                <div className="mb-4">
                  <label htmlFor="formaEntrega" className="block text-sm font-medium text-gray-700 mb-2">Forma de Entrega:</label>
                  <select
                    id="formaEntrega"
                    value={formaEntrega}
                    onChange={(e) => setFormaEntrega(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="recojo">Recojo en tienda (Gratis)</option>
                    <option value="delivery">Delivery (+ S/ 8.00)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="observacion" className="block text-sm font-medium text-gray-700 mb-2">Observaciones:</label>
                  <textarea
                    id="observacion"
                    value={observacion}
                    onChange={(e) => setObservacion(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    rows="3"
                    placeholder="Indicaciones especiales para tu pedido..."
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen de Compra</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({carrito.length} {carrito.length === 1 ? 'producto' : 'productos'}):</span>
                    <span className="text-gray-800 font-medium">S/ {calcularSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Costo de envío:</span>
                    <span className="text-gray-800 font-medium">
                      {envio > 0 ? `S/ ${envio.toFixed(2)}` : 'Gratis'}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-gray-800">Total:</span>
                    <span className="font-bold text-pink-600">S/ {total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleComprarAhora}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3.5 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} /> Finalizar Compra
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carrito;