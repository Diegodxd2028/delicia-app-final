import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/usuarios/login', {
        email,
        password,
      });

      // Guardar usuario en localStorage
      localStorage.setItem('usuario', JSON.stringify(res.data));

      // Limpiar campos
      setEmail('');
      setPassword('');

      // Mostrar mensaje (opcional)
      console.log('Bienvenido:', res.data.nombre);

      // Redirigir y refrescar para que Navbar se actualice
      navigate('/');
      window.location.reload();
    } catch (error) {
      setMensaje('❌ Credenciales incorrectas');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-700">Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-orange-700 text-white py-2 rounded hover:bg-orange-800 transition"
        >
          Iniciar Sesión
        </button>

        {mensaje && (
          <p className={`mt-4 text-center ${mensaje.includes('exitoso') ? 'text-green-600' : 'text-red-500'}`}>
            {mensaje}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
