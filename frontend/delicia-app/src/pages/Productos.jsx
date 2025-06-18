import React, { useContext } from 'react';
import Catalogo from '../components/catalogo/Catalogo';
import { CarritoContext } from '../context/CarritoContext';

const Productos = () => {
  const { agregarAlCarrito } = useContext(CarritoContext); 

  return (
    <div className="bg-white px-6 py-10">
      <Catalogo agregarAlCarrito={agregarAlCarrito} />
    </div>
  );
};

export default Productos;