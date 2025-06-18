import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/usuarios/registro", formulario);
      alert("Registro exitoso. ¡Ahora puedes iniciar sesión!");
      navigate("/login");
    } catch (error) {
      console.error("Error en el registro", error);
      alert("Ocurrió un error al registrar.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Correo electrónico:</label>
          <input
            type="email"
            name="email"
            value={formulario.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formulario.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registro;
